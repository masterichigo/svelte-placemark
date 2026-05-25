<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import PlaceList from "$lib/ui/PlaceList.svelte";
  import { subTitle } from "$lib/runes.svelte";
  import { refreshPlaceState } from "$lib/services/utils";
  import type { PageProps } from "./$types";

  subTitle.text = "Favourite Places";
  let { data }: PageProps = $props();
  refreshPlaceState(data.places);
</script>

<Card title="Places">
  <PlaceList />
</Card>