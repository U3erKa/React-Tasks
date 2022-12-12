import { Action, State } from 'components/Todo/types';
import { ACTIONS } from './constants';

const resetState = {
  todos: [],
};

export const initialState: State = JSON.parse(localStorage.getItem('todos') as string) || resetState;

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ACTIONS.UPDATE_TEXT_FIELD: {
      const newState = { ...state, todo: payload };
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    }
    case ACTIONS.ADD_TODO: {
      if (payload.trim()) {
        const newState = {
          ...state,
          todos: [...state.todos, { text: payload, isDone: false, id: Date.now() }],
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
      const updatedTodo = state.todos.filter((todo) => todo.id !== payload);
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
function actTodo(value: string): Action {
  return { type: ACTIONS.ADD_TODO, payload: value };
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
