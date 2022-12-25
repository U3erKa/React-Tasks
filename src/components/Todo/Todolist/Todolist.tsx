import { useCallback, useEffect } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { addTodo, getTodos, markDone, deleteTodo, getTaskById } from 'app/slices/todoReducer';
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
      todos.map(({ text, isDone, id }) => (
        <li className={styles.todoListItem} key={id}>
          <p className={styles.todoListItemText}>{text}</p>
          <button
            type="button"
            className={styles.todoListBtn}
            // onClick={() => dispatch(markDone(id) as unknown as AnyAction)}
            onClick={() => console.warn('Feature not implemented')}
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
            // onClick={() => dispatch(deleteTodo(id) as unknown as AnyAction)}
            onClick={() => console.warn('Feature not implemented')}
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
