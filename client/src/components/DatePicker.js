import React, {useState} from 'react'
import { Form } from 'react-bootstrap';
const DatePicker= () => {
  const [date, setDate] = useState();
  const dateChange = e => setDate(e.target.value);
  return(
    <div>
      <div className="row">
        <div className="col-12">
          <Form.Group controlId="dob">
            <Form.Control type="date" onChange={dateChange} value={date} name="dob" placeholder="Date of Birth" />
          </Form.Group>
        </div>
      </div>
    </div>
  )
}
export default DatePicker;