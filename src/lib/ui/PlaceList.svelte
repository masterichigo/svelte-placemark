<script lang="ts">
  import { currentPlaces } from "$lib/runes.svelte";
  console.log("Current places in PlaceList:", currentPlaces.places);
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Place Name</th>
      <th>Category</th>
      <th>Location</th>
      <th>Longitude</th>
      <th>Latitude</th>
    </tr>
  </thead>
  <tbody>
    {#each currentPlaces.places as place}
      <tr>
        <td>
          {place.name}
        </td>
        <td>
          {place.categoryName}
        </td><td>
          {place.location}
        </td>
        <td>
          {place.longitude}
        </td>
        <td>
          {place.latitude}
        </td>
      </tr>
    {/each}
  </tbody>
</table>