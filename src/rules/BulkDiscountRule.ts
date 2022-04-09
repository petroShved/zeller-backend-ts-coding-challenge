import { PriceRule } from '../models/PriceRule';
import { Product } from '../models/Product';

export default class BulkDiscountRule implements PriceRule {
  public readonly key: string = 'bulk_discount';

  public readonly description: string = 'Buy more than n products get discount';

  public readonly skuApplies: string[] = ['ipd'];

  private discountPrice: number = 0;

  private numberOfProducts: number = 4;

  private sku: string = 'ipd';

  constructor(discountPrice: number, numberOfProducts: number, sku: string) {
    this.discountPrice = discountPrice;
    this.numberOfProducts = numberOfProducts;
    this.sku = sku;
  }

  applyRule(cart: Product[]) {
    const filteredBySKUProducts = cart.filter((product) => product.sku === this.sku);
    if (filteredBySKUProducts.length > this.numberOfProducts) {
      filteredBySKUProducts.map((product) => {
        product.price = this.discountPrice;
        return product;
      });
    }
  }
}
