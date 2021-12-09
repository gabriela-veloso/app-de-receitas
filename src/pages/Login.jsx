import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../contexts/RecipesContext';

function Login() {
  const {
    handleEmail,
    handlePassword,
    email,
    password,
    disabled,
  } = useContext(RecipesContext);

  const history = useHistory();

  const HandleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const saveEmail = JSON.stringify({ email });
    localStorage.setItem('user', saveEmail);
    if (localStorage.getItem('user')) {
      history.push('/comidas');
    }
  };

  return (
    <div>
      <label htmlFor="email">
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmail }
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePassword }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ HandleSubmit }
      >
        Enviar
      </button>
    </div>
  );
}

export default Login;
