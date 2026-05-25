import { apiService } from "$lib/services/api-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      places: await apiService.getPlaces(session.token, session._id),
      session
    };
  }
};