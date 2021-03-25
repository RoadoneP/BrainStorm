import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import makeToast from "../Toaster";
import { withRouter } from "react-router-dom";

const Login = (props) => {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");

    const LoginUser = () => {
        if(loginUsername!=="" && loginPassword!=="") {
            Axios({
                method: "POST",
                data: {
                    username: loginUsername,
                    password: loginPassword,
                },
                withCredentials: true, //쿠키 전달
                url: "http://localhost:4000/auth/login",
            }).then((res) => {
                if(res.data === "No User Exists"){
                    console.log(res);
                    setError("다시 로그인 해주세요!");
                }
                else{
                    makeToast("success", res.data.message);
                    localStorage.setItem("CC_Token",res.data.token);
                    console.log(res.data);
                    props.history.push('/dashboard');
                    props.setupSocket();
                }
            });
        }
        else{
            setError("아이디 혹은 비밀번호를 입력하여 주세요.");
        }
    };

    return (
        <div className="auth-inner">
            <h3>Login</h3>

            <div className="form-group">
                <label>ID</label>
                <input
                    placeholder="ID"
                    className="form-control"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type = "password"
                    className="form-control"
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button className="btn btn-primary btn-block"
                    onClick={LoginUser}>Login</button>
            <p className="error">{error}</p>
            <p className="text-right register">
                계정이 없으신가요?{" "}
                <Link to={"/register"}>가입하기</Link>
            </p>
        </div>
    );
}

export default withRouter(Login);