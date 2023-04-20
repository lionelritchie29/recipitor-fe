import type { Component } from 'solid-js';
import Navbar from './components/Navbar';
import { Routes, Route } from '@solidjs/router';
import Home from './pages/Home';

const App: Component = () => {
  return (
    <main>
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
