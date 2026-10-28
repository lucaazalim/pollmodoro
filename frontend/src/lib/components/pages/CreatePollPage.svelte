<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import TurnstileWidget from '$lib/components/TurnstileWidget.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Form from '$lib/components/ui/form';
	import { getI18n } from '$lib/i18n';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { localStore } from '$lib/localStore.svelte';
	import { trpc } from '$lib/trpc';
	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';

	const MIN_OPTIONS = 2;
	const MAX_OPTIONS = 10;

	const { m } = getI18n();
	const errors = m.createPoll.errors;

	const schema = z.object({
		title: z.string().trim().min(1, errors.questionRequired).max(200, errors.tooLong(200)),
		description: z.string().trim().max(500, errors.tooLong(500)).optional(),
		options: z
			.array(z.string().trim().min(1, errors.optionRequired).max(100, errors.tooLong(100)))
			.min(MIN_OPTIONS, errors.tooFewOptions(MIN_OPTIONS))
			.max(MAX_OPTIONS, errors.tooManyOptions(MAX_OPTIONS)),
		allowMultipleOptions: z.boolean().default(false)
	});

	const savedPolls = localStore('polls', [] as string[], z.array(z.string()));

	let turnstileToken = $state<string | null>(null);
	let resetTurnstile = $state<() => void>();

	const form = superForm(
		defaults(
			{ title: '', description: '', options: ['', ''], allowMultipleOptions: false },
			zod4(schema)
		),
		{
			SPA: true,
			validators: zod4(schema),
			resetForm: false,
			async onUpdate({ form: result, cancel }) {
				if (!result.valid) return;

				if (!turnstileToken) {
					toast.error(m.createPoll.verificationRequired);
					cancel();
					return;
				}

				try {
					const createdPoll = await trpc.createPoll.mutate({
						title: result.data.title,
						description: result.data.description || undefined,
						options: result.data.options,
						allowMultipleOptions: result.data.allowMultipleOptions,
						turnstileToken
					});

					savedPolls.current = [...savedPolls.current, createdPoll.id].slice(-9);

					await goto(`/polls/${createdPoll.id}`);
				} catch (error) {
					console.error(error);
					toast.error(m.createPoll.failed);
					resetTurnstile?.();
					cancel();
				}
			}
		}
	);

	const { form: formData, enhance, submitting } = form;

	function addOption() {
		if ($formData.options.length < MAX_OPTIONS) {
			$formData.options = [...$formData.options, ''];
		}
	}

	function removeOption(index: number) {
		if ($formData.options.length > MIN_OPTIONS) {
			$formData.options = $formData.options.filter((_, i) => i !== index);
		}
	}
</script>

<svelte:head>
	<title>{m.common.createAPoll} · Pollmodoro</title>
	<meta name="description" content={m.createPoll.metaDescription} />
</svelte:head>

<div class="mx-auto max-w-2xl py-6 sm:py-10" in:fade={{ duration: 400 }}>
	<div class="mb-6">
		<h1 id="create-poll-heading" class="text-3xl font-bold tracking-tight">
			{m.common.createAPoll}
		</h1>
		<p class="text-muted-foreground mt-1">{m.createPoll.intro}</p>
	</div>

	<Card>
		<form use:enhance class="space-y-8" aria-labelledby="create-poll-heading">
			<Form.Field {form} name="title">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>{m.createPoll.question}</Form.Label>
						<Input
							{...props}
							bind:value={$formData.title}
							placeholder={m.createPoll.questionPlaceholder}
							maxlength={200}
							autocomplete="off"
							class="h-10"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="description">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>
							{m.createPoll.description}
							<span class="text-muted-foreground font-normal">{m.createPoll.optional}</span>
						</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.description}
							placeholder={m.createPoll.descriptionPlaceholder}
							rows={3}
							maxlength={500}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Fieldset {form} name="options" class="space-y-3">
				<div>
					<Form.Legend>{m.createPoll.options}</Form.Legend>
					<p class="text-muted-foreground mt-1 text-sm">
						{m.createPoll.optionsHint(MIN_OPTIONS, MAX_OPTIONS)}
					</p>
				</div>

				{#each $formData.options as _, index (index)}
					<Form.ElementField {form} name="options[{index}]">
						<Form.Control>
							{#snippet children({ props })}
								<div class="flex gap-2">
									<Input
										{...props}
										bind:value={$formData.options[index]}
										placeholder={m.createPoll.optionPlaceholder(index + 1)}
										maxlength={100}
										autocomplete="off"
										aria-label={m.createPoll.optionPlaceholder(index + 1)}
										class="h-10"
									/>
									{#if $formData.options.length > MIN_OPTIONS}
										<Button
											type="button"
											variant="ghost"
											size="icon-lg"
											class="text-muted-foreground hover:text-destructive size-10 shrink-0"
											onclick={() => removeOption(index)}
											aria-label={m.createPoll.removeOption(index + 1)}
										>
											<Trash2 aria-hidden="true" />
										</Button>
									{/if}
								</div>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.ElementField>
				{/each}

				<Form.FieldErrors />

				{#if $formData.options.length < MAX_OPTIONS}
					<Button type="button" variant="outline" size="sm" onclick={addOption}>
						<Plus aria-hidden="true" />
						{m.createPoll.addOption}
					</Button>
				{/if}
			</Form.Fieldset>

			<Form.Field
				{form}
				name="allowMultipleOptions"
				class="hover:bg-muted/50 has-data-checked:border-primary/40 relative flex items-start gap-3 rounded-lg border p-4 transition-colors"
			>
				<Form.Control>
					{#snippet children({ props })}
						<Checkbox {...props} bind:checked={$formData.allowMultipleOptions} class="mt-0.5" />
						<div class="space-y-1">
							<Form.Label class="cursor-pointer after:absolute after:inset-0">
								{m.createPoll.allowMultiple}
							</Form.Label>
							<Form.Description>{m.createPoll.allowMultipleDescription}</Form.Description>
						</div>
					{/snippet}
				</Form.Control>
			</Form.Field>

			<TurnstileWidget bind:token={turnstileToken} bind:reset={resetTurnstile} />

			<Form.Button pushable disabled={$submitting} class="h-11 w-full text-base" size="lg">
				{$submitting ? m.createPoll.submitting : m.common.createPoll}
			</Form.Button>
		</form>
	</Card>
</div>
