export const formatTime = (isoString: string | Date) => {
  const { locale } = useI18n();

  return new Date(isoString).toLocaleTimeString(locale.value, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
