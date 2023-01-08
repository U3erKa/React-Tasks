import { useCallback, useEffect } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { getTodos, markDone, deleteTodo } from 'app/slices/todoReducer';
import { Todo } from '../types';
import styles from './Todolist.module.scss';
import checkBold from '../img/check-bold.svg';
import checkOutline from '../img/check-outline.svg';
import deleteOutline from '../img/delete-outline.svg';

export default function Todolist() {
  const todos = useSelector<RootState, Todo[]>((state) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapTodos = useCallback(
    () =>
      todos.map(({ text, isDone, id }: Todo) => (
        <li className={styles.todoListItem} key={id}>
          <p className={styles.todoListItemText}>{text}</p>
          <button
            type="button"
            className={styles.todoListBtn}
            // @ts-expect-error
            onClick={() => dispatch(markDone({ id, text, isDone }) as unknown as AnyAction)}
          >
            <img
              className={styles.todoListBtnIcon}
              src={isDone ? `${checkBold}` : `${checkOutline}`}
              alt={`Mark as ${!isDone && 'un'}done`}
            />
          </button>
          <button
            type="button"
            className={styles.todoListBtn}
            // @ts-expect-error
            onClick={() => dispatch(deleteTodo(id) as unknown as AnyAction)}
          >
            <img className={styles.todoListBtnIcon} src={deleteOutline} alt={'Delete'} />
          </button>
        </li>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todos]
  );

  return <ul className={styles.todoList}>{mapTodos()}</ul>;
}
