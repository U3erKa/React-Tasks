import { ChangeEvent, FormEvent, useReducer } from 'react';

interface TodoState {
  todo: string;
  todos: string[];
  done: string[];
}

interface TodoAction {
  type: ACTIONS;
  payload?: string;
}

enum ACTIONS {
  UPDATE_TEXT_FIELD = 'UPDATE_TEXT_FIELD',
  ADD_TODO = 'ADD_TODO',
  MARK_DONE = 'MARK_DONE',
}

const initialState: TodoState = {
  todos: [],
  todo: '',
  done: [],
};

function reducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case ACTIONS.UPDATE_TEXT_FIELD: {
      return { ...state, todo: action.payload as string };
    }
    case ACTIONS.ADD_TODO: {
      return { ...state, todos: [...state.todos, state.todo] };
    }
    case ACTIONS.MARK_DONE: {
      return { ...state };
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
function actMarkDone() {
  return { type: ACTIONS.MARK_DONE };
}

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTodoChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => dispatch(actText(value));
  const handleAddForm = (e: FormEvent<HTMLButtonElement>) => dispatch(actTodo());
  const handleMarkDone = (e: FormEvent<HTMLButtonElement>) => dispatch(actMarkDone());

  const mapTodos = () =>
    state.todos.map((todoItem, i) => (
      <li key={i}>
        <p>{todoItem}</p>
        <button onClick={handleMarkDone}>Mark done</button>
      </li>
    ));

  return (
    <div>
      <input name="todo" value={state.todo} onChange={handleTodoChange} />
      <button onClick={handleAddForm}>Add</button>
      <ul>{mapTodos()}</ul>
    </div>
  );
}
