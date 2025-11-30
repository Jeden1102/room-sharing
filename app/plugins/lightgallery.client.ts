import LightGallery from "lightgallery/lightgallery.umd";
import lgThumbnail from "lightgallery/plugins/thumbnail/lg-thumbnail.umd";
import lgZoom from "lightgallery/plugins/zoom/lg-zoom.umd";
import lgFullscreen from "lightgallery/plugins/fullscreen/lg-fullscreen.umd";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      lightgallery: LightGallery,
      lgThumbnail,
      lgZoom,
      lgFullscreen,
    },
  };
});
