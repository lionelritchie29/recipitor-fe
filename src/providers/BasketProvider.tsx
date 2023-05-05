import {
  Accessor,
  Component,
  JSXElement,
  createContext,
  createSignal,
  onMount,
  useContext,
} from 'solid-js';
import { BasketItem } from '../models/BasketItem';
import Cookies from 'js-cookie';

const BasketContext = createContext<{
  items: Accessor<BasketItem[]>;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  setAmount: (id: number, amount: string) => void;
  setQty: (id: number, qty: number) => void;
  addItem: (item: BasketItem) => void;
  emptyBasket: () => void;
}>();

export const BasketProvider: Component<{ children: JSXElement }> = (props) => {
  const [items, setItems] = createSignal<BasketItem[]>([]);

  onMount(() => {
    const rawData = Cookies.get('basket');

    if (rawData) {
      const data = JSON.parse(rawData) as BasketItem[];
      setItems(data);
    }
  });

  const emptyBasket = () => {
    setItems([]);
    updateCookie();
  };

  const addItem = (item: BasketItem) => {
    setItems((items) => [...items, item]);
    updateCookie();
  };

  const setQty = (id: number, qty: number) => {
    if (qty < 0) qty = 0;
    setItems((items) =>
      items.map((item) => (item.item.ID == id ? { ...item, quantity: qty } : item)),
    );
    updateCookie();
  };

  const setAmount = (id: number, amount: string) => {
    setItems((items) => items.map((item) => (item.item.ID == id ? { ...item, amount } : item)));
    updateCookie();
  };

  const increaseQty = (id: number) => {
    setItems((items) =>
      items.map((item) => (item.item.ID == id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
    updateCookie();
  };

  const decreaseQty = (id: number) => {
    setItems((items) =>
      items
        .map((item) =>
          item.item.ID == id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
    updateCookie();
  };

  const updateCookie = () => {
    const data = JSON.stringify(items());
    Cookies.set('basket', data, { expires: 7 });
  };

  return (
    <BasketContext.Provider
      value={{ items, setQty, setAmount, increaseQty, decreaseQty, addItem, emptyBasket }}>
      {props.children}
    </BasketContext.Provider>
  );
};

export function useBasket() {
  return useContext(BasketContext);
}
