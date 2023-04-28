import { Component, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { useAuth } from '../providers/AuthProvider';

const Navbar: Component = () => {
  const auth = useAuth()!!;

  return (
    <nav class='border-b shadow'>
      <div class='p-4 max-w-screen-xl mx-auto flex justify-between text-blue-500 hover:text-blue-600'>
        <div class='font-semibold'>
          <A href='/'>Recipitor</A>
        </div>
        <ul class='flex space-x-4'>
          <Show when={auth.user()}>
            <li class='text-black'>{auth.user()?.email}</li>
            <li class='text-gray-600 font-semibold hover:text-black'>
              <button onclick={() => auth.logout()}>Log out</button>
            </li>
          </Show>

          <Show when={!auth.user()}>
            <li class='text-gray-600 font-semibold hover:text-black'>
              <A href='/auth/login'>Sign in</A>
            </li>
          </Show>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
