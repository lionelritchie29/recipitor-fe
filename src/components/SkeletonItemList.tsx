import { Component, For } from 'solid-js';
import SkeletonItemCard from './SkeletonItemCard';

const SkeletonItemList: Component = () => {
  const dummy = new Array(20).fill(0);

  return (
    <ul class='grid grid-cols-2 max-h-64 md:max-h-full overflow-auto md:grid-cols-4 gap-4 mr-4'>
      <For each={dummy}>
        {(_) => (
          <li>
            <SkeletonItemCard />
          </li>
        )}
      </For>
    </ul>
  );
};

export default SkeletonItemList;
