import { useContext, useRef } from "react";
import "./login.css";
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router";

export default function Login() {

    const loginEmail = useRef();
    const loginPassword = useRef();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();
    const {isFetching, dispatch} = useContext(AuthContext);


    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: loginEmail.current.value, password: loginPassword.current.value}, dispatch);
    };

    const handleClicked = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't Match");
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post("/auth/register",user);
                alert("User created");
                window.location.reload();
            }catch(err){
                console.log(err);
            }
        }
    };



  return (
    <div className="body">
    <div className="top">
        <div className="topLeft">
            <h1 className="logo"><span>Mum</span>ble</h1>
        </div>
        <div className="topRight">
            <div className="topRightDetails">
                <span>Email</span>
                <span className="detailsPassword">Password</span>
            </div>
            <form className="topRightInput" onSubmit={handleClick}>
                <input type="email" className="email" ref={loginEmail} required></input>
                <input type="password" className="password" ref={loginPassword} minLength="4" required></input>
                <button type="submit" className="loginBtn" disabled={isFetching}>{isFetching ? <CircularProgress /> : "Log In"}</button>
            </form>
            <span className="forgot">Forgot password?</span>
        </div>
    </div>
    <div className="bottom">
        <div className="bottomLeft">
            <img src="../../assets/connect.png" alt=""></img>
        </div>
        <div className="bottomRight">
            <h1>Create an account</h1>
            <span>Connect with your friends and bring out your best snaps.</span>
            <form action="" onSubmit={handleClicked}>
            <div className="inputInfo">
                <input type="text" placeholder="Username" required className="username" ref={username}></input>
                <input type="email" placeholder="Email" required className="email" ref={email}></input>
                <input type="password" minLength="4" placeholder="New Password" required className="password" ref={password}></input>
                <input type="password" placeholder="Retype your password" required className="repassword" ref={passwordAgain}></input>
            </div>
            <div className="btn"><button type="submit">{isFetching ? <CircularProgress /> : "Create Account"}</button></div>
            </form>
        </div>
    </div>
</div>
  );
}