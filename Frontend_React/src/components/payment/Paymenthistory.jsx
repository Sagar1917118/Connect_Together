import React, { useEffect, useState } from 'react'
import HistroyCard from './HistroyCard'
import { useSelector } from 'react-redux';
const Paymenthistory = () => {
const {user}=useSelector((state)=>state.profile);
const [studentId,setStudentId]=useState(user._id)
const [datas,setData]=useState([])
const [fetchedData,setFetchedData]=useState(false)



const fetchData=async ()=>{
      console.log("funtion called")
      const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/paymentdetails/${studentId}`);
      const data=await response.json();
      console.log(data);
      setData(data);
      setFetchedData(true);
}

useEffect(()=>{
      fetchData();
},[])


  return (
    <div className='Paymenthistory'>
      <div className='paymentHeading'>Payment History</div>
      <div className='paymentcard'>
      {
            datas.map((data,index)=>{
                  return <HistroyCard data={data} key={index}></HistroyCard>
            })
      }
      </div>
    </div>
  )
}

export default Paymenthistory
