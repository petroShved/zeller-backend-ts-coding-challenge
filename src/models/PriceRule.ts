import { Product } from './Product';

export interface PriceRule {
  key: string;
  description: string;
  skuApplies: string[];
  applyRule(cart: Product[]): void
}
