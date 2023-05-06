import { Component } from 'solid-js';
import { Item } from '../models/Item';

const ItemCard: Component<{ item: Item; height?: string }> = ({ item, height = '50px' }) => {
  return (
    <div class='flex border items-center rounded-lg cursor-pointer hover:shadow p-2'>
      <div
        class='rounded-lg bg-white w-1/4'
        style={{
          'background-image': `url("${item.Image}")`,
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          height: height,
        }}></div>

      <div class='ml-3 text-sm'>{item.Name}</div>
    </div>
  );
};

export default ItemCard;
