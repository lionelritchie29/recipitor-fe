import { A, useNavigate } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { AuthService } from '../../services/AuthService';
import { LoginDto } from '../../models/dto/LoginDto';

const RegisterPage: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const navigate = useNavigate();
  const authService = new AuthService();

  const onRegister = async (e: Event) => {
    e.preventDefault();
    if (!email() || !password() || !confirmPassword()) {
      toast.error('All fields must be filled!');
    } else if (password() !== confirmPassword()) {
      toast.error('Password and its confirmation must match with each other!');
    } else if (password().length < 6) {
      toast.error('Password must consists at least 6 characters!');
    } else {
      const dto: LoginDto = {
        email: email(),
        password: password(),
      };
      await toast.promise(authService.register(dto), {
        loading: 'Registering...',
        error: (e) => toast.error(e.message),
        success: () => {
          navigate('/auth/login');
          return 'Registered! You may now proceed to login.';
        },
      });
    }
  };

  return (
    <div class='flex items-center justify-center'>
      <form onsubmit={onRegister} class='md:w-2/5 border rounded p-8'>
        <h1 class='font-semibold text-lg'>Register</h1>

        <div class='flex items-center mt-2'>
          <label class='w-2/5 md:w-1/5 border rounded-l-md p-2'>Email</label>
          <input
            class='w-3/5 md:w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='email'
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder='example@mail.com'
          />
        </div>

        <div class='flex items-center mt-4'>
          <label class='w-2/5 md:w-1/5 border rounded-l-md p-2'>Password</label>
          <input
            class='w-3/5 md:w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='password'
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder='**********'
          />
        </div>

        <div class='flex items-center mt-4'>
          <label class='w-2/5 md:w-1/5 border rounded-l-md p-2'>Confirm</label>
          <input
            class='w-3/5 md:w-4/5 outline-none rounded-r-md border-t border-b border-r p-2'
            type='password'
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            placeholder='**********'
          />
        </div>

        <div class='flex justify-between mt-4'>
          <div>
            Already have an account?{' '}
            <A class='text-blue-600 hover:text-blue-700' href='/auth/login'>
              Login
            </A>
          </div>

          <button
            type='submit'
            class='bg-blue-600 hover:bg-blue-700 text-white border p-2 rounded-md'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
