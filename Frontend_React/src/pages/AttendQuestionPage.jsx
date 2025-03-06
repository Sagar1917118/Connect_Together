import React, { useEffect, useState } from 'react'
import {gettingDoubtImage} from "../services/operations/showingImageFromDoubt";
import { useNavigate, useParams } from 'react-router';

const AttendQuestionPage = () => {
    const [doubtDetails,setDoubtDetails]=useState(null);
    const params=useParams();
    const navigate=useNavigate();
    console.log("Params: ",params)

    useEffect(()=>{
        gettingDoubtImage(params,setDoubtDetails);
    },[])

    console.log(doubtDetails);
    console.log("")
  return(
     <div className='customBoxShadow doubtSection'>
        {
            !doubtDetails?(<div className='spinner'></div>):( <div>
                <div className='doubtImage'><img src={doubtDetails?.file}></img></div>
                <div className='attendQuestionButtonDiv'>
                    <button className='takeDoubtButton' onClick={()=>{navigate(`/live-stream/${params.id}`)}}>Take Question</button>
                    <button onClick={()=>{navigate("/")}} className='cancelDoubtPage'>Cancel</button>
                </div>
            </div>)
        }
     </div>    
  )
}

export default AttendQuestionPage
