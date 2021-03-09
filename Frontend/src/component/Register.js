import React, { useState } from "react";
import "../App.css";
import Axios from "axios";

export default function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const register = () => {
        Axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/register",
        }).then((res) => console.log(res));
    };

    return (
        <div className="AuthPage">
            <div>
                <p className="sign" align="center">Register</p>
                <input
                    placeholder="username"
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />

                <button onClick={register}>Submit</button>

            </div>

        </div>
    );
}