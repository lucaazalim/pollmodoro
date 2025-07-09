<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { localStore } from '$lib/localStore.svelte.js';
	import { createPollStore } from '$lib/stores.js';
	import { Trash } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import z from 'zod';
	import TurnstileWidget from '../TurnstileWidget.svelte';

	const createPollSchema = z.object({
		title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
		description: z.string().max(500, 'Description too long').optional(),
		options: z
			.array(z.string().min(1, 'Option cannot be empty').max(100, 'Option too long'))
			.min(2, 'At least 2 options are required')
			.max(10, 'Maximum 10 options allowed'),
		pollType: z.enum(['multiple_choice']).default('multiple_choice'),
		allowMultipleOptions: z.boolean().default(false)
	});

	let savedPolls = localStore('polls', [] as string[]);
	let turnstileToken: string | null = null;

	const form = superForm(
		defaults(
			{
				title: '',
				description: '',
				options: ['', ''],
				pollType: 'multiple_choice' as const,
				allowMultipleOptions: false
			},
			zod(createPollSchema)
		),
		{
			SPA: true,
			validators: zod(createPollSchema),
			async onUpdate({ form, cancel }) {
				if (!form.valid) {
					toast.error('Please fix the form errors before submitting.');
					return;
				}

				if (!turnstileToken) {
					toast.error('Please complete the captcha before submitting.');
					return;
				}

				try {
					const createdPoll = await createPollStore.createPoll({
						title: form.data.title,
						description: form.data.description || undefined,
						options: form.data.options.filter((opt: string) => opt.trim()),
						allowMultipleOptions: form.data.allowMultipleOptions,
						pollType: 'multiple_choice' as const,
						turnstileToken: turnstileToken || ''
					});

					toast.success('Poll created successfully!');

					// Save poll ID to local storage
					savedPolls.set([...savedPolls.get(), createdPoll.id].slice(-9));

					// Redirect to the created poll
					await goto(`/polls/${createdPoll.id}`);
				} catch (error) {
					toast.error('Failed to create poll. Please try again.');
					cancel(); // Prevent form reset on error
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	// Add option to form
	function addOption() {
		if ($formData.options.length < 10) {
			$formData.options = [...$formData.options, ''];
		}
	}

	// Remove option from form
	function removeOption(index: number) {
		if ($formData.options.length > 2) {
			$formData.options = $formData.options.filter((_: string, i: number) => i !== index);
		}
	}
</script>

<svelte:head>
	<title>Create Poll</title>
</svelte:head>

<div class="mx-auto max-w-2xl p-6" in:fade={{ duration: 500, easing: sineInOut }}>
	<h1 class="text-foreground mb-8 text-3xl font-bold">Create a New Poll</h1>

	<form use:enhance class="space-y-6">
		<Form.Field {form} name="title">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Poll Title *</Form.Label>
					<Input
						{...props}
						bind:value={$formData.title}
						placeholder="What's your question?"
						maxlength={200}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description>Maximum 200 characters</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="description">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Description (optional)</Form.Label>
					<Textarea
						{...props}
						bind:value={$formData.description}
						placeholder="Provide additional context for your poll..."
						rows={3}
						maxlength={500}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description>Maximum 500 characters</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<div class="space-y-3">
			<div>
				<Label>Poll Options *</Label>
				<p class="text-muted-foreground mt-1 text-sm">Add 2-10 options for people to choose from</p>
			</div>

			{#each $formData.options as option, index}
				<Form.Field {form} name="options[{index}]">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex gap-3">
								<div class="flex-1">
									<Input
										{...props}
										bind:value={$formData.options[index]}
										placeholder="Option {index + 1}"
										maxlength={100}
									/>
								</div>
								{#if $formData.options.length > 2}
									<Button
										type="button"
										variant="destructive"
										size="lg"
										class="px-3"
										onclick={() => removeOption(index)}
									>
										<Trash />
									</Button>
								{/if}
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{/each}

			{#if $formData.options.length < 10}
				<Button type="button" variant="outline" size="sm" onclick={addOption}>+ Add Option</Button>
			{/if}
		</div>

		<Form.Field
			{form}
			name="allowMultipleOptions"
			class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
		>
			<Form.Control>
				{#snippet children({ props })}
					<input
						{...props}
						type="checkbox"
						bind:checked={$formData.allowMultipleOptions}
						class="mt-1"
					/>
					<div class="space-y-1 leading-none">
						<Form.Label class="font-medium">Allow multiple selections</Form.Label>
						<Form.Description>Let people choose more than one option</Form.Description>
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<TurnstileWidget bind:token={turnstileToken} />

		<div>
			<Form.Button disabled={$createPollStore.loading} class="w-full" size="lg">
				{$createPollStore.loading ? 'Creating Poll...' : 'Create Poll'}
			</Form.Button>
		</div>
	</form>
</div>
