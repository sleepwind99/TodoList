import React from "react";
import { NAVER_CLIENT_ID } from "../LoginData";

const NaverLogin = () => {
  const { naver } = window;
  const initNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: "http://localhost:3000/login/naver", 
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: '47' }
    });
    naverLogin.init();
  }
  React.useEffect(() => {
    initNaverLogin();
  }, [])
  return (
    <>
      <div id='naverIdLogin' style={{display:"none"}}/>
      <img 
        onClick={() => {document.getElementById("naverIdLogin_loginButton").click()}}
        src={require("../icons/naver.png")} 
        style={{height:"30px", width:"auto", cursor:"pointer"}} 
        alt="..." />
    </>
  );
};

export default NaverLogin