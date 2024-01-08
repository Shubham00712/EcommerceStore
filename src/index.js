import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import Item from './Item';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<App></App>}></Route>
          <Route path='/item' element={<Item></Item>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
