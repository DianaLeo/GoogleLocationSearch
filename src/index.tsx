import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './pages/Layout';
import LocationAutocomplete from './components/location-autocomplete';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GoogleApiLoaderProvider } from './context/googleApiLoader';

function App() {
  return (
    <BrowserRouter basename='/GoogleLocationSearch'>
      <Provider store={store}>
        <GoogleApiLoaderProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LocationAutocomplete />} />
            </Route>
          </Routes>
        </GoogleApiLoaderProvider>
      </Provider>
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
