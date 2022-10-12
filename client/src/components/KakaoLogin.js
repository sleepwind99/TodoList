import React from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI } from "../LoginData";
import { localDataWrite } from "../localDataExpire";

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  React.useEffect(()=> {
    let params = new URL(window.location.href).searchParams.get("code");
    let grant_type = "authorization_code";
    
    const getProfile = async () => {
      try {
        let data = await window.Kakao.API.request({url: "/v2/user/me"});
        localDataWrite("user_email", data.kakao_account.email);
        localDataWrite("loginType", 1);
        axios.post("/api/login", {
          param:[
            {email: data.kakao_account.email, nickname: data.kakao_account.profile.nickname},
            {nickname: data.kakao_account.profile.nickname}
          ]
        }).then(() => {navigate("/")});
      } catch (err) {
        console.log(err);
      }
    };

    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${params}`
      , {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      window.Kakao.init(REST_API_KEY);
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      getProfile();
    })

    }, [navigate])
  return null;
};

export default KakaoRedirectHandler;