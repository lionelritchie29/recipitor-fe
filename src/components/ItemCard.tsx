import { Component } from 'solid-js';
import { Item } from '../models/Item';

const ItemCard: Component<{ item: Item }> = (props) => {
  return (
    <div class='rounded-lg cursor-pointer shadow hover:shadow-lg'>
      <div
        class='rounded-lg border bg-white'
        style={{
          'background-image': `url("${props.item.Image}")`,
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          width: '150px',
          height: '150px',
        }}
      />
    </div>
  );
};

export default ItemCard;
