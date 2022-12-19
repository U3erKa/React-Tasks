import { Field, useFormikContext } from 'formik';
import styles from './Todoform.module.scss';
import { TodoInputEntry } from 'components/Todo/types';

export default function TodoInput() {
  const { errors } = useFormikContext<TodoInputEntry>();
  return (
    <Field as="textarea" className={`${styles.formInput} ${errors.todo ? styles.formInputError : ''}`} name="todo" />
  );
}
