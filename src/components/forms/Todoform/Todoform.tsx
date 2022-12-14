import { useDispatch } from 'react-redux';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { addTodo, resetTodos } from 'app/slices/todoReducer';
import styles from './Todoform.module.scss';

const initialValues = { todo: '' };

export default function Todoform() {
  const dispatch = useDispatch();
  const handleSubmit = (values: typeof initialValues, formikBag: FormikHelpers<typeof initialValues>) => {
    dispatch(addTodo(values.todo));
    formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <Field as="textarea" className={styles.formInput} name="todo" />
          <button type="submit" className={styles.formBtn}>
            Add
          </button>
          <button type="button" className={styles.formBtn} onClick={() => dispatch(resetTodos())}>
            Reset
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
}
