<script lang="ts">
  import { currentPlaces } from "$lib/runes.svelte";
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Place Name</th>
      <th>Category</th>
      <th>Location</th>
      <th>Coordinates</th>
    </tr>
  </thead>
  <tbody>
    {#each currentPlaces.places as place}
      <tr>
        <td>
          {place.name}
        </td>
        <td>
          {place.category.title}
        </td><td>
          {place.location}
        </td>
        <td>
          {place.latitude}, {place.longitude}
        </td>
      </tr>
    {/each}
  </tbody>
</table>