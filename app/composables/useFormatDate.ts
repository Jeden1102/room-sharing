export const formatDate = (isoString: string | Date) => {
  const { locale } = useI18n();
  const date = new Date(isoString);

  return new Intl.DateTimeFormat(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
