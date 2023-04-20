import { Component } from 'solid-js';
import ItemCard from '../components/ItemCard';

const Home: Component = () => {
  return (
    <section class='flex'>
      <section class='w-2/3 border-r'>
        <div class='mb-4'>
          <h2 class='font-semibold'>Available Items</h2>
          <p class='text-gray-500'>You can move these items to the basket beside.</p>
        </div>

        <ul class='grid grid-cols-5 gap-4 mr-4'>
          <li>
            <ItemCard />
          </li>
          <li>
            <ItemCard />
          </li>
          <li>
            <ItemCard />
          </li>
          <li>
            <ItemCard />
          </li>
          <li>
            <ItemCard />
          </li>
          <li>
            <ItemCard />
          </li>
          <li>
            <ItemCard />
          </li>
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
  );
};

export default Home;
