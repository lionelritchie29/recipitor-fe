import { Component } from 'solid-js';
import { Item } from '../models/Item';

const SkeletonItemCard: Component = () => {
  return (
    <div
      style={{
        height: '70px',
      }}
      class='bg-white bg-gray-100 animate-pulse flex border items-center rounded-lg cursor-pointer hover:shadow p-2'></div>
  );
};

export default SkeletonItemCard;
