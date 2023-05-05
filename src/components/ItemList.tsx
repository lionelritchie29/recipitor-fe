import { Component, For, Resource } from 'solid-js';
import { Item } from '../models/Item';
import Draggable from './Draggable';
import ItemCard from './ItemCard';

const ItemList: Component<{ items: Resource<Item[]> }> = ({ items }) => {
  return (
    <ul class='grid grid-cols-4 gap-4 mr-4'>
      <For each={items() ?? []}>
        {(item, i) => (
          <li>
            <Draggable id={item.ID}>
              <ItemCard item={item} />
            </Draggable>
          </li>
        )}
      </For>
    </ul>
  );
};

export default ItemList;
