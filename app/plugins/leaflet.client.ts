import L from "leaflet";
import "leaflet.markercluster";

export default defineNuxtPlugin(() => {
  if (process.client) {
    (window as any).L = L;
  }

  return {
    provide: {
      L,
    },
  };
});
