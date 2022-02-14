export type Image = {
  source: string;
  variantId: string;
};

export type Weight = {
  value: number;
  unit: string;
};

export type Variant = {
  id: string;
  title: string;
  sku: string;
  available: boolean;
  inventory_quantity: number;
  weight: Weight;
};

export type Product = {
  code: string;
  title: string;
  vendor: string;
  bodyHtml: string;
  variants: Variant[];
  images: Image[];
};
