import { Component, For } from 'solid-js';
import { List } from '../models/List';
import ListItemCard from './ListItemCard';

const ListItem: Component<{ list: List }> = ({ list }) => {
  return (
    <div class='mt-4 p-2 rounded-lg h-full border shadow'>
      <div class='text-sm border-b pb-2 text-gray-500'>
        <div class='font-bold text-center'>{list.Name}</div>
      </div>

      <ul class='grid grid-cols-1'>
        <For each={list.Items}>
          {(item, index) => (
            <li>
              <ListItemCard isLast={index() == list.Items.length - 1} item={item} />
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default ListItem;
