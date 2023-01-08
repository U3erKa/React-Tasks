// @ts-check
'use strict';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {{ name: string; description: string; price: number; amount: number }} props
 */
/*
function Goods({ name, description, price, amount }) {
  return (
    <article className="goodsCard">
      <h1 className="goodsName">{name || 'No Data'}</h1>
      <p className="goodsDescription">{description || 'Missing Description'}</p>
      <p className="goodsAmount">{amount > 0 ? 'Ready for Order' : 'Out of Stock'}</p>
      <p className="goodsPrice">$ {price || NaN}</p>
    </article>
  );
}
*/
class Goods extends React.Component {
  render() {
    const { name, description, price, amount } = this.props;
    return (
      <article className="goodsCard">
        <h1 className="goodsName">{name || 'No Data'}</h1>
        <p className="goodsDescription">{description || 'Missing Description'}</p>
        <p className="goodsAmount">{amount > 0 ? 'Ready for Order' : 'Out of Stock'}</p>
        {/* <p className="goodsAmount">{amount > 0 ? `Remains: ${amount}` : 'Out of Stock'}</p> */}
        <p className="goodsPrice">$ {price || NaN}</p>
      </article>
    );
  }
}

Goods.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
};

export default Goods;
