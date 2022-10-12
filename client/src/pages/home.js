import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import TodoList from '../components/TodoList';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { localDataRead, localDataWrite } from '../localDataExpire';

const MySwal = withReactContent(Swal);

const Home = () => {
  const [todoTxt, setTodo] = useState("");
  const [todoList, setList] = useState([]);
  const [updateHook, setUpdateHook] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if(localDataRead('user_email') == null)navigate("/welcome");
    else{
      axios.post("/apirole/todo", {param:[localDataRead('user_email')]})
        .then(res => {
          let stateLength = 0;
          if(localDataRead('list_state') != null)
            stateLength = Object.keys(localDataRead('list_state')).length;
          if(stateLength !== res.data.length){
            let listState = {};
            res.data.forEach(e => {listState[e.id] = '1'});
            localDataWrite('list_state', listState);
          }
          setList(res.data);
        })
        .catch(e => {console.log(e)});
    }
  }, [updateHook, navigate]);

  const changeTxt = e => setTodo(e.target.value);
  const addTodo = () => {
    if(todoTxt.length < 2){
      MySwal.fire({
        title: "최소 2글자 이상 입력해주세요!",
        icon: "warning",
        confirmButtonText: '확인'
      });
      return;
    }
    axios.post('/apirole/add', {param:[todoTxt, localDataRead('user_email')]})
      .then(() => setUpdateHook(prev => !prev))
      .catch(e => {console.log(e)});
    setTodo("");
  }
  const onKeyPress = e => {if(e.key === 'Enter') addTodo();}

  const deleteTodo = id => {
    MySwal.fire({
      title: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if(result.isConfirmed) {
        try{
          await axios.post('/apirole/delete', {param:[id]});
        }catch(err){
          console.log(err);
        }
        MySwal.fire({
          title: '성공적으로 삭제되었습니다.',
          icon: 'success',
          confirmButtonText: '확인'
        }).then(() => {setUpdateHook(prev => !prev)});
      }
    })
  }
  const TodoHtml = ({todoData}) => {
    return (
      <Row className="justify-content-center mt-4">
        <Col lg={8} md={10} xs={12}>
          {<TodoList 
            title={todoData.title} 
            alert={todoData.alert} 
            beforealert={todoData.alertbefore} 
            datetime={todoData.datetime} 
            deletetodo={deleteTodo} 
            id={todoData.id}/>}
        </Col>
      </Row>
    );
  }
  return (
    <main>
      <NavBar />
      <Container>
        <Row className="justify-content-center mt-4">
          <Col lg={8} md={10} xs={12}><Link to="/" style={{textDecoration: "none", color: "black"}}><h1 className="text-center">My Todo List</h1></Link></Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col lg={8} md={10} xs={12}>
            <InputGroup size="lg">
              <Form.Control
                placeholder="What's to do...?"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                value={todoTxt}
                onChange={changeTxt}
                onKeyPress={onKeyPress}
              />
              <InputGroup.Text id="inputGroup-sizing-lg" onClick={addTodo} style={{cursor: "pointer"}}><span className="material-icons">add</span></InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        {todoList.map(todo => <TodoHtml todoData={todo} key={todo.id}/>)}
      </Container>
    </main>
  );
}

export default Home;