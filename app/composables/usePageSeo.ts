export default function usePageSeo({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  const config = useRuntimeConfig();

  const imageUrl = image
    ? config.public.APP_BASE_URI + image
    : config.public.APP_BASE_URI + "/images/hero.png";

  return useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: imageUrl,
    twitterCard: "summary_large_image",
  });
}
