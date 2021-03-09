import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";

export default function Login() {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);

    const login = () => {
        Axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
        }).then((res) => console.log(res));
    };
    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    };
    return (
        <Router>
            <div className="AuthPage">

                <div>
                    <p className="sign" align="center">Login</p>
                    <input
                        placeholder="username"
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                    <input
                        type = "password"
                        placeholder="password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </Router>
    );
}