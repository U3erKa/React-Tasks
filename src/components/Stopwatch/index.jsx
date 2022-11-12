import React, { Component } from 'react';
import styles from './Stopwatch.module.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isStarted: false,
      laps: [],
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
  addLap = () => {
    const { laps, seconds } = this.state;
    this.setState({ laps: [...laps, seconds] });
  };
  stopTimer = () => {
    this.pauseTimer();
    this.setState({ seconds: 0, laps: [] });
  };

  lapsList = () =>
    this.state.laps.map((time, id) => {
      return (
        <li key={id} className={styles.lap}>
          {id}: {time}
        </li>
      );
    });

  render() {
    const { seconds, isStarted } = this.state;
    const { container, time, btn, startBtn, pauseBtn, lapBtn, stopBtn } = styles;
    const laps = this.lapsList();

    return (
      <article className={container}>
        <p className={time}>Time: {seconds}</p>
        <button
          className={`${isStarted ? pauseBtn : startBtn} ${btn}`}
          onClick={isStarted ? this.pauseTimer : this.startTimer}
        >
          {isStarted ? 'Pause' : 'Start'}
        </button>
        <button className={`${lapBtn} ${btn}`} onClick={this.addLap}>
          Add lap
        </button>
        <button className={`${stopBtn} ${btn}`} onClick={this.stopTimer}>
          Stop
        </button>
        <p>Laps:</p>
        <ul>{laps}</ul>
      </article>
    );
  }
}

export default Stopwatch;
