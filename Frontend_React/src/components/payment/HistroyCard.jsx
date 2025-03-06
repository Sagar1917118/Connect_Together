import React from 'react'

const HistroyCard = (props) => {
      const {studentName,studentClass,feeType,feeAmount,collegeId}=props.data;
  return (
    <div className='HistroyCard'>
<div>
      <div>Student Name: {studentName} </div>
      <div>Student Class: {studentClass}</div>
</div>
<div>
      <div>CollegeId: {collegeId}</div>
      <div>Fee Type: {feeType}</div>
</div>
<div>
<div>Fee Amount: {feeAmount}</div>
</div>
    </div>
  )
}

export default HistroyCard
