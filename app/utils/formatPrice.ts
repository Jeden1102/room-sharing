export const formatPrice = (value: number) => {
  return new Intl.NumberFormat("pl-PL").format(value);
};
