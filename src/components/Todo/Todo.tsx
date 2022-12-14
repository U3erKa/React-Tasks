import { Todoform } from 'components';
import Todolist from './Todolist/Todolist';
import styles from './Todo.module.scss';

export default function Todo() {
  return (
    <div className={styles.container}>
      <Todoform />
      <Todolist />
    </div>
  );
}
