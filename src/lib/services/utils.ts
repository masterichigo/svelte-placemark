import { currentPlaces, loggedInUser } from "$lib/runes.svelte";
import { apiService } from "./api-service";
import { currentDataSets } from "$lib/runes.svelte";

export function clearDonationState() {
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
}



export function computeByRating(categories: any[], places: any[]) {
  const labels: string[] = [];
  const values: number[] = [];

  // 1. Loop through each category first
  categories.forEach((category: any) => {
    // Add the category title to our chart labels
    labels.push(category.title);

    let totalRatingForCategory = 0;
    let totalReviewsForCategory = 0;

    //Find all POIs belonging to this specific category
    const matchingPlaces = places.filter(
      (place: any) => place.categoryid.toString() === category._id.toString()
    );

    // 3. Accumulate ratings and review counts from the matching POIs
    matchingPlaces.forEach((place: any) => {
      if (place.reviews && place.reviews.length > 0) {
        place.reviews.forEach((review: any) => {
          totalRatingForCategory += review.rating || 0;
          totalReviewsForCategory += 1; // Count every individual review
        });
      }
    });

    // 4. Calculate the true average (divide by total reviews, not total places)
    let avgRating = 0;

    if (totalReviewsForCategory > 0) {
      avgRating = totalRatingForCategory / totalReviewsForCategory;
    } 
    else {
      avgRating = 0;
    }

    // Push the result rounded to 1 decimal place
    values.push(Number(avgRating.toFixed(1)));
  });

  currentDataSets.ratingsByCategory.labels = labels;
  currentDataSets.ratingsByCategory.datasets[0].values = values;
}

export function computeByReviews(users: any[], places: any[]) {
  const labels: string[] = [];
  const values: number[] = [];

  // 1. Loop through each user first
  users.forEach((user: any) => {
    // Combine first and last name for the chart label
    const fullName = `${user.firstName} ${user.lastName}`;
    labels.push(fullName);

    let userReviewCount = 0;

    // 2. Look through every place to find reviews
    places.forEach((place: any) => {
      // Check if the place has any reviews at all
      if (place.reviews && place.reviews.length > 0) {
        
        // 3. Iterate through the reviews and check for a matching user ID
        place.reviews.forEach((review: any) => {
          if (review.userId === user._id) {
            userReviewCount += 1;
          }
        });
      }
    });

    // 4. Push the final count for this user to our values array
    values.push(userReviewCount);
  });

  // 5. Update your Frappe dataset state
  currentDataSets.reviewsByUser.labels = labels;
  currentDataSets.reviewsByUser.datasets[0].values = values;
}

export async function refreshPlaceState(places: any) {
  currentPlaces.places = places;
  
 
}

export async function refreshIdsCatsPlaces(places: any, categories: any, users: any) {
  computeByRating(categories, places);
  computeByReviews(users, places);
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

