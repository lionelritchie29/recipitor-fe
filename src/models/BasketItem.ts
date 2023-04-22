import { Item } from './Item';

export interface BasketItem {
  item: Item;
  quantity: number;
  amount: string;
}
