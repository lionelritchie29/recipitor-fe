import { Component, Show, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import { useAuth } from '../providers/AuthProvider';

const Navbar: Component = () => {
  const auth = useAuth()!!;
  const [showDropdownMenu, setShowDropdownMenu] = createSignal(false);

  return (
    <nav class='border-b shadow'>
      <div class='p-4 items-center max-w-screen-xl mx-auto flex justify-between text-blue-500 hover:text-blue-600'>
        <div class='font-semibold'>
          <A href='/'>Recipitor</A>
        </div>

        <div class='relative'>
          <button
            onclick={() => setShowDropdownMenu((previous) => !previous)}
            class='md:hidden text-black border rounded p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-6 h-6'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>

          <Show when={showDropdownMenu()}>
            <ul class='absolute font-medium top-11 bg-white w-36 text-black right-0 border shadow rounded'>
              <Show when={auth.user()}>
                <li class='p-4 text-sm border-b'>
                  <A href='/' class='flex items-center space-x-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-6 h-6'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
                      />
                    </svg>
                    <div>My List</div>
                  </A>
                </li>
                <li class='p-4 text-sm border-b'>
                  <button class='flex items-center space-x-2' onclick={() => auth.logout()}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-6 h-6'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                      />
                    </svg>

                    <div>Log Out</div>
                  </button>
                </li>
              </Show>

              <Show when={!auth.user()}>
                <li class='p-4 text-sm border-b'>
                  <A href='/auth/login' class='flex items-center space-x-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-6 h-6'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                      />
                    </svg>

                    <div>Sign In</div>
                  </A>
                </li>
              </Show>
            </ul>
          </Show>
        </div>

        <ul class='space-x-4 items-center md:flex hidden'>
          <Show when={auth.user()}>
            <li class='bg-blue-500 px-2 text-gray-50 rounded-full text-black text-sm'>
              {auth.user()?.email}
            </li>
          </Show>
          <li class='text-gray-600 font-semibold hover:text-black'>
            <A href='/'>Home</A>
          </li>
          <Show when={auth.user()}>
            <li class='text-gray-600 font-semibold hover:text-black'>
              <A href='/lists'>My List</A>
            </li>
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
