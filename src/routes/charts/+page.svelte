<script lang="ts">
  import { currentDataSets } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import type { PageProps } from "./$types";

  import { refreshIdsCatsPlaces } from "$lib/services/utils";
  import { subTitle } from "$lib/runes.svelte";
  subTitle.text = "Statistics & Charts";

  let { data }: PageProps = $props();
  console.log("Charts data", data);
  refreshIdsCatsPlaces(data.places, data.categories, data.users);
</script>

<div class="columns">
  <div class="column">
    <Card title="Ratings By Category">
      <Chart data={currentDataSets.ratingsByCategory} type="bar" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <Card title="Reviews By User">
      <Chart data={currentDataSets.reviewsByUser} type="pie" />
    </Card>
  </div>
</div>