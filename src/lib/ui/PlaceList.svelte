<script>
  import { currentPlaces } from "$lib/runes.svelte";
  import { apiService } from "$lib/services/api-service";
  import { refreshPlaceState } from "$lib/services/utils";
 

  // Accept auth token passed down from the parent view layout context
  let { token, _id } = $props();
  let errorMessage = $state("");

  async function handleReviewSubmit(event) {
    event.preventDefault(); 
    
    const form = event.currentTarget;
    const formData = new FormData(form);

    
    const placeId = formData.get("placeId");
    const categoryId = formData.get("categoryId");
    const text = formData.get("text")?.toString().trim();
    const rating = Number(formData.get("rating") || 5);

    if (!text || !categoryId) return;

    try {
      errorMessage = "";
      const success = await apiService.addReview(placeId, text, rating, token);
      if (success) {
        
        console.log(token, "value ",categoryId);
        form.reset(); 
        errorMessage = "Review added successfully!";
      } else {
        errorMessage = "Failed to add review. Check network or server validations.";
      }
    } catch (err) {
      errorMessage = err.message || "An unexpected error occurred.";
    }
  }

  async function handleDeletePlaceImage(placeId) {
    try {
      errorMessage = "";
      const success = await apiService.deletePlaceImage(placeId, token);
      if (success) {
        errorMessage = "Place image deleted successfully!";
      } else {
        errorMessage = "Failed to delete place image. Check network or server validations.";
      }
      
      const current = await apiService.getPlaces(token, _id);
      refreshPlaceState(current);
    } catch (err) {
      errorMessage = err.message || "An unexpected error occurred.";
    }
  }
 
</script>

{#if errorMessage}
  <div class="notification is-danger p-2 mb-4 is-size-7">
    {errorMessage}
  </div>
{/if}
{@debug token, _id}
<table class="table is-fullwidth is-striped is-hoverable">
  <thead>
    <tr>
      <th>Photo</th>
      <th>Place Name</th>
      <th>Category</th>
      <th>Location</th>
      <th>Longitude</th>
      <th>Latitude</th>
      <th>Rating</th>
      <th>Submit a Review</th>
      <th>Delete Image</th>
    </tr>
  </thead>
  <tbody>
    {#each currentPlaces.places as place (place._id)}
      <tr>
        <td>
          {#if place.image}
            <figure class="image is-64x64">
              <img src={place.image} alt={place.name} />
            </figure>
          {/if}
        </td>
        <td><strong>{place.name}</strong></td>
        <td><span class="tag is-light">{place.categoryName || "POI"}</span></td>
        <td>{place.location}</td>
        <td>{place.longitude}</td>
        <td>{place.latitude}</td>
        
        <td>
          <div class="select is-small is-fullwidth">
            <select name="rating" form="form-{place._id}" disabled={!token}>
              <option value="5">5 ★</option>
              <option value="4">4 ★</option>
              <option value="3">3 ★</option>
              <option value="2">2 ★</option>
              <option value="1">1 ★</option>
            </select>
          </div>
        </td>

        <td>
          <form id="form-{place._id}" onsubmit={handleReviewSubmit} class="field has-addons">
            <input type="hidden" name="placeId" value={place._id} />
            <input type="hidden" name="categoryId" value={place.categoryid?._id || place.categoryid} />
            
            <div class="control is-expanded">
              <input
                class="input is-small"
                type="text"
                name="text"
                required
              />
            </div>
            <div class="control">
              <button type="submit" class="button is-link is-small">
                Submit
              </button>
            </div>
          </form>
        </td>
        <td>
          <button class="button is-danger is-small" onclick={() => handleDeletePlaceImage(place._id)}>
            Delete
          </button>
        </td>
      </tr>
    {:else}
      <tr>
        <td colspan="7" class="has-text-centered has-text-grey py-5">
          No items found in this category layer.
        </td>
      </tr>
    {/each}
  </tbody>
</table>