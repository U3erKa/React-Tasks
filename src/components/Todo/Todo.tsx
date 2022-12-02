import { ChangeEvent, FormEvent, useReducer } from 'react';
import action, { reducer, initialState } from './reducer';

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mapTodos = () =>
    state.todos.map(({ text, isDone }, i) => (
      <li key={i}>
        <p>{text}</p>
        <button onClick={() => dispatch(action.actMarkDone(i))}>Mark as {isDone && 'un'}done</button>
        <button onClick={() => dispatch(action.actDelete(i))}>Delete</button>
      </li>
    ));

  return (
    <div>
      <input
        name="todo"
        value={state.todo}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => dispatch(action.actText(value))}
      />
      <button onClick={(e: FormEvent<HTMLButtonElement>) => dispatch(action.actTodo())}>Add</button>
      <button onClick={(e: FormEvent<HTMLButtonElement>) => dispatch(action.actReset())}>Reset</button>
      <ul>{mapTodos()}</ul>
    </div>
  );
}
