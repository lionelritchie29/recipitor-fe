import type { Component } from 'solid-js';
import Navbar from './components/Navbar';
import { Routes, Route } from '@solidjs/router';
import Home from './pages/Home';
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';

const App: Component = () => {
  return (
    <DragDropProvider>
      <DragDropSensors>
        <main>
          <Navbar />

          <div class='max-w-screen-xl mx-auto p-4'>
            <Routes>
              <Route path='/' component={Home} />
            </Routes>
          </div>
        </main>
      </DragDropSensors>
    </DragDropProvider>
  );
};

export default App;
