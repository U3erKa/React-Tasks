import { ChangeEvent, FormEvent, useCallback, useReducer } from 'react';
import action, { reducer, initialState } from './reducer';
import styles from './Todo.module.scss';
import checkOutline from './check-outline.svg';
import checkBold from './check-bold.svg';
import deleteOutline from './delete-outline.svg';

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mapTodos = useCallback(() =>
    state.todos.map(({ text, isDone }, i) => (
      <li className={styles.todoListItem} key={i}>
        <p className={styles.todoListItemText}>{text}</p>
        <button className={styles.todoListBtn} onClick={() => dispatch(action.actMarkDone(i))}>
          <img className={styles.todoListBtnIcon} src={isDone ? `${checkBold}` : `${checkOutline}`} alt={`Mark as ${isDone ? '' : 'un'}done`} />
        </button>
        <button className={styles.todoListBtn} onClick={() => dispatch(action.actDelete(i))}>
          <img className={styles.todoListBtnIcon} src={deleteOutline} alt={'Delete'} />
        </button>
      </li>
    )), [state.todos]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <textarea
            className={styles.todoInput}
            name="todo"
            value={state.todo}
            onChange={({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => dispatch(action.actText(value))}
          />
          <button className={styles.todoBtn} onClick={(e: FormEvent<HTMLButtonElement>) => dispatch(action.actTodo())}>
            Add
          </button>
          <button className={styles.todoBtn} onClick={(e: FormEvent<HTMLButtonElement>) => dispatch(action.actReset())}>
            Reset
          </button>
        </fieldset>
        <ul className={styles.todoList}>{mapTodos()}</ul>
      </form>
    </div>
  );
}
