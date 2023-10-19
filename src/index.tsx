import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './pages/Layout';
import LocationAutocomplete from './components/LocationAutocomplete/LocationAutocomplete';

function App() {
  return (
    <BrowserRouter basename='/googleLocationSearch'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LocationAutocomplete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
