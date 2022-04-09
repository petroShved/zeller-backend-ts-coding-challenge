import { PriceRule } from '../models/PriceRule';
import { Product } from '../models/Product';

export default class Checkout {
  private pricingRules: PriceRule[];

  private products: Product[] = [];

  constructor(pricingRules: PriceRule[] = []) {
    this.pricingRules = pricingRules;
  }

  scan(product: Product) {
    this.products.push(product);
  }

  total() {
    const applicableRules = this.pricingRules.filter(
      ({ skuApplies }) => this.products.findIndex(
        ({ sku }) => skuApplies.includes(sku),
      ) !== -1,
    );
    applicableRules.forEach((rule) => {
      rule.applyRule(this.products);
    });
    return this.products
      .map((product) => product.price)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
