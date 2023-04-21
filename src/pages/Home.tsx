import { Component, For, Show, createSignal } from 'solid-js';
import ItemCard from '../components/ItemCard';
import Draggable from '../components/Draggable';
import { Item } from '../models/Item';
import { DragDropProvider, DragDropSensors, DragEvent, DragOverlay } from '@thisbeyond/solid-dnd';
import BasketDropArea from '../components/BasketDropArea';

const Home: Component = () => {
  const [activeDragItemId, setActiveDragItemId] = createSignal<null | number>(null);
  const [basketItems, setBasketItems] = createSignal<Item[]>([]);

  const onDragStart = ({ draggable }: DragEvent) => {
    setActiveDragItemId((draggable.id as number) || null);
  };

  const onDragEnd = ({ draggable, droppable }: DragEvent) => {
    if (draggable && droppable) {
      const isExist = basketItems().find((item) => item.ID == draggable.id);
      if (!isExist) {
        const item = dummyItems.find((i) => i.ID === draggable.id);

        if (item) {
          setBasketItems((items) => [...items, item]);
        }
      }
    }
  };

  const dummyItems: Item[] = [
    {
      ID: 1,
      Name: 'Apple',
      Description: 'Apple Fruit',
      Image: 'https://i.ibb.co/bg7wK41/apple-158989157.jpg',
      CreatedAt: new Date(),
      UpdateAt: new Date(),
      DeletedAt: null,
    },
    {
      ID: 2,
      Name: 'Chicken Breast',
      Description: 'Breast of chicken',
      Image: 'https://i.ibb.co/bRnWYMm/Chicken-Breast-Boneless-3-4-Pieces-Hero-Shot-1.jpg',
      CreatedAt: new Date(),
      UpdateAt: new Date(),
      DeletedAt: null,
    },
    {
      ID: 3,
      Name: 'Banana',
      Description: 'Banana fruit',
      Image: 'https://i.ibb.co/mz8n7Lw/Banana-Single-1.jpg',
      CreatedAt: new Date(),
      UpdateAt: new Date(),
      DeletedAt: null,
    },
  ];

  return (
    <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <DragDropSensors />
      <section class='flex'>
        <section class='w-2/3 border-r'>
          <div class='mb-4'>
            <h2 class='font-semibold'>Available Items</h2>
            <p class='text-gray-500'>You can move these items to the basket beside.</p>
          </div>

          <ul class='grid grid-cols-5 gap-4 mr-4'>
            <For each={dummyItems}>
              {(item, i) => (
                <li>
                  <Draggable id={item.ID}>
                    <ItemCard item={item} />
                  </Draggable>
                </li>
              )}
            </For>
          </ul>
        </section>
        <section class='w-1/3 ml-4'>
          <div class='mb-4'>
            <h2 class='font-semibold'>Basket</h2>
            <p class='text-gray-500'>Select an item from the left and drag it here.</p>
          </div>

          <div class='mb-4 p-2 rounded-lg border shadow-sm'>
            <Show when={!basketItems().length}>
              <div class='text-xs text-gray-500'>No items added.</div>
            </Show>

            <ul class='grid grid-cols-6 gap-4'>
              <For each={basketItems()}>
                {(item) => (
                  <li>
                    <ItemCard height='50px' item={item}></ItemCard>
                  </li>
                )}
              </For>
            </ul>
          </div>

          <BasketDropArea id={1}></BasketDropArea>
        </section>
      </section>

      <DragOverlay>
        <Show when={activeDragItemId() != null}>
          <ItemCard item={dummyItems.find((d) => d.ID == activeDragItemId())!!} />
        </Show>
      </DragOverlay>
    </DragDropProvider>
  );
};

export default Home;
