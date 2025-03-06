import React, { useEffect } from 'react'
import diary from '../assets/diary.jpg'
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux'
import HomeWorkReview from "../components/cumminComponents/HomeWorkReview";
import axios from 'axios';
const MyDiary = () => {
 const {grade,rollnumber}=useSelector((state)=>state.auth);
  const [date, setDate] = useState(new Date());
  const [homeworkDet, setHomeworkDet] = useState(null);

  const onChange = date => {
      setDate(date);
  };

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(); // Use getDate() to get the day of the month

  const dateMatch = day + "-" + month + "-" + year;

  const fetchHomework = async ( grade,date) => {
      try {
          const response = await fetch('http://localhost:4000/api/v1/other/homework', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ grade:grade, date:date }),
          });
          if (!response.ok) {
              throw new Error('Failed to fetch homework');
          }
          console.log(response);
          const result = await response.json();
          console.log("Result",result);
          setHomeworkDet(result);


      } catch (error) {
          console.error('Error fetching homework:', error);
      }
  };

  useEffect(() => {
    fetchHomework(grade, dateMatch);
    getHomeWorkReview();
}, [date]);


  console.log(homeworkDet);

  console.log(dateMatch);
  async function getHomeWorkReview(){
    try{
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/get-homework-review`,{rollnumber:rollnumber,date:dateMatch});
        console.log(response);
        setHomeworkReview(response?.data?.dbResponse?.review);
    }
    catch(err){
        console.log(err);
    }
  }
  const [homeworkReview,setHomeworkReview]=useState("");
  return (
      <div className='myDiary'>
          <div className='diary1'>
              <h1 className='diaryHeading'>My Diary</h1>
              <img src={diary} className='diaryImage' alt='diary' />
          </div>
          <div className='diaryMain'>
              <div >
                  {
                    !homeworkDet?(<div>Loading...</div>):(<div>
                      {homeworkDet.map((homework, index) => (
                        <div key={index} className='homeworkDet'>
                          <h3 className='homeworkSub'>{homework.subjectName.subjectName}</h3>
                          <p className='homeworkQues'>{homework.question}</p>
                        </div>
                      ))}
                    </div>)
                  }
              </div>
              <div>
                  <Calendar showWeekNumbers onChange={onChange} value={date} />
              </div>
          </div>
          { homeworkReview && <div className='w-11/12 mx-auto'>
            <p className='text-gray font-bold'>Review about  Homework</p>
            <p className='text-lg'>{homeworkReview}</p>
         </div>
         }
      </div>
  )
}

export default MyDiary
