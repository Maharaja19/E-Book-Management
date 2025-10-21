import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './Navigation';

// Main App component
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}