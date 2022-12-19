import { useDispatch } from 'react-redux';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { addTodo, resetTodos } from 'app/slices/todos';
import { todoSchema } from 'app/schemas/todo';
import { TodoInputEntry } from 'components/Todo/types';
import TodoInput from './TodoInput';
import styles from './Todoform.module.scss';

const initialValues: TodoInputEntry = { todo: '' };

export default function Todoform() {
  const dispatch = useDispatch();
  const handleSubmit = (values: TodoInputEntry, formikBag: FormikHelpers<TodoInputEntry>) => {
    dispatch(addTodo(values.todo));
    formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={todoSchema} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <TodoInput />
          <button type="submit" className={styles.formBtn}>
            Add
          </button>
          <button type="button" className={styles.formBtn} onClick={() => dispatch(resetTodos())}>
            Reset
          </button>
          <ErrorMessage name="todo" component={'p'} className={styles.formInputErrorText} />
        </fieldset>
      </Form>
    </Formik>
  );
}
