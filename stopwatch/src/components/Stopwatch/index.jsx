// @ts-check
'use strict';

import React, { Component } from 'react';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchButtons from './StopwatchButtons';
import StopwatchLapsList from './StopwatchLapsList';
import styles from './Stopwatch.module.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
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

export default Stopwatch;
