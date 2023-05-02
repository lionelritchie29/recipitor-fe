import { Component } from 'solid-js';
import { ListItem } from '../models/List';

const ListItemCard: Component<{ item: ListItem; isLast: boolean }> = ({ item, isLast = false }) => {
  return (
    <div class='flex space-x-3 items-center px-2 py-4' classList={{ 'border-b': !isLast }}>
      <div class='w-1/4'>
        <img src={item.Image} class='rounded border' alt={item.Name} />
      </div>

      <div class='flex space-x-2 text-sm text-gray-500'>
        {item.Quantity || 'Unknown Quantity'} x {item.Amount || 'Unknown Amount'}
      </div>
    </div>
  );
};

export default ListItemCard;
