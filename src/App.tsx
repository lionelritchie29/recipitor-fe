import type { Component, JSXElement } from 'solid-js';
import Navbar from './components/Navbar';
import { Routes, Route } from '@solidjs/router';
import Home from './pages/Home';
import RegisterPage from './pages/auth/Register';
import LoginPage from './pages/auth/Login';

const App: Component<{ children: JSXElement }> = ({ children }) => {
  return (
    <main>
      {children}
      <Navbar />

      <div class='max-w-screen-xl mx-auto p-4'>
        <Routes>
          <Route path='/' component={Home} />

          <Route path='/auth'>
            <Route path='/register' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
          </Route>
        </Routes>
      </div>
    </main>
  );
};

export default App;
