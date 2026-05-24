import { loggedInUser } from "$lib/runes.svelte";

export function clearDonationState() {
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
}