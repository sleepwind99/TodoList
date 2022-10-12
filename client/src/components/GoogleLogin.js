import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { localDataWrite } from '../localDataExpire';

const GoogleLoginHandler = () => {
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    let userinfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${res.access_token}`)
      .catch(e => console.log(e));
    localDataWrite("user_email", userinfo.data.email);
    localDataWrite("loginType", 2);
    axios.post("/api/login", {
      param:[
        {email: userinfo.data.email, nickname: userinfo.data.name},
        {nickname: userinfo.data.name}
      ]
    }).then(() => {navigate("/")})
    .catch(e => console.log(e));
  }

  const onFailure = (res) => {
    alert("구글 로그인에 실패하였습니다");
    console.log("err", res);
    navigate("/");
  };

  const login = useGoogleLogin({
    onSuccess: res => onSuccess(res),
    onError: res => onFailure(res)
  });

  return (
    <img 
      onClick={login} 
      src={require("../icons/google.png")} 
      style={{height:"30px", width:"auto", cursor:"pointer"}} 
      alt="..." />
  )
}

export default GoogleLoginHandler;