import { Accessor, Component, For, Setter, Show, createSignal } from 'solid-js';
import { BasketItem } from '../models/BasketItem';
import BasketItemCard from './BasketItemCard';
import toast from 'solid-toast';
import { CreateListDto } from '../models/dto/CreateListDto';
import { ListService } from '../services/ListService';
import { useAuth } from '../providers/AuthProvider';

const Basket: Component<{
  basketItems: Accessor<BasketItem[]>;
  setBasketItems: Setter<BasketItem[]>;
}> = ({ basketItems, setBasketItems }) => {
  const [listName, setListName] = createSignal('');
  const listService = new ListService();
  const auth = useAuth()!!;

  const increaseQty = (id: number) => {
    setBasketItems(
      basketItems().map((item) => {
        if (item.item.ID == id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );
  };

  const decreaseQty = (id: number) => {
    setBasketItems(
      basketItems()
        .map((item) => {
          if (item.item.ID == id) {
            return { ...item, quantity: Math.max(item.quantity - 1, 0) };
          }
          return item;
        })
        .filter((item) => {
          if (item.quantity == 0) toast.error(`${item.item.Name} removed`);
          return item.quantity > 0;
        }),
    );
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (!auth.user()) {
      toast.error('You are not logged in, please log in first.');
      return;
    }

    if (!listName()) {
      toast.error('Please provide a name for this list.');
    } else {
      const dto: CreateListDto = {
        name: listName(),
        items: basketItems().map((item) => ({
          id: item.item.ID,
          amount: item.amount,
          quantity: item.quantity,
        })),
      };

      await toast.promise(listService.CreateList(auth.user()!!.id, dto), {
        loading: 'Creating list...',
        error: (e) => e.message,
        success: (_) => {
          setBasketItems([]);
          setListName('');
          return 'List created!';
        },
      });
    }
  };

  return (
    <form onsubmit={onSubmit} class='mt-4 p-2 rounded-lg border shadow'>
      <Show when={!basketItems().length}>
        <div class='text-xs text-gray-500 p-2'>No items added.</div>
      </Show>

      <Show when={basketItems().length}>
        <div class='text-sm border-b pb-4 text-gray-500'>
          <label>Give this list a name</label>
          <input
            placeholder='List name'
            onchange={(e) => setListName(e.currentTarget.value)}
            type='text'
            class='w-full p-2 border rounded'
          />
        </div>

        <ul class='grid grid-cols-1'>
          <For each={basketItems()}>
            {(basketItem) => (
              <li>
                <BasketItemCard
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  item={basketItem}></BasketItemCard>
              </li>
            )}
          </For>
        </ul>

        <div class='mt-3 text-right'>
          <button
            type='submit'
            class='px-2 py-1 border rounded-lg bg-blue-500 hover:bg-blue-600 text-white'>
            Save
          </button>
        </div>
      </Show>
    </form>
  );
};

export default Basket;
