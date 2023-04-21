import { createDroppable } from '@thisbeyond/solid-dnd';
import { Component, JSXElement } from 'solid-js';

const BasketDropArea: Component<{ id: number }> = (props) => {
  const droppable = createDroppable(props.id);
  return (
    <div
      use:droppable
      classList={{ 'bg-blue-100': droppable.isActiveDroppable }}
      class='rounded-lg text-gray-400 flex items-center justify-center bg-gray-100 border-2 border-blue-300 border-dashed min-h-[12rem] w-full'>
      Drag item here
    </div>
  );
};

export default BasketDropArea;
