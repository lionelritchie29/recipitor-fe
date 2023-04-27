import { A } from '@solidjs/router';
import { Component } from 'solid-js';

const LoginPage: Component = () => {
  return (
    <div class='flex items-center justify-center'>
      <form class='w-2/5 border rounded p-8'>
        <h1 class='font-semibold text-lg'>Login</h1>

        <div class='flex items-center mt-2'>
          <label class='w-1/5 rounded-l-md border p-2 font-semibold'>Email</label>
          <input
            class='w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='email'
            placeholder='example@mail.com'
          />
        </div>

        <div class='flex items-center mt-4'>
          <label class='w-1/5 border rounded-l-md p-2 font-semibold'>Password</label>
          <input
            class='w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='password'
            placeholder='**********'
          />
        </div>

        <div class='flex justify-between mt-4'>
          <div>
            Dont have an account yet?{' '}
            <A class='hover:text-blue-600' href='/auth/register'>
              Register
            </A>
          </div>

          <button class='bg-blue-600 hover:bg-blue-700 text-white border p-2 rounded-md'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
