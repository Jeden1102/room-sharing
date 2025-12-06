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

  const imageUrl = image
    ? image
    : config.public.APP_BASE_URI + "/images/hero.png";

  return useSeoMeta({
    title: t(title),
    ogTitle: t(title),
    description: t(description),
    ogDescription: t(description),
    ogImage: imageUrl,
    twitterCard: "summary_large_image",
  });
}
