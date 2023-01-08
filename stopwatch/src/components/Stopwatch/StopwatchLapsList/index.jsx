// @ts-check
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Stopwatch.module.css';

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

export default StopwatchLapsList;
