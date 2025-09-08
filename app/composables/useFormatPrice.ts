export const useFormatPrice = () => {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pl-PL").format(value);
  return { formatPrice };
};
