import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Stopwatch.module.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 57,
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
    this.setState({ seconds: 0, laps: [] });
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

  lapsList = () =>
    this.state.laps.map(({ hours, minutes, seconds }, id) => {
      return (
        <li key={id} className={styles.lap}>
          {id}: {`${hours}:${minutes}:${seconds}`}
        </li>
      );
    });

  render() {
    const { isStarted, isTimeVisible, hours, minutes, seconds } = this.state;
    const displayProps = { hours, minutes, seconds, isStarted, incrementTime: this.incrementTime };
    const { container, btn, startBtn, pauseBtn, lapBtn, stopBtn } = styles;
    const listOfLaps = this.lapsList();

    return (
      <article className={container}>
        {/* <h1>Stopwatch</h1> */}
        {isTimeVisible && <StopwatchDisplay displayProps={displayProps} />}
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
        <ul>{listOfLaps}</ul>
      </article>
    );
  }
}

class StopwatchDisplay extends Component {
  constructor(props) {
    super(props);
  }

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

export default Stopwatch;
