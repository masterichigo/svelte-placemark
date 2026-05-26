export const load = async ({ cookies }) => {
  cookies.delete("place-user", { path: "/" });
};