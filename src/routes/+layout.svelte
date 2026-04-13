<script lang="ts">
  import { ModeWatcher, mode } from "mode-watcher";
  import { useInterval } from "runed";
  import { Toaster } from "svelte-sonner";
  import RefreshIcon from "@lucide/svelte/icons/refresh-ccw";
  import RefreshDotIcon from "@lucide/svelte/icons/refresh-ccw-dot";
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import * as Sidebar from "$lib/components/ui/sidebar";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { setCasualState } from "$lib/casual";
  import { setUiState } from "$lib/uistate/uistate.svelte";
  import { setNotifications } from "$lib/notifications/notifications.svelte";
  import favicon from '$lib/assets/casual-symbol-bw.svg';
  import Breadcrumb from "./breadcrumb.svelte";

  import '../app.css';
  
  let { children } = $props();

  const uiState = setUiState();
  const casual = setCasualState();
  setNotifications();

  uiState.setBreadcrumb([]);

  const refreshInterval = useInterval(() => 2000, {
    immediate: false,
    callback: () => casual.refresh(),
  });

  const toggleAutoRefresh = () => refreshInterval.isActive
    ? refreshInterval.pause()
    : refreshInterval.resume();
</script>

<svelte:head>
  <title>{casual.domainState.identity.name} • Casual</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<Toaster
  richColors
  position="bottom-right"
  theme={mode.current}
/>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="bg-background sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 z-2">
      <div class="flex items-center gap-2">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb />
      </div>
      <div class="flex items-center gap-2">
        <ButtonGroup.Root>
          <ButtonGroup.Root>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Refresh"
              onclick={() => casual.refresh()}
            >
              {#if refreshInterval.isActive}
                <RefreshDotIcon />
              {:else}
                <RefreshIcon />
              {/if}
            </Button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {#snippet child({ props })}
                  <Button
                    {...props}
                    variant="outline"
                    size="icon-sm"
                    aria-label="More Options"
                  >
                    <MoreHorizontal />
                  </Button>
                {/snippet}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" class="w-52">
                <DropdownMenu.Group>
                  <DropdownMenu.CheckboxItem checked={refreshInterval.isActive} onSelect={toggleAutoRefresh}>
                    Auto refresh
                  </DropdownMenu.CheckboxItem>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </ButtonGroup.Root>
        </ButtonGroup.Root>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4">
      <Tooltip.Provider>
        {@render children()}
      </Tooltip.Provider>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
