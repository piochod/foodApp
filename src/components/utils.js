export const validateMail = (email, setEmailError) => {

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    return true
  };

export const validatePassword = (password, setPasswordError) => {
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter")
      return
    }
    if (!/[A-Z]/.test(password)) {
        setPasswordError("Password must contain at least one uppercase letter")
        return
    }
    if (!/\d/.test(password)) {
        setPasswordError("Password must contain at least one number")
        return
    }
    if (!/[@$!%*?&]/.test(password)) {
        setPasswordError("Password must contain at least one special character (@, $, !, %, *, ?, &)")
        return
    }

    return true
  }