import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { localDataRead } from '../localDataExpire';

const MySwal = withReactContent(Swal);

const Welcome = () => {
  const navigate = useNavigate();
  const loginpage = () => {navigate("/login")}
  React.useEffect(() =>{
    if(localDataRead('user_email') != null){
      MySwal.fire({
        title: "잘못된 접근!",
        text: "로그인하신 상태에서는 이용하실 수 없습니다.",
        icon: "warning",
        confirmButtonText: "확인"
      }).then(() => {navigate("/")});
    }
  }, [navigate]);
  return (
    <main>
      <Container>
        <div style={{height:"300px"}}></div>
        <h1 className="text-center">Welcome</h1>
        <h1 className="text-center">My Todo List</h1>
        <Row className='mt-4'>
          <Col xl={4} lg={4} md={4} sm={3}></Col>
          <Col xl={2} lg={2} md={2} sm={3} xs={12} className="d-grid mb-2">
            <Button variant="outline-primary" onClick={loginpage}>로그인</Button>  
          </Col>
          <Col xl={2} lg={2} md={2} sm={3} xs={12} className="d-grid mb-2">
            <Button variant="outline-secondary">회원가입</Button>
          </Col>
          <Col xl={4} lg={4} md={4} sm={3}></Col>
        </Row>
      </Container>
    </main>
  )
}

export default Welcome;