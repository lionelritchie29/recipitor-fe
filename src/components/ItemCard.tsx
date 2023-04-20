import { Component } from 'solid-js';
import { Item } from '../models/Item';
import { createDraggable } from '@thisbeyond/solid-dnd';

const ItemCard: Component<{ item: Item }> = (props) => {
  const draggable = createDraggable(props.item.ID);
  return (
    <div
      use:draggable
      class='rounded-lg cursor-pointer shadow hover:shadow-lg transition hover:scale-105'>
      <div
        class='rounded-lg border'
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
