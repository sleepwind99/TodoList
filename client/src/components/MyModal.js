import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Visible = ({handleClose, callCancle}) => {
  return (
    <Button variant="primary" onClick={() => {handleClose(false); callCancle()}}>
      확인
    </Button>
  )
}

const MyModal = ({title, body, Show, handleClose, saveChange=false, callCancle}) => {
  return (
    <Modal show={Show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          닫기
        </Button>
        {saveChange && <Visible handleClose={handleClose} callCancle={callCancle}/>}
      </Modal.Footer>
    </Modal>
  )
}

export default MyModal;

