import { A, useNavigate } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { AuthService } from '../../services/AuthService';
import { LoginDto } from '../../models/dto/LoginDto';

const LoginPage: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const authService = new AuthService();
  const navigate = useNavigate();

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    if (!email() || !password()) {
      toast.error('All fields must be filled!');
    } else {
      const dto: LoginDto = {
        email: email(),
        password: password(),
      };
      await toast.promise(authService.login(dto), {
        loading: 'Logging in...',
        error: (e) => e.message,
        success: () => {
          setTimeout(() => {
            navigate('/');
          }, 3000);
          return 'Logged in! you will be redirected in 3 seconds.';
        },
      });
    }
  };

  return (
    <div class='flex items-center justify-center'>
      <form onsubmit={onSubmit} class='w-2/5 border rounded p-8'>
        <h1 class='font-semibold text-lg'>Login</h1>

        <div class='flex items-center mt-2'>
          <label class='w-1/5 rounded-l-md border p-2 font-semibold'>Email</label>
          <input
            class='w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='email'
            placeholder='example@mail.com'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div class='flex items-center mt-4'>
          <label class='w-1/5 border rounded-l-md p-2 font-semibold'>Password</label>
          <input
            class='w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='password'
            placeholder='**********'
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <div class='flex justify-between mt-4'>
          <div>
            Dont have an account yet?{' '}
            <A class='text-blue-600 hover:text-blue-700' href='/auth/register'>
              Register
            </A>
          </div>

          <button
            type='submit'
            class='bg-blue-600 hover:bg-blue-700 text-white border p-2 rounded-md'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
