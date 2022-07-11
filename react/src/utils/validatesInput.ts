export const validatePassword = (value: string | undefined): boolean => { 
  if (value === undefined) return false;

  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9]).{6,}$/.test(value);
}
  
export const validateOnlyLetters = (value: string | undefined): boolean => {
  if (value === undefined) return false;

  return /[\D]{3}/.test(value);
}