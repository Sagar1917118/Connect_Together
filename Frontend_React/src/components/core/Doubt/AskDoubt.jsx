import {useState,useContext,useMemo, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'react-hot-toast';
import AppContextProvider, { AppContext } from '../../../Context/AppContextProvider';
import { useNavigate } from 'react-router';
function AskDoubt(){
  const navigate=useNavigate();
  const {socket}=useContext(AppContext);
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
   const [imageFile, setImageFile] = useState(null);
   const [description,setDescription]=useState("");
  const [previewSource, setPreviewSource] = useState(null);
  const [navigateId,setNavigateId]=useState("");

  const {notification,setNotification}=useContext(AppContext);
  const userId=user._id;

  function navigation(){
    // navigate("/");
    // alert("got doubt");
  }

  

  const [alert,setAlert]=useState(false);
  useEffect(()=>{
   console.log(notification);
  },[notification]);
  useMemo(()=>{socket.emit("join-room",user._id);
console.log("room joined",user._id)},[]);
useEffect(()=>{
socket.on("askdoubt",(msg)=>{
  console.log("ask doubt",msg);
  setNotification((prev)=>[...prev,msg]);
  toast.success("All")
});

socket.on("hello",(msg)=>{
  console.log("instructorreached",msg.url);
  setNavigateId(msg.url);
  
});
// socket.on("solvingDoubt",(msg)=>{
//   console.log("solvingDoubt",msg);
// });




},[])

useEffect(()=>{
   if(navigateId){
    navigate(`/live-stream/${navigateId}`)
   }
},[navigateId])



  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setImageFile(file)
      previewFile(file)
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  async function submitDoubt(e){
    e.preventDefault();
    const formData=new FormData();
    formData.append("file",imageFile);
    formData.append("description",description);
    console.log(process.env.REACT_APP_BASE_URL);
    const toastId=toast.loading("Loading...");
    try{  
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/doubt/create-doubt`,formData,
           { 
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':`Bearer ${token}`,
              }
            }
            );
        console.log(response);
        toast.success("Doubt Created Successfully");
    }catch(err){
        console.log(err);
    }
    toast.dismiss(toastId);
  }

    return(
        <div className=" mx-auto  customBoxShadow min-h-screen  flex justify-center items-center">
            <div className='flex flex-col gap-5 subCustomBoxShadow'> 
                <p>Ask Your Doubt</p>
                <form onSubmit={submitDoubt} className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold'>Get Image of your Doubt</label>
                        <input type="file" onChange={handleFileChange}></input>
                    </div>
                    {
                      previewFile?(<img src={previewSource} className='doubtImage'></img>):(<div>Doubt Image</div>)
                    }
                    
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <input className="w-[200px] form-style" type="text" placeholder='Type Description' onChange={(e)=>{setDescription(e.target.value)}}></input>
                    </div>
                    <button type="submit" className='commonButton'>Submit</button>
                </form>
            </div>
        </div>
    )
};
export default AskDoubt;