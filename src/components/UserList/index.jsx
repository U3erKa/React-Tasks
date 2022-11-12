// @ts-check
'use strict';

import React, { Component } from 'react';
import User from '../User';

class UserList extends Component {
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

  render() {
    const users = this.state.users.map((user) => (
      <li key={user.id}>
        <User userData={user} />
      </li>
    ));

    return (
      <ul>
        {users}
      </ul>
    );
  }
}

export default UserList;
