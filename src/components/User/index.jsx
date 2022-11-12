// @ts-check
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
  /**
   * @param {{userData: object, cb: function}} props
   */
  constructor(props) {
    super(props);
    this.state = {
      likes: Math.ceil(Math.random() * 100),
      isLiked: false,
    };
  }

  static propTypes = {
    userData: PropTypes.object.isRequired,
    cb: PropTypes.func.isRequired,
  };

  likeUser = () => {
    const { likes: currentLikes, isLiked: isCurrentlyLiked } = this.state;
    this.setState({ likes: currentLikes + (isCurrentlyLiked ? -1 : 1), isLiked: !isCurrentlyLiked });
  };

  render() {
    const { userData: {firstName, lastName, id}, cb: deleteUser } = this.props;
    return (
      <>
        <p>First name: {firstName || 'No Data'}</p>
        <p>Last name: {lastName || 'No Data'}</p>
        <p>Likes: {this.state.likes}</p>
        <button onClick={this.likeUser}>Like me!</button>
        <button onClick={() => (deleteUser(id))}>Delete me!</button>
      </>
    );
  }
}

export default User;
