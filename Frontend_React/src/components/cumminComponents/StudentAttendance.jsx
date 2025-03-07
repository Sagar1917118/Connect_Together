import React, { useEffect, useState } from 'react'
import attendanceImage from "../../assets/attendance.jpg"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux'
const StudentAttendance = () => {
    const {grade,rollnumber}=useSelector((state)=>state.auth);
    // console.log(grade,rollnumber);
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
            // console.log(grade,formattedDate);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/other/getattendancebydate`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grade:grade, date: formattedDate }),
            })
            const result = await res.json();
            // console.log("this is the result",result);
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
            {/* {console.log(totalPresence)} */}
            <div className='diary1'>
                <h1 className='diaryHeading'>Attendance</h1>
                <img src={attendanceImage} className='diaryImage' alt="attendance"></img>
            </div>
            <div className='mt-2 w-11/12 flex flex-col md:flex-row gap-2 bg-indigo-100 rounded-md p-2 justify-between'>
                <div className='flex flex-1 flex-col p-2'>
                    <div className='text-lg text-indigo-600 font-bold'>Date: {formattedDate}</div>
                    <div className={`text-2xl font-bold ${(status=='Present')?"text-green-600":"text-red-600"}`}>{status}</div>
                </div>
                <div>
                <Calendar showWeekNumbers onChange={changeDate} value={date} />
                </div>
            </div>
        </div>
    )
}

export default StudentAttendance;
