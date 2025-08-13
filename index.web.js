import App from './App';
import { createRoot } from 'react-dom/client';
import React from 'react';

const rootTag = document.getElementById('root') || document.getElementById('main');
if (rootTag) {
  const root = createRoot(rootTag);
  root.render(<App />);
}
