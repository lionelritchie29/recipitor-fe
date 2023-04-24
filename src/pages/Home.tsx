import { Component, For, Show, createResource, createSignal } from 'solid-js';
import ItemCard from '../components/ItemCard';
import Draggable from '../components/Draggable';
import { DragDropProvider, DragDropSensors, DragEvent, DragOverlay } from '@thisbeyond/solid-dnd';
import BasketDropArea from '../components/BasketDropArea';
import BasketItemCard from '../components/BasketItemCard';
import { BasketItem } from '../models/BasketItem';
import { ItemService } from '../services/ItemService';
import toast from 'solid-toast';
import Basket from '../components/Basket';
import ItemList from '../components/ItemList';

const Home: Component = () => {
  const [activeDragItemId, setActiveDragItemId] = createSignal<null | number>(null);
  const [basketItems, setBasketItems] = createSignal<BasketItem[]>([]);
  const itemService = new ItemService();
  const [items] = createResource(itemService.getItems);

  const onDragStart = ({ draggable }: DragEvent) => {
    setActiveDragItemId((draggable.id as number) || null);
  };

  const onDragEnd = ({ draggable, droppable }: DragEvent) => {
    if (draggable && droppable) {
      const itemExist = basketItems().find((basket) => basket.item.ID == draggable.id);
      if (!itemExist) {
        const item = (items() ?? []).find((i) => i.ID === draggable.id);

        if (item) {
          const newBasketItem: BasketItem = {
            item,
            quantity: 1,
            amount: '',
          };
          setBasketItems((items) => [...items, newBasketItem]);
          toast.success(`1 ${newBasketItem.item.Name} added!`);
        }
      } else {
        setBasketItems(
          basketItems().map((item) => {
            if (item.item.ID == itemExist.item.ID) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        );

        toast.success(`Another ${itemExist.item.Name} added!`);
      }
    }
  };

  return (
    <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <DragDropSensors />
      <section class='flex'>
        <section class='w-2/3 border-r'>
          <div class='mb-4'>
            <h2 class='font-semibold'>Available Items</h2>
            <p class='text-gray-500'>You can move these items to the basket beside.</p>
          </div>

          <ItemList items={items} />
        </section>
        <section class='w-1/3 ml-4'>
          <div class='mb-4'>
            <h2 class='font-semibold'>Basket</h2>
            <p class='text-gray-500'>Select an item from the left and drag it here.</p>
          </div>

          <BasketDropArea id={1}></BasketDropArea>

          <Basket basketItems={basketItems} setBasketItems={setBasketItems} />
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
