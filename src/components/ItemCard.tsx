import { Component } from 'solid-js';
import { Item } from '../models/Item';

const ItemCard: Component<{ item: Item; height?: string }> = ({ item, height = '150px' }) => {
  return (
    <div class='rounded-lg cursor-pointer shadow hover:shadow-lg'>
      <div
        class='rounded-lg border bg-white'
        style={{
          'background-image': `url("${item.Image}")`,
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          height: height,
        }}
      />
    </div>
  );
};

export default ItemCard;
