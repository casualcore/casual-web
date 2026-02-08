<script lang="ts">
  import { page } from "$app/state";
  import { getCasualState, type Service } from "$lib/casual";
  import ServiceDetails from "./service-details.svelte";
  import ServiceList from "./service-list.svelte";

  let service: Service | null = $state(null);

  $effect(() => {
    const serviceName = page.url.searchParams.get('name');
    service = casual.serviceState.services.find(s => s.name === serviceName)!;
  });

  const casual = getCasualState();
</script>

{#if service}
  <ServiceDetails {service} />
{:else}
  <ServiceList />
{/if}
