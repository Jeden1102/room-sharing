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
    if (image.includes('vercel-storage.com')) {
      imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(image)}&w=1200&h=630&fit=cover&q=90`;
    } else {
      imageUrl = image;
    }
  }

  return useSeoMeta({
    title: t(title),
    ogTitle: t(title),
    description: t(description),
    ogDescription: t(description),
    ogImage: imageUrl,
    twitterCard: "summary_large_image",
  });
}