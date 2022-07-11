import * as Yup from 'yup';
import { validateOnlyLetters } from '../utils/validatesInput';

export const schema  = Yup.object().shape({
  username: Yup.string().min(0).required('User name is required').test('Only letters', 'Only letters and big than 3 letter', value => validateOnlyLetters(value)),
  password: Yup.string().min(6, 'Password must be at least 6 characters'),
});