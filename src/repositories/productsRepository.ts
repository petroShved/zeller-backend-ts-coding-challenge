import { Product } from '../models/Product';

const PRODUCTS_REPOSITORY: Product[] = [
  {
    sku: 'ipd',
    name: 'Super iPad',
    price: 549_99,
  },
  {
    sku: 'mbp',
    name: 'MacBook Pro',
    price: 1399_99,
  },
  {
    sku: 'atv',
    name: 'Apple TV',
    price: 109_50,
  },
  {
    sku: 'vga',
    name: 'VGA adapter',
    price: 30_00,
  },
];

export default class ProductsRepository {
  static getBySKU(sku: string): Product {
    const product = PRODUCTS_REPOSITORY.find((item) => item.sku === sku);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  }
}
