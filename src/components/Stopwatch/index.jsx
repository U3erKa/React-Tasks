// @ts-check
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Stopwatch.module.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 59,
      minutes: 59,
      hours: 0,
      isStarted: false,
      isTimeVisible: false,
      laps: [],
    };
  }

  startTimer = () => {
    this.setState({ isStarted: true, isTimeVisible: true });
  };
  pauseTimer = () => {
    this.setState({ isStarted: false });
  };
  stopTimer = () => {
    this.setState({ isTimeVisible: false, isStarted: false });
    this.setState({ hours: 0, minutes: 0, seconds: 0, laps: [] });
  };
  addLap = () => {
    const { laps, hours, minutes, seconds } = this.state;
    this.setState({ laps: [...laps, { hours, minutes, seconds }] });
  };
  incrementTime = () => {
    const { seconds, minutes, hours } = this.state;
    this.setState({ seconds: seconds + 1 });

    if (seconds === 60 - 1) {
      this.setState({ minutes: minutes + 1, seconds: 0 });
    }
    if (minutes === 60 - 1 && seconds === 60 - 1) {
      this.setState({ hours: hours + 1, minutes: 0 });
    }
  };

  render() {
    const { isStarted, isTimeVisible, hours, minutes, seconds, laps: lapsList } = this.state;
    const displayProps = { hours, minutes, seconds, isStarted, incrementTime: this.incrementTime };
    const buttonsProps = {
      isStarted,
      pauseTimer: this.pauseTimer,
      startTimer: this.startTimer,
      addLap: this.addLap,
      stopTimer: this.stopTimer,
    };
    const { container, heading } = styles;

    return (
      <article className={container}>
        <h1 className={heading}>Stopwatch</h1>
        {isTimeVisible && <StopwatchDisplay displayProps={displayProps} />}
        <StopwatchButtons buttonsProps={buttonsProps} />
        {lapsList.length !== 0 && <StopwatchLapsList lapsList={lapsList} />}
      </article>
    );
  }
}

class StopwatchDisplay extends Component {
  static propTypes = {
    displayProps: PropTypes.shape({
      hours: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
      isStarted: PropTypes.bool.isRequired,
      incrementTime: PropTypes.func.isRequired,
    }),
  };

  componentDidMount() {
    this.startTimer();
  }
  /**
   * @param {{ displayProps: { isStarted: boolean; }; }} prevProps
   */
  componentDidUpdate(prevProps) {
    const { isStarted } = this.props.displayProps;
    if (prevProps.displayProps.isStarted !== isStarted) {
      isStarted ? this.startTimer() : this.stopTimer();
    }
  }
  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.intervalId = setInterval(() => {
      this.props.displayProps.incrementTime();
    }, 1000);
  };
  stopTimer = () => {
    clearInterval(this.intervalId);
  };

  render() {
    const { hours, minutes, seconds } = this.props.displayProps;
    const { time } = styles;
    return (
      <p className={time}>
        Time: {hours} : {minutes} : {seconds}
      </p>
    );
  }
}

class StopwatchButtons extends Component {
  static propTypes = {
    buttonsProps: PropTypes.shape({
      isStarted: PropTypes.bool.isRequired,
      startTimer: PropTypes.func.isRequired,
      pauseTimer: PropTypes.func.isRequired,
      stopTimer: PropTypes.func.isRequired,
      addLap: PropTypes.func.isRequired,
    }),
  };

  render() {
    const { isStarted, pauseTimer, startTimer, addLap, stopTimer } = this.props.buttonsProps;
    const { btn, startBtn, pauseBtn, lapBtn, stopBtn } = styles;

    return (
      <>
        <button className={`${isStarted ? pauseBtn : startBtn} ${btn}`} onClick={isStarted ? pauseTimer : startTimer}>
          {isStarted ? 'Pause' : 'Start'}
        </button>
        <button className={`${lapBtn} ${btn}`} onClick={addLap}>
          Add lap
        </button>
        <button className={`${stopBtn} ${btn}`} onClick={stopTimer}>
          Stop
        </button>
      </>
    );
  }
}

class StopwatchLapsList extends Component {
  static propTypes = {
    lapsList: PropTypes.array.isRequired,
  };

  lapsList = () =>
    this.props.lapsList.map(({ hours, minutes, seconds }, /** @type {number} */ id) => {
      return (
        <li key={id} className={styles.lap}>
          <p>
            {id}: {`${hours}:${minutes}:${seconds}`}
          </p>
        </li>
      );
    });

  render() {
    const listOfLaps = this.lapsList();
    const { laps } = styles;

    return (
      <>
        <h2 className={laps}>Laps:</h2>
        <ul>{listOfLaps}</ul>
      </>
    );
  }
}

export default Stopwatch;
