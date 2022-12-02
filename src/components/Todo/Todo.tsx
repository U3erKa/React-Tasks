import { ChangeEvent, FormEvent, useReducer } from 'react';

interface TodoState {
  todo: string;
  todos: { text: string; isDone: boolean }[];
}

interface TodoAction {
  type: ACTIONS;
  payload?: any;
}

enum ACTIONS {
  UPDATE_TEXT_FIELD = 'UPDATE_TEXT_FIELD',
  ADD_TODO = 'ADD_TODO',
  MARK_DONE = 'MARK_DONE',
  DELETE = 'DELETE',
  RESET = 'RESET',
}

const initialState: TodoState = {
  todos: [],
  todo: '',
};

function reducer(state: TodoState, { type, payload }: TodoAction): TodoState {
  switch (type) {
    case ACTIONS.UPDATE_TEXT_FIELD: {
      return { ...state, todo: payload as string };
    }
    case ACTIONS.ADD_TODO: {
      if (state.todo) {
        return { ...state, todos: [...state.todos, { text: state.todo, isDone: false }], todo: '' };
      }
      return state;
    }
    case ACTIONS.MARK_DONE: {
      const currentTodo = state.todos[payload as number];
      const updatedTodo = [
        ...state.todos,
        (state.todos[payload as number] = { ...currentTodo, isDone: !currentTodo.isDone }),
      ];

      updatedTodo.pop();
      return { ...state, todos: updatedTodo };
    }
    case ACTIONS.DELETE: {
      const updatedTodo = [...state.todos.slice(0, payload as number), ...state.todos.slice((payload + 1) as number)];
      return { ...state, todos: updatedTodo };
    }
    case ACTIONS.RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

function actText(value: string) {
  return { type: ACTIONS.UPDATE_TEXT_FIELD, payload: value };
}
function actTodo() {
  return { type: ACTIONS.ADD_TODO };
}
function actMarkDone(i: number) {
  return { type: ACTIONS.MARK_DONE, payload: i };
}
function actDelete(i: number) {
  return { type: ACTIONS.DELETE, payload: i };
}
function actReset() {
  return { type: ACTIONS.RESET };
}

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTodoChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => dispatch(actText(value));
  const handleAddForm = (e: FormEvent<HTMLButtonElement>) => dispatch(actTodo());
  const handleMarkDone = (i: number) => dispatch(actMarkDone(i));
  const handleDelete = (i: number) => dispatch(actDelete(i));
  const handleReset = (e: FormEvent<HTMLButtonElement>) => dispatch(actReset());

  const mapTodos = () =>
    state.todos.map(({ text, isDone }, i) => (
      <li key={i}>
        <p>{text}</p>
        <button onClick={() => handleMarkDone(i)}>Mark as {isDone && 'un'}done</button>
        <button onClick={() => handleDelete(i)}>Delete</button>
      </li>
    ));

  return (
    <div>
      <input name="todo" value={state.todo} onChange={handleTodoChange} />
      <button onClick={handleAddForm}>Add</button>
      <button onClick={handleReset}>Reset</button>
      <ul>{mapTodos()}</ul>
    </div>
  );
}
