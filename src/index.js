// @ts-check
'use strict';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Goods from './Goods';
import reportWebVitals from './reportWebVitals';

// @ts-expect-error
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Goods
      name="Item1"
      description="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
      price={5000}
      amount={50}
    />
    <Goods
      name="Item2"
      description="Sapiente recusandae doloribus dolorem assumenda fugiat facilis."
      price={6000}
      amount={20}
    />
    <Goods
      name="Item3"
      description="In numquam quod incidunt nesciunt neque a eligendi, earum possimus."
      price={7000}
      amount={0}
    />
    {/* @ts-expect-error */}
    <Goods />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
