import { Field, Form, Formik, FormikHelpers } from 'formik';
import action from 'app/reducer';
import styles from './Todoform.module.scss';
import { Action, State } from 'components/Todo/types';

export default function Todoform({ state, dispatch }: { state: State; dispatch: (arg0: Action) => void }) {
  const handleSubmit = (values: any, formikBag: FormikHelpers<State>) => {
    dispatch(action.actTodo(values.todo));
    formikBag.resetForm();
  };

  return (
    <Formik initialValues={{ todo: '' } as any} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <Field as="textarea" className={styles.formInput} name="todo" />
          <button type="submit" className={styles.formBtn}>
            Add
          </button>
          <button type="button" className={styles.formBtn} onClick={() => dispatch(action.actReset())}>
            Reset
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
}
