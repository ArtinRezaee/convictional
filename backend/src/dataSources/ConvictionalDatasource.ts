import axios from "axios";
import {
  ConvictionalProduct,
  Product,
  Variant,
  ConvictionalProductVariant,
  Image,
  Inventory,
} from "../types";
import { CONVICTIONAL_PRODUCTS } from "../environment";
import Datasource from "./Datasource";

class ConvictionalDatasource extends Datasource {
  constructor() {
    super(CONVICTIONAL_PRODUCTS);
  }

  async getProducts(): Promise<Product[]> {
    let convictionalProducts: ConvictionalProduct[] = [];

    try {
      const { data } = await axios.get(this.baseUrl);
      convictionalProducts = data as ConvictionalProduct[];
    } catch (e) {
      convictionalProducts = [];
    }

    return convictionalProducts.map((cp) =>
      this.mapEndpointProductToProduct(cp)
    );
  }

  async getProduct(productId: string): Promise<Product | undefined> {
    let convictionalProduct;

    try {
      const { data } = await axios.get(`${this.baseUrl}/${productId}`);
      convictionalProduct = data as ConvictionalProduct;
    } catch (e) {
      convictionalProduct = undefined;
    }

    return convictionalProduct
      ? this.mapEndpointProductToProduct(convictionalProduct)
      : undefined;
  }

  async getInventory(): Promise<Inventory[]> {
    let products: Product[] = [];

    try {
      products = await this.getProducts();
    } catch (e) {
      products = [];
    }

    return this.mapToInventory(products);
  }

  mapEndpointProductToProduct(product: ConvictionalProduct): Product {
    return {
      code: product.id,
      title: product.title,
      vendor: product.vendor,
      bodyHtml: product.body_html,
      variants: product.variants.map((variant) =>
        this.mapVariantsToProductVariant(variant)
      ),
      images: this.mapVariantImagesToProductImages(product.variants),
    };
  }

  mapVariantsToProductVariant(variant: ConvictionalProductVariant): Variant {
    return {
      id: variant.id,
      title: variant.title,
      sku: variant.sku,
      available: false, // Assumed to be false since the endpoint doesn't provide any information
      inventory_quantity: 0, // Assumed to be zero since the endpoint doesn't provide information about the quantity
      weight: {
        unit: variant.weight_unit,
        value: variant.weight,
      },
    };
  }

  mapVariantImagesToProductImages(
    variants: ConvictionalProductVariant[]
  ): Image[] {
    return variants.flatMap((variant) => {
      return variant.images.map((image) => ({
        source: image.src,
        variantId: variant.id,
      }));
    });
  }

  mapToInventory(products: Product[]): Inventory[] {
    return products.flatMap((product) => {
      return product.variants.map((variant) => ({
        productId: product.code,
        variantId: variant.id,
        stock: 0, // Assumed to be zero since the endpoint doesn't provide any information about quantity
      }));
    });
  }
}

export default ConvictionalDatasource;
