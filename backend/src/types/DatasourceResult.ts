type ConvictionalVariantImage = {
  src: string;
};

type ConvictionalVariantPrice = {
  currency_code: string;
  amount: string;
};

export type ConvictionalProductVariant = {
  id: string;
  product_id: string;
  title: string;
  sku: string;
  position: number;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  grams: number;
  weight: number;
  weight_unit: string;
  price: ConvictionalVariantPrice;
  images: ConvictionalVariantImage[];
  barcode?: string;
};

export type ConvictionalProduct = {
  id: string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  tages: string;
  variants: ConvictionalProductVariant[];
};
