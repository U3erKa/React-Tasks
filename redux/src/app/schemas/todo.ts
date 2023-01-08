import * as yup from 'yup';

export const todoSchema = yup.object({
  todo: yup.string().required('Please, enter a text and press "Add"'),
});
