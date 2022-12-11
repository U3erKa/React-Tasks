export interface State {
  todo: string;
  todos: Todo[];
}

type Todo = { text: string; isDone: boolean; id: number };

interface Action {
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

const resetState = {
  todos: [],
  todo: '',
};

export const initialState: State = JSON.parse(localStorage.getItem('todos') as string) || resetState;

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ACTIONS.UPDATE_TEXT_FIELD: {
      const newState = { ...state, todo: payload as string };
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    }
    case ACTIONS.ADD_TODO: {
      if (state.todo.trim()) {
        const newState = {
          ...state,
          todos: [...state.todos, { text: state.todo, isDone: false, id: Date.now() }],
          todo: '',
        };
        localStorage.setItem('todos', JSON.stringify(newState));
        return newState;
      }
      return state;
    }
    case ACTIONS.MARK_DONE: {
      const newTodos = state.todos.map((todo) => ({
        ...todo,
        isDone: todo.id === payload ? !todo.isDone : todo.isDone,
      }));
      const newState = { ...state, todos: newTodos };

      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    }
    case ACTIONS.DELETE: {
      const updatedTodo = state.todos.filter(todo => todo.id !== payload);
      const newState = { ...state, todos: updatedTodo };
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    }
    case ACTIONS.RESET: {
      localStorage.removeItem('todos');
      return resetState;
    }
    default: {
      return state;
    }
  }
}

function actText(value: string): Action {
  return { type: ACTIONS.UPDATE_TEXT_FIELD, payload: value };
}
function actTodo(): Action {
  return { type: ACTIONS.ADD_TODO };
}
function actMarkDone(i: number): Action {
  return { type: ACTIONS.MARK_DONE, payload: i };
}
function actDelete(i: number): Action {
  return { type: ACTIONS.DELETE, payload: i };
}
function actReset(): Action {
  return { type: ACTIONS.RESET };
}

const action = { actText, actTodo, actMarkDone, actDelete, actReset };

export default action;
