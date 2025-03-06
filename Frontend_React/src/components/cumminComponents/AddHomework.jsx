import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HomeWorkReview from './HomeWorkReview';
const AddHomework = () => {
    const location = useLocation();
    const { id: subjectId } = useParams();
    const grade = location.state.grade;
    const [question, setQuestion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Use the `subjectId`, `grade`, and `question` to create the homework
        console.log(subjectId, grade, question);
        // You can send this data to your backend API for further processing
    };
    console.log("Hello")

  return (
   <div className='addHomework'>
            <h1>Create Homework</h1>
            <h2>Subject ID: {subjectId}</h2>
            <h2>Grade: {grade}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question:</label>
                <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            
        </div>
  )
}

export default AddHomework
