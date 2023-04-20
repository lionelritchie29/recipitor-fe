import { Component } from 'solid-js';

const ItemCard: Component = () => {
  return (
    <div class='border rounded-lg cursor-pointer shadow hover:shadow-lg transition hover:scale-105'>
      <div
        class='rounded-lg'
        style={{
          'background-image': `url("https://i.ibb.co/bRnWYMm/Chicken-Breast-Boneless-3-4-Pieces-Hero-Shot-1.jpg")`,
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          width: '150px',
          height: '150px',
        }}
      />
    </div>
  );
};

export default ItemCard;
