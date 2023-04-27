import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Navbar: Component = () => {
  return (
    <nav class='border-b shadow'>
      <div class='p-4 max-w-screen-xl mx-auto flex justify-between text-blue-500 hover:text-blue-600'>
        <div class='font-semibold'>
          <A href='/'>Recipitor</A>
        </div>
        <ul class='flex space-x-4'>
          <li class='text-gray-600 font-semibold hover:text-black'>
            <A href='/auth/register'>Register</A>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
