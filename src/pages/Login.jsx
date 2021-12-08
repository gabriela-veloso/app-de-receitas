import React, { useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';

function Login() {
  const {
    handleEmail,
    handlePassword,
    email,
    password,
    disabled,
  } = useContext(RecipesContext);

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
        // onClick={ handleSubmit }
      >
        Enviar
      </button>
    </div>
  );
}

export default Login;
