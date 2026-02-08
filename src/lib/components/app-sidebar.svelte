<script lang="ts" module>
	import { getUiState } from "$lib/uistate/uistate.svelte";
	import CasualLeftBw from "$lib/assets/casual-left-bw.svelte";
	import CasualSymbolBw from "$lib/assets/casual-symbol-bw.svelte";
  import { ExecutableIcon, GroupIcon, InstanceIcon, ServerIcon, ServiceIcon } from "./icons/icons";

	const data = {
		navMain: [
			{
				title: "Groups",
				url: "/groups",
				icon: GroupIcon,
			},
			{
				title: "Executables",
				url: "/executables",
				icon: ExecutableIcon,
			},
			{
				title: "Servers",
				url: "/servers",
				icon: ServerIcon,
			},
			{
				title: "Instances",
				url: "/instances",
				icon: InstanceIcon,
			},
			{
				title: "Services",
				url: "/services",
				icon: ServiceIcon,
			},
		],
	};
</script>

<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import NavSettings from "./nav-settings.svelte";

	const uiState = getUiState();

	let {
		ref = $bindable(null),
		collapsible = "icon",
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header class="justify-start">
		{#if sidebar.open}
			<CasualLeftBw height={62} />
		{:else}
			<CasualSymbolBw height={30} />
		{/if}
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} currentPage={uiState.breadcrumbs[0]?.title} />
	</Sidebar.Content>
	<Sidebar.Rail />
	<Sidebar.Footer>
    <NavSettings />
  </Sidebar.Footer>
</Sidebar.Root>
