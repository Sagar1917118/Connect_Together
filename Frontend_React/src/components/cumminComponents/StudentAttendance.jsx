import React, { useEffect, useState } from 'react'
import attendanceImage from "../../assets/attendance.jpg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux'
const StudentAttendance = () => {
    const {grade,rollnumber}=useSelector((state)=>state.auth);
    console.log(grade,rollnumber);
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState("Absent");
    const [totalPresence, setTotalPresence] = useState([]);

    const changeDate = date => {
        setDate(date);
    };

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate(); // Use getDate() to get the day of the month
  
    const formattedDate = day + "-" + month + "-" + year;

    const getAttendance = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/other/getattendancebydate`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grade:grade, date: formattedDate }),
            })
            const result = await res.json();
            console.log("this is the result",result)
            setTotalPresence(result.data[0]?.presence || []);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAttendance();
    }, [date]);

    useEffect(() => {
        setPresent();
    }, [totalPresence]);

    function setPresent() {
        // console.log(totalPresence);
        setStatus(totalPresence && totalPresence.includes(parseInt(rollnumber,10)) ? "Present" : "Absence");
    }

    return (
        <div className='myDiary'>
            {console.log(totalPresence)}
            <div className='diary1'>
                <h1 className='diaryHeading'>Attendance</h1>
                <img src={attendanceImage} className='diaryImage' alt="attendance"></img>
            </div>
            <div className='diaryMain'>
                <div className='homeworkDet'>
                    <div className='homeworkSub'>Date: {formattedDate}</div>
                    <div className='homeworkQues'>{status}</div>
                </div>
                <div>
                    <Calendar showWeekNumbers onChange={changeDate} value={date} />
                </div>
            </div>
        </div>
    )
}

export default StudentAttendance;
