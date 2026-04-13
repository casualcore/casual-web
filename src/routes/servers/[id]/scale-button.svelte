<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import { getNotifications } from "$lib/notifications/notifications.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import Spinner from "$lib/components/ui/spinner/spinner.svelte";

  const {
    alias,
    numberOfInstances,
  }: {
    alias: string,
    numberOfInstances: number,
  } = $props();
  
  const casual = getCasualState();
  const notifications = getNotifications();

  let open = $state(false);
  let loading = $state(false);
  let value = $state<number>(numberOfInstances);

  let canApply = $derived(!loading && Number.isInteger(value) && Number(value) > 0);

  const getOpen = () => open;
  const setOpen = (newOpen: boolean) => open = newOpen;

  const onOpenChange = (open: boolean) => {
    if(open) {
      value = numberOfInstances;
    }
  };

  const onApply = async() => {
    try {
      loading = true;

      await casual.domainScaleAlias(alias, Number(value));
      await casual.refresh();
      
      notifications.success(`${alias} scaled to ${value} instance${value !== 1 ? 's' : ''}`);
    } catch(error) {
      notifications.error(`Failed to scale server (${error})`);
    } finally {
      loading = false;
      open = false;
    }
  }
</script>

<Popover.Root bind:open={getOpen, setOpen} {onOpenChange}>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button {...props} size="sm" variant="outline" disabled={!open && loading}>
        Scale
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content align="end">
    <div class="grid gap-4">
      <div class="space-y-2">
        <Label>Number of instances</Label>
        <Input type="number" bind:value />
      </div>
      <div class="flex justify-end">
        <Button size="sm" onclick={onApply} disabled={!canApply}>
          {#if loading}
            <Spinner />
          {/if}
          Apply
        </Button>
      </div>
    </div>
  </Popover.Content>
</Popover.Root>
