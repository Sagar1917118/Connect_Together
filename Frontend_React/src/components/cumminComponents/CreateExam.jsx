import {useState,useEffect,useMemo} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux'
function CreateExam(){
    const {grade,rollnumber}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const processedItems = useMemo(() =>{ 
        getSubjectByClass()
        },
        []);
    async function getSubjectByClass(){
        try{
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/get-subject-by-grade`,{grade:grade});
        // console.log(response);
        const data=response?.data?.subjectDb;
        setAllSubjects(data);
        }
        catch(err){
            console.log(err);
        }
    }
    const [allsubjects,setAllSubjects]=useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [testName,setTestName]=useState("");
    const [maxMarks,setMaxMarks]=useState(0);
    async function createExam(opt,tName){
        console.log(opt);
        const subject=allsubjects.filter((ele)=>ele.subjectName==opt);
        console.log(subject);
        const subjectId=subject[0]?._id||"";
        console.log(tName); 
        console.log(maxMarks);
        try{
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/creating-exam`,
        {subjectId:subjectId,examName:testName,totalMarks:maxMarks,grade:grade});
        console.log(response);
            navigate("/exam-teacher");
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className='w-full'>
            <div className='w-11/12 min-h-screen flex flex-col justify-center items-center p-10 mt-[60px]'>
                <div className='flex flex-col gap-5 p-10 border-4 border-gray rounded-md'>
                    <p className='text-lg'>Fill Details to create test</p>
                    <select className='border-2 border-black rounded-md p-2' onChange={(e)=>{setSelectedOption(e.target.value)}}>
                        {/* Map over the array and generate options */}
                        {allsubjects.map((option, index) => (
                        <option key={index} value={option?.subjectName}>{option?.subjectName}</option>
                        ))}
                    </select>
                    <input className='border-2 border-black rounded-md p-2' type="text" placeholder="Enter Test Name" onChange={(e)=>{setTestName(e.target.value)}}></input>
                    <input className='border-2 border-black rounded-md p-2' type="number" placeholder="Enter Maximum marks" onChange={(e)=>{setMaxMarks(e.target.value)}}></input>
                    <button className='border-2 border-black rounded-md p-2' onClick={()=>createExam(selectedOption,testName)}>Create Test</button>
                 </div>
            </div>
        </div>
    )
};
export default CreateExam;