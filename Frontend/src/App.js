import React, {useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Register, Login, DashBoard, MainPage, ChatRoom } from "./component";
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
      const token = localStorage.getItem("CC_Token");
      if (token && !socket) {
          const newSocket = io("http://localhost:4000", {
              query: {
                  token: localStorage.getItem("CC_Token"),
              },
          });

          newSocket.on("disconnect", () => {
              console.log("disconnect");
              setSocket(null);
              setTimeout(setupSocket, 3000);
              makeToast("error", "Socket Disconnected!");
          });

          newSocket.on("connect", () => {
              console.log("connect");
              makeToast("success", "Socket Connected!");
          });

          setSocket(newSocket);
      }
  };

  useEffect(()=>{
      setupSocket();
  },[]);

  return (
      <Router>
          <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                  <div className="container">
                      <Link className="navbar-brand" to={"/"}>BrainStorm</Link>
                      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                          <ul className="navbar-nav ml-auto">
                              <li className="nav-item">
                                  <Link className="nav-link" to={"/login"}>Login</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to={"/register"}>Register</Link>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>
              <div className="auth-wrapper">
                      <Switch>
                          <Route path="/" component={MainPage} exact />
                          <Route
                              path="/login"
                              render={() => <Login setupSocket={setupSocket} />}
                              exact
                          />
                          <Route path="/register" component={Register} exact />
                          <Route
                              path="/dashboard"
                              render={() => <DashBoard socket={socket} />}
                              exact
                          />
                          <Route
                              path="/chatroom/:id"
                              render={() => <ChatRoom socket={socket} />}
                              exact
                          />
                      </Switch>
              </div>
          </div>
      </Router>
  );
}

export default App;