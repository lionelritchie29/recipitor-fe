import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Navbar: Component = () => {
  return (
    <nav class='border-b p-4 shadow'>
      <div class='max-w-screen-xl mx-auto flex justify-between text-blue-500 hover:text-blue-600'>
        <div class='font-semibold'>
          <A href='/'>Recipitor</A>
        </div>
        <ul class='flex space-x-4'></ul>
      </div>
    </nav>
  );
};

export default Navbar;
