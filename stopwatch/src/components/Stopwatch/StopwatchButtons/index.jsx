// @ts-check
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Stopwatch.module.css';

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

export default StopwatchButtons;
