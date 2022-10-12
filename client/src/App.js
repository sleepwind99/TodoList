import React from "react";
import Home from "./pages/home";
import Welcome from "./pages/welcome"
import Login from "./pages/login";
import { Routes, Route } from 'react-router-dom';
import KakaoRedirectHandler from "./components/KakaoLogin";
import NaverLoginHandler from "./components/NaverLoginHandler";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/kakao" element={<KakaoRedirectHandler />}></Route>
        <Route path="/login/naver" element={<NaverLoginHandler />}></Route>        
      </Routes>
    </div>
  );
}

export default App;
