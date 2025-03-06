import {useState,useEffect,useMemo} from 'react';
import AttendanceChart from "./AttendanceChart";
import axios from 'axios';
import { useSelector } from 'react-redux'
function Attendance(){
    const {grade,rollnumber}=useSelector((state)=>state.auth);
    console.log(grade,rollnumber);
    const processedItems = useMemo(() =>{ 
    fetchAllStudents();
    getAllAttendanceByClass(); 
    },
    []);
    const [classData,setclassData]=useState([]);
    async function fetchAllStudents(){
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/getAllClassStudents`,{grade:grade});
        const arr=response?.data?.classDb?.rollnumber
        setclassData(arr);
    }
    const [pStudent,setPStudent]=useState([]);
    const [presentButtons,setPresentButtons]=useState([]);
    function handelClick(rollnumber,idx){
        if(!presentButtons.includes(idx)){
            setPStudent([...pStudent,rollnumber]);
            setPresentButtons([...presentButtons,idx]);
            console.log(pStudent);
        }
        else{
            const remArray=pStudent.filter((ele)=>ele!=rollnumber);
            setPStudent(remArray);
            const remButtons=presentButtons.filter((ele)=>ele!=idx);
            setPresentButtons(remButtons);
            console.log(pStudent);
        }
    }
    async function MarkAttendance(){
        try{
            const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/mark-attendance`,{grade:grade,pStudent:pStudent});
            console.log(response);
            getAllAttendanceByClass();
        }catch(err){
            console.log(err);
        }
    }
    const [chartData,setChartData]=useState([]);
    async function getAllAttendanceByClass(){
        try{
            const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/get-all-attendance-by-class`,{grade:grade});
            // console.log(response);
            const data=response?.data?.dbResponse;
            setChartData(data);
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className="mt-[60px] flex">
            <div className="w-1/2 min-h-screen flex flex-col p-10 border-2 border-gray gap-3">
                { !classData?(<div></div>):(classData.map((element,idx)=>{
                        return(
                            <div key={idx} className='flex justify-evenly text-xl border-2 border-gray rounded-md py-2'>
                              <p className='font-bold'>{element}</p>
                              <button className={`${presentButtons.includes(idx)?"border-green-500 bg-green-300":"border-red-500"} border-2 rounded-md px-2 py-1`} onClick={()=>{handelClick(element,idx)}}>Present</button>  
                            </div>
                        )
                    })) 
                    
                }
            </div>
            <div className='w-1/2 flex flex-col items-center gap-5'>
                <div className='w-[60%] flex justify-between text-xl mt-10'>
                    <div className='flex flex-col border-2 border-gray rounded-md p-2 items-center'><>Total Students</><span className='text-4xl'>{classData?.length}</span></div>
                    <div className='flex flex-col border-2 border-gray rounded-md p-2 items-center'><>Present Students</><span className='text-4xl'>{pStudent?.length}</span></div>
                </div>
                <button className='border-2 border-gray rounded-md p-3 text-xl' onClick={MarkAttendance}>Mark attendance for today</button>
                <AttendanceChart chartData={chartData}></AttendanceChart>
            </div>
        </div>
    )
};
export default Attendance;