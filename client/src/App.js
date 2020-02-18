import Start from './Start';
import AuthState from './contexts/authContext/AuthState';
import React from 'react';
import setToken from './utils/setToken';
import TodoState from './contexts/todoContext/TodoState';

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TodoState>
        <Start />
      </TodoState>
    </AuthState>
  );
}

export default App;
