// @ts-check
'use strict';

import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Message extends Component {
  static propTypes = { from: PropTypes.string.isRequired, message: PropTypes.string.isRequired };

  state = {
    isRead: false,
  };

  render() {
    const { from, message } = this.props;
    return (
      <article>
        <h1>From: {from}</h1>
        <p>Message: {message}</p>
        <button
          disabled={this.state.isRead}
          onClick={() => {
            this.setState({ isRead: true });
          }}
        >
          {this.state.isRead ? `Message from ${from} is read` : 'Mark as read'}
        </button>
      </article>
    );
  }
}
