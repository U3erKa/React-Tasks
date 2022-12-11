import { useCallback } from 'react';
import action from 'app/reducer';
import { Action, State } from './types';
import styles from './Todo.module.scss';
import checkBold from './img/check-bold.svg';
import checkOutline from './img/check-outline.svg';
import deleteOutline from './img/delete-outline.svg';

export default function Todolist({ state, dispatch }: { state: State; dispatch: (arg0: Action) => void }) {
  const mapTodos = useCallback(
    () =>
      state.todos.map(({ text, isDone, id }) => (
        <li className={styles.todoListItem} key={id}>
          <p className={styles.todoListItemText}>{text}</p>
          <button type="button" className={styles.todoListBtn} onClick={() => dispatch(action.actMarkDone(id))}>
            <img
              className={styles.todoListBtnIcon}
              src={isDone ? `${checkBold}` : `${checkOutline}`}
              alt={`Mark as ${!isDone && 'un'}done`}
            />
          </button>
          <button type="button" className={styles.todoListBtn} onClick={() => dispatch(action.actDelete(id))}>
            <img className={styles.todoListBtnIcon} src={deleteOutline} alt={'Delete'} />
          </button>
        </li>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.todos]
  );
  return <ul className={styles.todoList}>{mapTodos()}</ul>;
}
