import React, { useState } from 'react'
import { useSelector } from 'react-redux'
function QuizResult(props) {
  const {user}=useSelector((state)=>state.profile);
  const [studentId,setStudentId]=useState(user._id);
  // const [studentId,setStudentId]=useState('660d5918dab3272346fdbec8');


  // setStudent id:

  // setStudentId()
const saveQuizResult=async()=>{
  
  console.log("called");
  console.log(studentId);
  const data={Studentid:studentId,
    score:props.score,
    totalScore:props.totalScore}
    console.log(data);
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/quizresult`,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  });
  props.tryAgain();
}

  return (
    <>
    <div className='show-score'>
        Your Score:{props.score}<br/>
        Total Score:{props.totalScore}
    </div>
    <button id="next-button" onClick={saveQuizResult }>Try Again</button>
    </>
  )
}

export default QuizResult