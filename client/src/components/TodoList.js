import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import BasicDateTimePicker from './DateTimePicker';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { localDataRead, localDataWrite } from '../localDataExpire';

const MySwal = withReactContent(Swal);

const TodoList = ({title, datetime, alert=false, beforealert=0, deletetodo, id}) =>{
  const [origin, setOrigin] = useState({
    mainTitle: title,
    onOff: alert,
    dateTime: datetime,
    beforeAlert: beforealert
  });
  const [onOff, oaoChange] = useState(alert);
  const [dateTime, setDateTime] = useState(new Date());
  const [beforeAlert, setBeforeAlert] = useState(beforealert);
  const [mainTitle, setMainTitle] = useState(title);
  const [alertTime, setAlertTime] = useState(0);
  const changeDate = date => setDateTime(date);
  useEffect(() => {
    if(datetime != null) setDateTime(new Date(datetime*1000));
  },[datetime]);

  const cancel = () => {
    MySwal.fire({
      title: "수정사항은 저장되지 않습니다. 계속하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then(result => {
      if(result.isConfirmed){
        oaoChange(origin.onOff);
        setDateTime(origin.dateTime);
        setBeforeAlert(origin.beforeAlert);
        setMainTitle(origin.mainTitle);
      }
      MySwal.fire({
        title: "처리되었습니다.",
        confirmButtonText: '확인'
      });
    });
  }

  const changeState = () =>{
    let listState = localDataRead('list_state');
    if(listState[id] === '0') listState[id] = '1';
    else listState[id] = '0';
    localDataWrite('list_state', listState);
  }

  const apply = async () => {
    setOrigin({
      mainTitle: mainTitle,
      onOff: onOff,
      dateTime: dateTime.getTime()/1000,
      beforeAlert: beforeAlert
    });
    setAlertTime(dateTime.getTime()-(beforeAlert*60*1000));
    try{
      await axios.post('/apirole/update', {param:[mainTitle, dateTime.getTime()/1000, onOff, beforeAlert, id]});
    }catch(err){console.log(err)}
    if(onOff){
      MySwal.fire({
        title: "적용되었습니다.",
        text: `${(new Date(alertTime)).toString()}에 알림이 울립니다.`,
        icon: "success",
        confirmButtonText: '확인'
      });
    }else{
      MySwal.fire({
        title: "적용되었습니다.",
        icon: "success",
        confirmButtonText: '확인'
      });
    }
  }
  return(
    <main>
      <Accordion alwaysOpen defaultActiveKey={[localDataRead('list_state')[id]]} >
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => {changeState();}}>{origin.mainTitle}</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                <p className='py-2 mb-1' style={{color: "rgba(0, 0, 0, 0.6)", fontSize: "13px"}}> 제목</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    type='text'
                    value={mainTitle}
                    onChange={e => setMainTitle(e.target.value)}
                  />
                </InputGroup>
              </Row>
              <Row>
                <Col lg={9} md={9} sm={9} xs={9} className="pt-3">
                  <BasicDateTimePicker dateTimeValue={dateTime} setValue={changeDate} disable={!onOff}/>
                </Col>
                <Col lg={3} md={3} sm={3} xs={3}>
                  <p className='py-2 mb-1' style={{color: "rgba(0, 0, 0, 0.6)", fontSize: "13px"}}>알림여부</p>
                  <Form>
                    <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label={onOff ? "On" : "Off"}
                      checked={onOff}
                      onChange={e => oaoChange(e.target.checked)}
                    />
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col xl={8} lg={7} md={7} sm={12} className="mt-4">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="알림 시간"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      type='number'
                      value={beforeAlert}
                      onChange={e => setBeforeAlert(e.target.value)}
                      disabled={!onOff}
                    />
                    <InputGroup.Text id="basic-addon2">분 전에 알림</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col xl={4} lg={5} md={5} sm={12} className="text-center mt-4">
                  <Button variant="primary" onClick={apply}>적용</Button>{' '}
                  <Button variant="secondary" onClick={cancel}>취소</Button>{' '}
                  <Button variant="danger" onClick={() => deletetodo(id)}>삭제</Button>{' '}
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </main>
  )
}

export default TodoList;