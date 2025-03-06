import React,{useEffect, useState} from 'react'
import axios from 'axios';
import CalenderCard from './CalenderCard'
const Calender = () => {
      const [file, setFile] = useState(null);
      const [calenderData,setCalenderData]=useState([]);
      const [fectheddata,setfecthedData]=useState(false);
const handleFileChange = (e) => {
            setFile(e.target.files[0]);
            };
const handleUpload = async () => {
            const formData = new FormData();
            formData.append('file', file);
            try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/fileupload`, formData, {
            headers: {
                  'Content-Type': 'multipart/form-data'
                  }
            });
            console.log('File uploaded successfully');
            } catch (error) {
            console.error('Error uploading file:', error);
            }
            };   
const fetchData=async()=>{
 const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/calender`);
 const datas=await response.json();
 setCalenderData(datas)
}
useEffect(()=>{
      fetchData();
      setfecthedData(true)
},[])
return (
    <div className='calender'>
      <div className='uploadFile'>
            <div className='div1'>Upload File</div>
            <div className='div1'>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleUpload}>Upload</button>
            </div>
      </div>
      <div className='callenderheading'> School Calender</div>
      <div className='CalenderDisplay'>
{fectheddata && 
      calenderData.map((data,index)=>{
return <CalenderCard data={data} key={index}></CalenderCard>
      })
}
      </div>
    </div>
  )
}

export default Calender
