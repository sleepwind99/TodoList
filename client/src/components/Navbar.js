import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useNavigate} from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { NAVER_CLIENT_ID, CLIENT_SECRET } from '../LoginData';

const MySwal = withReactContent(Swal);

const NavBar = () => {
  const logoutAlert = () => {
    MySwal.fire({
      title: '성공적으로 로그아웃되었습니다.',
      icon: 'success',
      confirmButtonText: '확인'
    }).then((result) => {
      if(result.isConfirmed) navigate("/welcome");
    })
  }

  const NaverLogout = () => {
    axios.get('https://nid.naver.com/oauth2.0/token', {
        params: {
            grant_type: 'delete',
            client_id: NAVER_CLIENT_ID,
            client_secret: CLIENT_SECRET,
            access_token: localStorage.getItem("naver_token"),
            service_provider: 'NAVER'
        }
    }).then(() => {
      localStorage.removeItem("naver_token");
    }).catch(e => console.log(e));
  }

  const navigate = useNavigate();
  const logout = () => {
    axios.post('/api/logout')
      .then(() => {
        if(localStorage.getItem('loginType') === 1) window.Kakao.Auth.logout();
        else if(localStorage.getItem('loginType') === 2) googleLogout();
        else if(localStorage.getItem('loginType') === 3) NaverLogout();
        logoutAlert();
        localStorage.removeItem('list_state');
        localStorage.removeItem('user_email');
        localStorage.removeItem('loginType');
      });
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Todo</Navbar.Brand>
        <Nav className="me-auto"></Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Button className='ms-2' variant="outline-danger" onClick={logout}>로그아웃</Button>
      </Container>
    </Navbar>
  )
}

export default NavBar;