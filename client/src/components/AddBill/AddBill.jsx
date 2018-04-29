import React from 'react';
import BillSubmitButton from '../BillSubmitButton'
import "./AddBill.css"

const AddBill = props => (

  <div className='container'>
    <div className="row">
     <div className="col-md-2">
         <input
          className="form-control text-center"
          type="text"
          name="billName"
          onChange={props.handleChange}
          value={props.value.billName}
          placeholder="Bill Name"
        />
      </div>


      <div className="col-md-3">
        <input
          className="form-control text-center"
          type="number"
          name="billPlannedAmount"
          onChange={props.handleChange}
          value={props.value.billPlannedAmount}
          placeholder=" Bill Planned Amount $25, $100, $1000"
        />
      </div>

      <div className="col-md-1 text-center">
      <h6 className=''>Static Bill</h6>
      <input type="checkbox"
      // name="billStatic"
      checked={props.isChecked}
      // onChange={props.handleChange}
      // value={props.value.billStatic}     
     
      />
      </div>





      <BillSubmitButton onClick={props.onClick} />
    </div>
  </div>
);

export default AddBill;
