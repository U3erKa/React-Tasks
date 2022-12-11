import { useReducer } from 'react';
import { reducer, initialState } from 'app/reducer';
import {Todoform} from 'components';
import Todolist from './Todolist/Todolist';
import styles from './Todo.module.scss';

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={styles.container}>
      <Todoform state={state} dispatch={dispatch} />
      <Todolist state={state} dispatch={dispatch} />
    </div>
  );
}
