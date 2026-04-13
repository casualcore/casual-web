<script lang="ts">
  import { getCasualState } from "$lib/casual";
  import { getNotifications } from "$lib/notifications/notifications.svelte";
  import Button from "./ui/button/button.svelte";

  const {
    label,
    onclick,
    successMessage,
    errorMessage,
  }: {
    label: string,
    onclick: Function,
    successMessage: string,
    errorMessage: string,
  } = $props();

  let executing = $state(false);

  const casual = getCasualState();
  const notifications = getNotifications();

  const onAction = async() => {
    try {
      executing = true;

      await onclick(),
      await casual.refresh();
      
      notifications.success(successMessage);
    } catch(error) {
      notifications.error(`${errorMessage} (${error})`);
    } finally {
      executing = false;
    }
  };
</script>

<Button onclick={onAction} size="sm" variant="outline" disabled={executing}>
  {label}
</Button>
