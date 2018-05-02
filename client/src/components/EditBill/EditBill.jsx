import React from 'react';
import EditBillSubmitButton from '../EditBillSubmitButton'
import CancelButton from '../CancelButton'
import "./EditBill.css"

const EditBill = props => {

  let billClick = props.value.editBillID;
  let billInfo = props.bills.find(index => index._id  === billClick )
  console.log("haahhahahahahahah" + billClick);
  
  console.log("gggggggggggggg", billInfo);
  
  
  return (
    <div className='container marginTopAndBottom'>
      <div className='row '>
        <div className='offset-4 col-md-1 text-center'>
          <h3>Edit Bill</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <input
            className="form-control text-center"
            type="text"
            name="editBillName"
            onChange={props.handleChange}
            editvalue={props.value.editBillName}
            // value={billInfo.billName}
            placeholder="Bill Name"
          />
        </div>


        <div className="col-md-3">
          <input
            className="form-control text-center"
            type="number"
            name="editBillPlannedAmount"
            onChange={props.handleChange}
            editvalue={parseFloat(props.value.editBillPlannedAmount).toFixed(2)}
            // value={parseFloat(billInfo.billPlannedAmount).toFixed(2)}
            placeholder=" Bill Planned Amount $25, $100, $1000"
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control text-center"
            type="number"
            name="editBillActualAmount"
            onChange={props.handleChange}
            editvalue={parseFloat(props.value.editBillActualAmount).toFixed(2)}
            // value={parseFloat(billInfo.billActualAmount).toFixed(2)}
            placeholder=" Bill Actual Amount $25, $100, $1000"
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


        <EditBillSubmitButton onClick={props.handleClick} />
        <CancelButton onClick={props.onClick} />
      </div>
    </div>
  )
}

export default EditBill;


