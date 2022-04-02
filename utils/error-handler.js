const handleError = error => {
  if (error.includes('internal')) {
    return {emailError: 'Check your e-mail', passwordError: 'Check your password'};
  }
  if (error.includes('invalid-email')) {
    return {emailError: 'Invalid e-mail', passwordError: ''};
  }
  if (error.includes('user-not-found')) {
    return {emailError: 'User not found', passwordError: ''};
  }
  if (error.includes('wrong-password')) {
    return {emailError: '', passwordError: 'Wrong password'};
  }

  // Used when creating user.
  if (error.includes('weak-password')) {
    const pwdError = 'Password must be at least 6 characters long';
    return {emailError: '', passwordError: pwdError};
  }
  if (error.includes('already')) {
    return {emailError: 'Email address already in use', passwordError: ''};
  }
  if (error.includes('formatted')) {
    return {emailError: 'The email address is not valid', passwordError: ''};
  }

  if (error.includes('user-mismatch')) {
    return {emailError: 'Wrong e-mail', passwordError: ''};
  }
  
  console.log(error);
  return {emailError: '', passwordError: ''};
}

export default handleError;
