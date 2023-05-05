import { Component, For, Show, createSignal } from 'solid-js';
import BasketItemCard from './BasketItemCard';
import toast from 'solid-toast';
import { CreateListDto } from '../models/dto/CreateListDto';
import { ListService } from '../services/ListService';
import { useAuth } from '../providers/AuthProvider';
import { useBasket } from '../providers/BasketProvider';

const Basket: Component = () => {
  const [listName, setListName] = createSignal('');
  const listService = new ListService();
  const auth = useAuth()!!;
  const basket = useBasket()!!;

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
        items: basket.items().map((item) => ({
          id: item.item.ID,
          amount: item.amount,
          quantity: item.quantity,
        })),
      };

      await toast.promise(listService.create(auth.user()!!.id, dto), {
        loading: 'Creating list...',
        error: (e) => e.message,
        success: (_) => {
          basket.emptyBasket();
          setListName('');
          return 'List created!';
        },
      });
    }
  };

  return (
    <form onsubmit={onSubmit} class='mt-4 p-4 rounded-lg border shadow'>
      <Show when={!basket.items().length}>
        <div class='text-xs text-gray-500 p-2'>No items added.</div>
      </Show>

      <Show when={basket.items().length}>
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
          <For each={basket.items()}>
            {(basketItem) => (
              <li>
                <BasketItemCard item={basketItem}></BasketItemCard>
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
