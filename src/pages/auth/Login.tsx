import { A, useNavigate } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { AuthService } from '../../services/AuthService';
import { LoginDto } from '../../models/dto/LoginDto';
import { useAuth } from '../../providers/AuthProvider';

const LoginPage: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const authService = new AuthService();
  const navigate = useNavigate();
  const auth = useAuth()!!;

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
        success: (token) => {
          auth.login(token);
          navigate('/');
          return 'Logged in!';
        },
      });
    }
  };

  return (
    <div class='flex items-center justify-center'>
      <form onsubmit={onSubmit} class='md:w-2/5 border rounded p-8'>
        <h1 class='font-semibold text-lg'>Login</h1>

        <div class='flex items-center mt-2'>
          <label class='w-2/5 md:w-1/5 rounded-l-md border p-2 font-semibold'>Email</label>
          <input
            class='w-3/5 md:w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='email'
            placeholder='example@mail.com'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div class='flex items-center mt-4'>
          <label class='w-2/5 md:w-1/5 border rounded-l-md p-2 font-semibold'>Password</label>
          <input
            class='w-3/5 md:w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
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
