export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  if (to.meta.auth && status.value === "unauthenticated") {
    return navigateTo("/");
  }

  if (to.meta.unauthenticatedOnly && status.value === "authenticated") {
    return navigateTo("/user/profile");
  }
});
