type Image = {
  src: string;
  alt?: string;
};

export type Teaser = {
  images: Image[];
  name: string;
  badge1Value: string;
  badge2Value: string;
  location: string;
  area: string;
  occupants: string;
  rooms: string;
  price: string;
};
