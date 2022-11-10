// @ts-check
'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Message from './components/Message';

// @ts-expect-error
const root = ReactDOM.createRoot(document.getElementById('root'));
const message = {
  from: 'U1erKa',
  message:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati corrupti esse nam dolorem possimus natus. Recusandae, labore neque, qui assumenda ipsam ipsum atque dolorem voluptatum, cupiditate tempora totam repellat. Numquam.',
};
const message2 = {
  from: 'U2erKa',
  message:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur sapiente expedita nobis error praesentium nihil distinctio hic, perferendis dolor, nam repellat quas possimus corrupti! At, consectetur. Dicta corrupti voluptate nisi.',
};

root.render(
  <React.StrictMode>
    <Message from={message.from} message={message.message} />
    <Message from={message2.from} message={message2.message} />
  </React.StrictMode>
);
