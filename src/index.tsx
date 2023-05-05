/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import './index.css';
import App from './App';
import { Toaster } from 'solid-toast';
import { AuthProvider } from './providers/AuthProvider';
import { BasketProvider } from './providers/BasketProvider';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(
  () => (
    <Router>
      <AuthProvider>
        <BasketProvider>
          <App>
            <Toaster />
          </App>
        </BasketProvider>
      </AuthProvider>
    </Router>
  ),
  root!,
);
