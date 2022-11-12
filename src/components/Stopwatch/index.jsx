import React, { Component } from 'react';
import styles from './Stopwatch.module.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isStarted: false,
    };
  }

  startTimer = () => {
    this.setState({ isStarted: true });
    this.intervalId = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  };
  pauseTimer = () => {
    clearInterval(this.intervalId);
    this.setState({ isStarted: false });
  };
  stopTimer = () => {
    this.pauseTimer();
    this.setState({ seconds: 0 });
  };

  componentDidMount() {}

  render() {
    const { seconds, isStarted } = this.state;
    const { container, time, btn, startBtn, pauseBtn, stopBtn } = styles;

    return (
      <article className={container}>
        <p className={time}>Time: {seconds}</p>
        <button
          className={`${isStarted ? pauseBtn : startBtn} ${btn}`}
          onClick={isStarted ? this.pauseTimer : this.startTimer}
        >
          {isStarted ? 'Pause' : 'Start'}
        </button>
        <button className={`${stopBtn} ${btn}`} onClick={this.stopTimer}>
          Stop
        </button>
      </article>
    );
  }
}

export default Stopwatch;
