import { Product, Inventory, Variant, Image } from "../types";

abstract class Datasource {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  abstract getProducts(): Promise<Product[]>;

  abstract getProduct(productId: string): Promise<Product | undefined>;

  abstract getInventory(): Promise<Inventory[]>;

  abstract mapEndpointProductToProduct(product: unknown): Product;

  abstract mapToInventory(products: Product[]): Inventory[];

  abstract mapVariantsToProductVariant(variant: unknown): Variant;

  abstract mapVariantImagesToProductImages(variants: unknown[]): Image[];
}

export default Datasource;
