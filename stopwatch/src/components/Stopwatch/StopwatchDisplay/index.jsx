// @ts-check
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Stopwatch.module.css';

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

export default StopwatchDisplay;
