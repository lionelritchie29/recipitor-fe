import { Component, JSXElement } from 'solid-js';
import { createDraggable } from '@thisbeyond/solid-dnd';

const Draggable: Component<{ id: number; children: JSXElement }> = (props) => {
  const draggable = createDraggable(props.id);
  return (
    <div classList={{ 'opacity-25': draggable.isActiveDraggable }} use:draggable>
      {props.children}
    </div>
  );
};

export default Draggable;
