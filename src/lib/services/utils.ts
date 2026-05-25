import { currentPlaces, loggedInUser } from "$lib/runes.svelte";
import { apiService } from "./api-service";

export function clearDonationState() {
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
}

export async function refreshPlaceState(Places: any) {
  currentPlaces.places =Places;
 
}

export async function refreshPlaceMap(map: LeafletMap) {
  const places = await apiService.getPlaces(loggedInUser.token, loggedInUser._id);
  places.forEach((place: any) => {
    if (place.latitude && place.longitude) { 
      const popup = `<strong>${place.name}</strong><br>
        <small>${place.categoryName || 'Uncategorized'}</small>`;
      map.addMarker(place.latitude, place.longitude, popup);
    }
  });
  const lastPlace = places[places.length - 1];
  if (lastPlace) map.moveTo(lastPlace.lat, lastPlace.lng); {
    map.moveTo(lastPlace.latitude, lastPlace.longitude);
  }
}
