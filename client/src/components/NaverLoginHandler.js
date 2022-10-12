import React from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { localDataWrite } from "../localDataExpire";

const NaverLoginHandler = () => {
  const navigate = useNavigate();

  React.useEffect(()=> {
    let params = new URL(window.location.href).hash;
    const code = params.split('=')[1].split('&')[0];
    axios.post(`/api/naverlogin/${code}`)
      .then((res) => {
        localDataWrite("user_email", res.email);
        localDataWrite("loginType", 3);
        navigate("/")
      })
      .catch(e => console.log(e));

    }, [navigate])
  return null;
};

export default NaverLoginHandler