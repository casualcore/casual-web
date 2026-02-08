<script lang="ts">
  import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { toggleMode, mode } from "mode-watcher";
</script>
<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            {...props}
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <SettingsIcon />
            Settings
            <ChevronUpIcon class="ms-auto size-4" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        side="top"
        class="w-(--bits-dropdown-menu-anchor-width)"
      >
        <DropdownMenu.Item onclick={toggleMode}>
          {#if mode.current === "dark"}
            <SunIcon />Light mode
          {:else}
            <MoonIcon />Dark mode
          {/if}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
