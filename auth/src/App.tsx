import { SetStateAction, useState } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import { Header } from 'components';
import { Home, LoginRegister, NotFound } from 'pages';
import './App.scss';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  function toggleRegistered(state: SetStateAction<boolean>) {
    setIsRegistered(state);
  }

  return (
    <>
      <Header isRegistered={isRegistered} />
      <Switch>
        <Route path="/" exact component={() => <Home toggleRegistered={toggleRegistered} />} />
        <Route
          path="/login"
          exact
          component={(routerProps: RouteProps) => (
            <LoginRegister toggleRegistered={toggleRegistered} {...routerProps} />
          )}
        />
        <Route
          path="/register"
          exact
          component={(routerProps: RouteProps) => (
            <LoginRegister toggleRegistered={toggleRegistered} {...routerProps} />
          )}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
