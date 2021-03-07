import React, { useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:8001/register",
    }).then((res)=> console.log(res));
  };
  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:8001/login",
    })
  };
  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8001/getUser",
    })
  };

  return (
    <div className="App">
    <div>
      <h1>Register</h1>
      <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
      <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
      <button onClick={register}>submit</button>
    </div>

    <div>
      <h1>Login</h1>
      <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
      <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
      <button onClick={login}>submit</button>
    </div>

    <div>
      <h1>Get User</h1>
      <button onClick={getUser}>Submit</button>
    </div>
    </div>
  );
}

export default App;
