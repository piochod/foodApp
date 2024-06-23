import React, { useState } from 'react'
import Cookies from 'js-cookie';
import './Login.css'

const Login = (registeredSuccesfully) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  console.log(email);
  console.log(password);

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    
    try {
      const response = await fetch('https://localhost:7182/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.status === 200) {
        const result = await response.json();
        const accessToken = result.accessToken

        Cookies.set('accessToken', accessToken, { expires: 1 });
        window.location.href= 'http://localhost:3000/foodApp/home'
        // routing na homepage
      } else if (response.status === 401) {
        setLoginError('Invalid mail or password');
      } else {
        setLoginError('Unknown error');
      }
    } catch (error) {
      setLoginError('Unkown error');
    }
  }

  return (
    <div className='login'>
      <form>
        <h1>Sign in</h1>
        <input 
          value={email} 
          placeholder='e-mail'
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input 
          value={password}
          placeholder='password'
          onChange={(ev) => setPassword(ev.target.value)}
          type='password'
        />
        <input 
          className={'inputButton'} 
          type="button" 
          onClick={handleLogin} 
          value={'Sign in'}
        />
        <label className="errorLabel">{loginError}</label>
      </form>
    </div>
  )
}

export default Login