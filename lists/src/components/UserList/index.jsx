// @ts-check
'use strict';

import React, { Component } from 'react';
import User from '../User';

class UserList extends Component {
  /**
   * @param {void} props
   */
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, firstName: 'U1erKa', lastName: 'U1' },
        { id: 2, firstName: 'U2erKa', lastName: 'U2' },
        { id: 3, firstName: 'U3erKa', lastName: 'U3' },
        { id: 4, firstName: 'U4erKa', lastName: 'U4' },
        { id: 5, firstName: 'U5erKa', lastName: 'U5' },
      ],
    };
  }

  deleteUser = (/** @type {number} */ userId) => {
    const newUsers = this.state.users.filter((user) => userId !== user.id);

    this.setState({ users: newUsers });
  };

  render() {
    const users = this.state.users.map((user) => (
      <li key={user.id}>
        <User userData={user} cb={this.deleteUser} />
      </li>
    ));

    return <ul>{users}</ul>;
  }
}

export default UserList;
