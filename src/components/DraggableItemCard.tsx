import { Component, children } from 'solid-js';
import { createDraggable } from '@thisbeyond/solid-dnd';
import { Item } from '../models/Item';

const DraggableItemCard: Component<{ item: Item }> = (props) => {
  const draggable = createDraggable(props.item.ID);
  return (
    <div
      classList={{ 'opacity-25': draggable.isActiveDraggable }}
      use:draggable
      class='rounded-lg cursor-pointer shadow hover:shadow-lg'>
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

export default DraggableItemCard;
