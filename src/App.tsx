import type { Component, JSXElement } from 'solid-js';
import Navbar from './components/Navbar';
import { Routes, Route } from '@solidjs/router';
import Home from './pages/Home';

const App: Component<{ children: JSXElement }> = ({ children }) => {
  return (
    <main>
      {children}
      <Navbar />

      <div class='max-w-screen-xl mx-auto p-4'>
        <Routes>
          <Route path='/' component={Home} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
