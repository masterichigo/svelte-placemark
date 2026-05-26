import { apiService } from "$lib/services/api-service";
import type { Session } from "$lib/types/poi-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("place-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      users: await apiService.getUsers(session.token),
      categories: await apiService.getCategories(session.token),
      places: await apiService.getAllPlaces(session.token)
    };
  }
};