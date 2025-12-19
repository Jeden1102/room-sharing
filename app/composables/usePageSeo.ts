export default function usePageSeo({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  const { t } = useI18n();
  const config = useRuntimeConfig();

  let imageUrl = config.public.APP_BASE_URI + "/images/hero.webp";

  if (image) {
    imageUrl = image;
  }

  return useSeoMeta({
    title: t(title),
    ogTitle: t(title),
    ogUrl: config.public.APP_BASE_URI,
    description: t(description),
    ogDescription: t(description),
    ogImage: imageUrl,
    twitterCard: "summary_large_image",
  });
}