import React, { useState } from 'react'
import './Register.css'
import { validateMail, validatePassword } from './utils'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false)
  const [registerError, setRegisterError] = useState('')

  const onButtonClick = () => {
    const validMail = validateMail(email,setEmailError);
    const validPassword = validatePassword(password,setPasswordError);
    console.log(validMail);
    if (validMail && validPassword){
      handleRegister();
    }
  }

  const handleRegister = async () => {
    const data = {
      email: email,
      password: password,
    };
    
    try {
      const response = await fetch('https://localhost:7182/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response)
      if (response.status === 200) {
        setRegisteredSuccessfully(true);
        
      } else if (response.status === 400) {
        setRegisterError('User already exists');
      } else {
        setRegisterError('Unknown error');
      }
    } catch (error) {
      setRegisterError('Unkown error');
    }
  }
  return (
    <div className='register'>
      <form>
        <input 
          value={email} 
          placeholder='e-mail'
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label className="errorLabel">{emailError}</label>
        <input 
          value={password}
          placeholder='password'
          onChange={(ev) => setPassword(ev.target.value)}
          type='password'
        />
        <label className="errorLabel">{passwordError}</label>
        <input 
          className={'inputButton'} 
          type="button" 
          onClick={onButtonClick} 
          value={'Sign up'}
        />
        <label className="errorLabel">{registerError}</label>
      </form>
    </div>
  )
}

export default Register