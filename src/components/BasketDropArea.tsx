import { createDroppable } from '@thisbeyond/solid-dnd';
import { Component, JSXElement } from 'solid-js';

const BasketDropArea: Component<{ id: number }> = (props) => {
  const droppable = createDroppable(props.id);
  return (
    <div
      use:droppable
      classList={{ 'bg-blue-100': droppable.isActiveDroppable }}
      class='rounded-lg text-gray-400 flex items-center justify-center transition ease-in-out border-2 border-blue-300 border-dashed min-h-[12rem] w-full'>
      To add an item to the list, drag it here.
    </div>
  );
};

export default BasketDropArea;
