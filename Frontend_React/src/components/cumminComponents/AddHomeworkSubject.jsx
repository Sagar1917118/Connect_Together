import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import homework from '../../assets/homework.jpg'
import toast from 'react-hot-toast'
import LoadingButton from './LoadingButton';
const AddHomeworkSubject = () => {
    const location = useLocation();
    const { id: subjectId } = useParams();
    const grade = location.state.grade;
    const [question, setQuestion] = useState('');
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const formattedDate = day + '-' + month + '-' + year;

        try {
            if(!question){
                toast.error("Empty Homework")
                return;
            }
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/other/createhomework`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subjectName:subjectId, grade, question, date: formattedDate }),
            });
            if (!response.ok) {
                throw new Error('Failed to create homework');
            }
            const newHomework = await response.json();
            // console.log('Homework created:', newHomework);
            toast.success("Homework addedd!!");
            setLoading(false);
            navigate("/mydiary");
        } catch (error) {
            setLoading(false);
            toast.error("Error in Adding HomeWork");
        }
        
    };

  return (
   <div className='addHomework'>
         <div className='headingImage'>
            <h1 className='createHomeworkHeading'>Create Homework</h1>
            <img src={homework} className='homeworkImage' alt='diary' />
        </div>
            <h2 className='createHomeworkGrade'>Grade: {grade}</h2>
            <form onSubmit={handleSubmit} className='questionForm'>
                <label htmlFor="question" className='labelforQuestion'>Question:</label>
                <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}

                />
                {loading ? (<LoadingButton/>) :(<button type="submit" className='submitButton'>Submit</button>)}
                
            </form>
            
        </div>
  )
}

export default AddHomeworkSubject
