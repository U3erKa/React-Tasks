import { ChangeEvent, FormEvent } from 'react';
import action from 'app/reducer';
import styles from './Todoform.module.scss';
import { Action, State } from 'components/Todo/types';


export default function Todoform({ state, dispatch }: { state: State; dispatch: (arg0: Action) => void }) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <textarea
            className={styles.formInput}
            name="todo"
            value={state.todo}
            onChange={({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => dispatch(action.actText(value))}
          />
          <button className={styles.formBtn} onClick={() => dispatch(action.actTodo())}>
            Add
          </button>
          <button className={styles.formBtn} onClick={() => dispatch(action.actReset())}>
            Reset
          </button>
        </fieldset>
      </form>
  )
}
