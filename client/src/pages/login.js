import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import GoogleLoginHandler from '../components/GoogleLogin';
import NaverLogin from '../components/NaverLogin';
import { REST_API_KEY, REDIRECT_URI } from '../LoginData';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { localDataRead } from '../localDataExpire';
import {useNavigate} from "react-router-dom";

const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate();
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
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
        <Row style={{height:"250px"}}></Row>
        <Row className='justify-content-center'>
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>
                <h3>로그인</h3> 
                <span className='py-2' style={{color: "rgba(0, 0, 0, 0.6)", fontSize: "13px"}}>아이디</span>
                <InputGroup className="mb-3 mt-2">
                  <Form.Control type='text'/>
                </InputGroup>
                <span className='py-2' style={{color: "rgba(0, 0, 0, 0.6)", fontSize: "13px"}}>비밀번호</span>
                <InputGroup className="mb-3 mt-2">
                  <Form.Control type='password' />
                </InputGroup>
                <Container>
                  <Row className='justify-content-center'>
                    <Col className="text-center">
                      <a href={KAKAO_AUTH_URL}>
                        <img 
                          src={require("../icons/kakao.png")} 
                          style={{height:"30px", width:"auto"}} 
                          alt="..." />
                      </a>
                    </Col>
                    <Col className="text-center">
                      <GoogleLoginHandler />
                    </Col>
                    <Col className="text-center">
                      <NaverLogin />
                    </Col>
                  </Row>
                </Container>
              </Card.Title>
              <Container>
                <Row className='border-top pt-3'>
                  <Col className="d-grid mb-2">
                    <Button variant="outline-primary">로그인</Button>  
                  </Col>
                  <Col className="d-grid mb-2">
                    <Button variant="outline-secondary">회원가입</Button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </main>
  )
}

export default Login;