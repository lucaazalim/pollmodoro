<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import Label from "$lib/components/ui/label/label.svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { createPollStore } from "$lib/stores";
  import { Trash } from "@lucide/svelte";
  import {
    defaults,
    type Infer,
    superForm,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { createPollSchema, type CreatePollSchema } from "./schema.js";

  interface Props {
    data?: {
      form?: SuperValidated<Infer<CreatePollSchema>>;
    };
  }

  const form = superForm(
    defaults(
      {
        title: "",
        description: "",
        options: ["", ""],
        pollType: "multiple_choice" as const,
        allowMultipleOptions: false,
      },
      zod(createPollSchema),
    ),
    {
      SPA: true,
      validators: zod(createPollSchema),
      async onUpdate({ form }) {
        if (!form.valid) {
          console.error("Erro na validação!");
          return;
        }

        try {
          const createdPoll = await createPollStore.createPoll({
            title: form.data.title,
            description: form.data.description || undefined,
            options: form.data.options.filter((opt: string) => opt.trim()),
            allowMultipleOptions: form.data.allowMultipleOptions,
            pollType: "multiple_choice" as const,
          });

          // Redirect to the created poll
          await goto(`/${createdPoll.id}`);
        } catch (error) {
          // Error is already handled by the store
          console.error("Failed to create poll:", error);
        }
      },
    },
  );

  const { form: formData, enhance } = form;

  // Add option to form
  function addOption() {
    if ($formData.options.length < 10) {
      $formData.options = [...$formData.options, ""];
    }
  }

  // Remove option from form
  function removeOption(index: number) {
    if ($formData.options.length > 2) {
      $formData.options = $formData.options.filter(
        (_: string, i: number) => i !== index,
      );
    }
  }
</script>

<svelte:head>
  <title>Create Poll</title>
</svelte:head>

<div class="mx-auto max-w-2xl p-6">
  <h1 class="mb-8 text-3xl font-bold">Create a New Poll</h1>

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
        <p class="text-muted-foreground mt-1 text-sm">
          Add 2-10 options for people to choose from
        </p>
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
        <Button type="button" variant="outline" size="sm" onclick={addOption}
          >+ Add Option</Button
        >
      {/if}
    </div>

    <Form.Field
      {form}
      name="allowMultipleOptions"
      class="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4"
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
            <Form.Label class="font-medium"
              >Allow multiple selections</Form.Label
            >
            <Form.Description
              >Let people choose more than one option</Form.Description
            >
          </div>
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <div class="pt-4">
      <Form.Button disabled={$createPollStore.loading} class="w-full" size="lg">
        {$createPollStore.loading ? "Creating Poll..." : "Create Poll"}
      </Form.Button>
    </div>

    {#if $createPollStore.error}
      <div
        class="bg-destructive/10 border-destructive/20 rounded-md border p-4"
      >
        <p class="text-destructive text-sm">{$createPollStore.error}</p>
      </div>
    {/if}
  </form>
</div>
