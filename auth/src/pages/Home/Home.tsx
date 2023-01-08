import React, { Component } from 'react';

interface HomeProps {
  toggleRegistered: (state: boolean) => void;
}

class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.toggleRegistered(true);
  }

  render() {
    return <main>Homepage</main>;
  }
}

export default Home;
