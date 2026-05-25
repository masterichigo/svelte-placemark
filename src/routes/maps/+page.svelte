<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import { refreshPlaceMap, refreshPlaceState } from "$lib/services/utils";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  subTitle.text = "Favourite Locations";
  let map: LeafletMap;
  let { data }: PageProps = $props();

  onMount(async () => {
    await refreshPlaceState(data.places);
    await refreshPlaceMap(map);
  });
</script>

<Card title="Favourite Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>