import { Field, useFormikContext } from 'formik';
import { TodoInputEntry } from 'components/Todo/types';
import styles from './Todoform.module.scss';

export default function TodoInput() {
  const { errors } = useFormikContext<TodoInputEntry>();
  return (
    <Field as="textarea" className={`${styles.formInput} ${errors.todo ? styles.formInputError : ''}`} name="todo" />
  );
}
