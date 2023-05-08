import { Component, Show, createResource, createSignal } from 'solid-js';
import ItemCard from '../components/ItemCard';
import { DragDropProvider, DragDropSensors, DragEvent, DragOverlay } from '@thisbeyond/solid-dnd';
import BasketDropArea from '../components/BasketDropArea';
import { BasketItem } from '../models/BasketItem';
import { ItemService } from '../services/ItemService';
import toast from 'solid-toast';
import Basket from '../components/Basket';
import ItemList from '../components/ItemList';
import { useBasket } from '../providers/BasketProvider';
import SkeletonItemList from '../components/SkeletonItemList';

const Home: Component = () => {
  const [activeDragItemId, setActiveDragItemId] = createSignal<null | number>(null);
  const basket = useBasket()!!;
  const itemService = new ItemService();
  const [items] = createResource(itemService.getItems);

  const onDragStart = ({ draggable }: DragEvent) => {
    setActiveDragItemId((draggable.id as number) || null);
  };

  const onDragEnd = ({ draggable, droppable }: DragEvent) => {
    if (draggable && droppable) {
      const itemExist = basket.items().find((basket) => basket.item.ID == draggable.id);
      if (!itemExist) {
        const item = (items() ?? []).find((i) => i.ID === draggable.id);

        if (item) {
          const newBasketItem: BasketItem = {
            item,
            quantity: 1,
            amount: '',
          };
          basket.addItem(newBasketItem);
          toast.success(`1 ${newBasketItem.item.Name} added!`);
        }
      } else {
        basket.increaseQty(itemExist.item.ID);
        toast.success(`Another ${itemExist.item.Name} added!`);
      }
    }
  };

  return (
    <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <DragDropSensors />
      <section class='flex flex-col md:flex-row'>
        <section class='md:w-2/3 border-r'>
          <div class='mb-4'>
            <h2 class='font-semibold'>Available Items</h2>
            <p class='text-gray-500'>You can move these items to the basket beside.</p>
          </div>

          <Show when={items.loading}>
            <SkeletonItemList />
          </Show>

          <Show when={!items.loading}>
            <ItemList items={items} />
          </Show>
        </section>

        <section class='md:w-1/3 md:ml-4 border-t mt-2 pt-4'>
          <div class='mb-4'>
            <h2 class='font-semibold'>Basket</h2>
            <p class='text-gray-500'>Select an item from the left and drag it here.</p>
          </div>

          <BasketDropArea id={1}></BasketDropArea>

          <Basket />
        </section>
      </section>

      <DragOverlay>
        <Show when={activeDragItemId() != null}>
          <ItemCard item={(items() ?? []).find((d) => d.ID == activeDragItemId())!!} />
        </Show>
      </DragOverlay>
    </DragDropProvider>
  );
};

export default Home;
