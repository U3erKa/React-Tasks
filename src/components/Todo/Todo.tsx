import { ChangeEvent, FormEvent, useReducer } from 'react';
import action, { reducer, initialState } from './reducer';
import Todolist from './Todolist';
import styles from './Todo.module.scss';

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          <button className={styles.todoBtn} onClick={() => dispatch(action.actTodo())}>
            Add
          </button>
          <button className={styles.todoBtn} onClick={() => dispatch(action.actReset())}>
            Reset
          </button>
        </fieldset>
      </form>
      <Todolist state={state} dispatch={dispatch} />
    </div>
  );
}
