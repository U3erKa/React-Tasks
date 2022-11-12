import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isStarted: false,
    };
  }

  startTimer = () => {
    this.setState({ isStarted: true });
    this.intervalId = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  };
  pauseTimer = () => {
    clearInterval(this.intervalId);
    this.setState({ isStarted: false });
  };
  stopTimer = () => {
    this.pauseTimer();
    this.setState({ time: 0 });
  };

  componentDidMount() {}

  render() {
    const { time, isStarted } = this.state;

    return (
      <article>
        <p>Time: {time}</p>
        <button className={isStarted ? 'pauseBtn' : 'startBtn'} onClick={isStarted ? this.pauseTimer : this.startTimer}>
          {isStarted ? 'Pause' : 'Start'}
        </button>
        <button onClick={this.stopTimer}>Stop</button>
      </article>
    );
  }
}

export default Stopwatch;
