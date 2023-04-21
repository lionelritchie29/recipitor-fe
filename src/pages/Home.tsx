import { Component, For, Show, createSignal } from 'solid-js';
import ItemCard from '../components/ItemCard';
import Draggable from '../components/Draggable';
import { Item } from '../models/Item';
import { DragDropProvider, DragDropSensors, DragEvent, DragOverlay } from '@thisbeyond/solid-dnd';

const Home: Component = () => {
  const [activeDragItemId, setActiveDragItemId] = createSignal<null | number>(null);

  const onDragStart = ({ draggable }: DragEvent) => {
    setActiveDragItemId((draggable.id as number) || null);
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
    <DragDropProvider onDragStart={onDragStart}>
      <DragDropSensors>
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

            <div class='rounded-lg bg-gray-100 border-2 border-blue-300 border-dashed min-h-[30rem] w-full'></div>
          </section>
        </section>

        <DragOverlay>
          <Show when={activeDragItemId() != null}>
            <ItemCard item={dummyItems.find((d) => d.ID == activeDragItemId())!!} />
          </Show>
        </DragOverlay>
      </DragDropSensors>
    </DragDropProvider>
  );
};

export default Home;
