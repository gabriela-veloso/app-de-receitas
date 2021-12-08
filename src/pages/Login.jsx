import React from 'react';
import { useHistory } from 'react-router';

export default function Login() {
  const history = useHistory();
  function HandleClick() {
    history.push('/comidas');
  }

  return (
    <div>
      login
      <button type="button" onClick={ () => HandleClick() }>Comidas</button>
    </div>
  );
}
