import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import styles from './Header.module.scss';
// @ts-ignore
import logo from 'img/logo.png';

interface HeaderProps {
  isRegistered: boolean;
}

export default class Header extends Component<HeaderProps> {
  render() {
    const { isRegistered } = this.props;

    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <Link to={'/'}>
                <img className={styles.logo} src={logo} alt="Homepage" />
              </Link>
            </li>
            <li className={styles.navListItem}>
              {isRegistered ? (
                <Link className={styles.navListItemLink} to={'/login'}>
                  Login
                </Link>
              ) : (
                <Link className={styles.navListItemLink} to={'/register'}>
                  Register
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
