import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Stopwatch.module.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isStarted: false,
      isTimeVisible: false,
      laps: [],
    };
  }

  startTimer = () => {
    this.setState({ isStarted: true, isTimeVisible: true });
    this.intervalId = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  };
  pauseTimer = () => {
    this.setState({ isStarted: false });
    clearInterval(this.intervalId);
  };
  addLap = () => {
    const { laps, seconds } = this.state;
    this.setState({ laps: [...laps, seconds] });
  };
  stopTimer = () => {
    this.pauseTimer();
    this.setState({ isTimeVisible: false });
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
    const { isStarted, isTimeVisible, seconds } = this.state;
    const { container, btn, startBtn, pauseBtn, lapBtn, stopBtn } = styles;
    const laps = this.lapsList();

    return (
      <article className={container}>
        {/* <h1>Stopwatch</h1> */}
        {isTimeVisible && <StopwatchDisplay seconds={seconds} />}
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

class StopwatchDisplay extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    seconds: PropTypes.number.isRequired,
  };

  render() {
    const { seconds } = this.props;
    const { time } = styles;
    return <p className={time}>Time: {seconds}</p>;
  }
}

export default Stopwatch;
