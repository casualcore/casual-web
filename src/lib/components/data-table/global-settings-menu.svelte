<script lang="ts">
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "../ui/button";
  import { getUiState, DURATIONS_RESOLUTION } from "$lib/uistate/uistate.svelte";
  
  const uiState = getUiState();
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          size="icon-sm"
          aria-label="More Options"
        >
          <SettingsIcon />
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" class="w-52">
      <DropdownMenu.Group>
        <DropdownMenu.Label>Durations resolution</DropdownMenu.Label>
        <DropdownMenu.RadioGroup bind:value={uiState.durationsResolution}>
          <DropdownMenu.RadioItem value={DURATIONS_RESOLUTION.MS}>Milliseconds</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value={DURATIONS_RESOLUTION.US}>Microseconds</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.CheckboxItem checked={uiState.showHidden} onSelect={() => uiState.showHidden = !uiState.showHidden}>
          Show hidden
        </DropdownMenu.CheckboxItem>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
