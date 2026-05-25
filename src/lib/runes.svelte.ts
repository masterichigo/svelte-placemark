import type { categories, places } from "$lib/types/poi-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});
export const currentPlaces= $state({
 places: []
});

export const currentDataSets = $state({
  reviewsByUser: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  },
  ratingsByCategory: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  }
});

