import * as Yup from 'yup';
import { validateOnlyLetters, validatePassword } from '../utils/validatesInput';

export const schema  = Yup.object().shape({
  firstName: Yup.string().min(0).required('First name is required').test('Only letters', 'Only letters and big than 3 letter', value => validateOnlyLetters(value)),
  lastName: Yup.string().required('Last name is required').test('Only letters', 'Only letters and big than 3 letter', value => validateOnlyLetters(value)),
  username: Yup.string().min(0).required('User name is required').test('Only letters', 'Only letters and big than 3 letter', value => validateOnlyLetters(value)),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').test('one-uppercase character special character and a number', 'Password must contain at least one uppercase letter, one special character and one number', value => validatePassword(value)),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});