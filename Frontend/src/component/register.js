import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import {Link, useHistory} from "react-router-dom";
import makeToast from "../Toaster";

export default function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [error,setError] = useState("");
    const history = useHistory();

    const register = () => {
        Axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/auth/register",
        }).then((res) => {
            if(res.data === "User Already Exists"){
                setError("이미 가입되어있는 회원입니다.");
            }
            else{
                makeToast("success", res.data);
                history.push({
                    pathname:'/'
                });
            }
        });
    };

    return (
        <div className="auth-inner">
            <h3>Register</h3>

            <div className="form-group">
                <label>ID</label>
                <input
                    placeholder="username"
                    className="form-control"
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    placeholder="password"
                    className="form-control"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block"
            onClick={register}>Register</button>
            <p className="error">{error}</p>
            <p className="text-right register">
                    계정이 이미 있으신가요?{" "}
                    <Link to={"/login"}>돌아가기</Link>
            </p>
        </div>
    );
}