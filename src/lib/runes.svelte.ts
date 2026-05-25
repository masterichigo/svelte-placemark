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

