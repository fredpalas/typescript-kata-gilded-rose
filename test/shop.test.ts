import {Shop} from '../src/Shop';
import {Item} from "../src/Item";

describe('Gilded Rose', () => {
  it('Aged Brie increases its quality by one', () => {
    const item = new Item('Aged Brie', 1, 0);
    const shop = new Shop([item]);
    
    shop.update();
    
    expect(item.quality).toBe(1);
    expect(item.sellIn).toBe(0);
  });

  it('Expired Aged Brie increases its quality by two', () => {
    const item = new Item('Aged Brie', 0, 0);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(2);
    expect(item.sellIn).toBe(-1);
  });

  it('Aged Brie can\'t increases its quality after 50', () => {
    const item = new Item('Aged Brie', 1, 50);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(0);
  });
  it('Aged Brie can\'t increases its quality over 50 when is expired', () => {
    const item = new Item('Aged Brie', 0, 49);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(-1);
  });
  it('A normal product decreases its quality by one', () => {
    const item = new Item('Normal', 2, 3);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(2);
    expect(item.sellIn).toBe(1);
  });
  it('A expired normal product decreases its quality by two', () => {
    const item = new Item('Normal', 0, 3);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(1);
    expect(item.sellIn).toBe(-1);
  });
  it('A expired normal product with quality 0 can not be negative', () => {
    const item = new Item('Normal', 0, 0);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-1);
  });
  it('Sulfuras product quality never increase and its always 80', () => {
    const item = new Item('Sulfuras, Hand of Ragnaros', 10, 80);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(80);
    expect(item.sellIn).toBe(10);
  })
  it('Sulfuras product quality never increase and its always 80', () => {
    const item = new Item('Sulfuras, Hand of Ragnaros', 0, 50);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(50);
    expect(item.sellIn).toBe(0);
  })
  it('Backstate quality increase by one when sellIn its over than ten', () => {
    const item = new Item('Backstage passes to a TAFKAL80ETC concert', 12, 1);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(2);
    expect(item.sellIn).toBe(11);
  })
  it('Backstate quality increase by two when sellIn its between six and ten', () => {
    const item = new Item('Backstage passes to a TAFKAL80ETC concert', 6, 3);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(5);
    expect(item.sellIn).toBe(5);
  })
  it('Backstate quality increase by two when sellIn its between one and five', () => {
    const item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 4);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(7);
    expect(item.sellIn).toBe(0);
  })
  it('Backstate quality drops to 0 when sellIn after the concert (AKA SellIn  equal 0)', () => {
    const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
    const shop = new Shop([item]);

    shop.update();

    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(-1);
  })
});
