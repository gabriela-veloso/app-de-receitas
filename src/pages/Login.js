import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        <input type="email" data-testid="email-input" />
      </label>
      <label htmlFor="password">
        <input type="password" data-testid="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">Enviar</button>
    </div>
  );
}

export default Login;
