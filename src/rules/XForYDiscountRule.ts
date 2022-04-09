import { PriceRule } from '../models/PriceRule';
import { Product } from '../models/Product';

export default class XForYDiscountRule implements PriceRule {
  public readonly key: string = 'x_for_y_discount';

  public readonly description: string = 'X for Y deal on Product';

  public readonly skuApplies: string[] = ['atv'];

  private quantity: number = 3;

  private chargeQuantity: number = 2;

  private sku: string = 'atv';

  constructor(quantity: number, chargeQuantity: number, sku: string) {
    this.quantity = quantity;
    this.chargeQuantity = chargeQuantity;
    this.sku = sku;
  }

  applyRule(cart: Product[]) {
    const filteredBySKUProducts = cart.filter((product) => product.sku === this.sku);
    const newLength = filteredBySKUProducts.length - (filteredBySKUProducts.length % this.quantity);
    for (let i = 0; i < newLength; i += 1) {
      if (i % this.quantity >= this.chargeQuantity) {
        filteredBySKUProducts[i].price = 0;
      }
    }
  }
}
