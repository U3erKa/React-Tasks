import React, { Component } from 'react';
// @ts-ignore
import { SignForm } from 'components';
import { RouteProps } from 'react-router-dom';

interface LoginRegisterProps extends RouteProps {
  toggleRegistered: (state: boolean) => void;
}

export interface LoginRegisterState {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  joinAs?: string;
  isSpammed?: boolean;
  isRemembered?: boolean;
}

export default class LoginRegister extends Component<LoginRegisterProps, LoginRegisterState> {
  constructor(props: LoginRegisterProps) {
    super(props);
    this.state = { ...this.initialState };
  }
  get isRegisterPage() {
    const {
      location: { pathname },
    } = this.props as any;
    return pathname === '/register';
  }
  get initialState() {
    return this.isRegisterPage
      ? {
          firstName: '',
          lastName: '',
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
          joinAs: '',
          isSpammed: false,
        }
      : {
          email: '',
          password: '',
          isRemembered: false,
        };
  }

  componentDidMount() {
    const {
      location: { pathname },
    } = this.props as any;
    this.props.toggleRegistered(pathname === '/register');
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };
  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.setState({ ...this.initialState });
    console.log(this.state);
  };

  render() {
    return (
      <main>
        <SignForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          isRegisterPage={this.isRegisterPage}
          {...this.state}
        />
      </main>
    );
  }
}
