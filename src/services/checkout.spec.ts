import Checkout from './checkout';
import ProductsRepository from '../repositories/productsRepository';
import XForYDiscountRule from '../rules/XForYDiscountRule';
import BulkDiscountRule from '../rules/BulkDiscountRule';

describe('checkout tests', () => {
  it('should calculate without rule', () => {
    const co = new Checkout();
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('vga'));
    expect(co.total()).toBe(24900);
  });
  it('should calculate correct total for rule 3 for 2 deal', () => {
    const rules = [
      new XForYDiscountRule(3, 2, 'atv'),
    ];
    const co = new Checkout(rules);
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('vga'));
    expect(co.total()).toBe(249_00);
  });
  it('should calculate correct bulk discount', () => {
    const rules = [
      new BulkDiscountRule(499_99, 4, 'ipd'),
    ];
    const co = new Checkout(rules);
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    expect(co.total()).toBe(2718_95);
  });
  it('should work with multiple rules', () => {
    const rules = [
      new BulkDiscountRule(499_99, 4, 'ipd'),
      new XForYDiscountRule(3, 2, 'atv'),
    ];
    const co = new Checkout(rules);
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('atv'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('ipd'));
    co.scan(ProductsRepository.getBySKU('vga'));
    expect(co.total()).toBe(2748_95);
  });
});
