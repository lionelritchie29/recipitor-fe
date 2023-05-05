import { Component } from 'solid-js';
import { BasketItem } from '../models/BasketItem';
import { useBasket } from '../providers/BasketProvider';

const BasketItemCard: Component<{
  item: BasketItem;
}> = ({ item }) => {
  const basket = useBasket()!!;

  return (
    <div class='flex space-x-3 items-center border-b px-2 py-4'>
      <div class='w-1/4'>
        <img src={item.item.Image} class='rounded border' alt={item.item.Name} />
      </div>

      <div class='flex space-x-2 text-sm text-gray-500'>
        <div class='w-3/5'>
          <label>Qty</label>

          <div class='flex'>
            <button
              onclick={() => basket.decreaseQty(item.item.ID)}
              class='bg-red-600 hover:bg-red-700 rounded font-bold text-white py-2 px-3 border'>
              -
            </button>
            <input
              onchange={(e) => basket.setQty(item.item.ID, parseInt(e.currentTarget.value))}
              value={item.quantity}
              class='border p-2 rounded w-full'
              type='number'
              placeholder='Quantity'
            />
            <button
              onclick={() => basket.increaseQty(item.item.ID)}
              class='bg-green-600 hover:bg-green-700 rounded font-bold text-white py-2 px-3 border'>
              +
            </button>
          </div>
        </div>
        <div>
          <label>Amount</label>
          <input
            onchange={(e) => basket.setAmount(item.item.ID, e.currentTarget.value)}
            value={item.amount}
            required
            class='border p-2 rounded w-full outline-none'
            type='text'
            placeholder='Amount (kg, gram, etc)'
          />
        </div>
      </div>
    </div>
  );
};

export default BasketItemCard;
