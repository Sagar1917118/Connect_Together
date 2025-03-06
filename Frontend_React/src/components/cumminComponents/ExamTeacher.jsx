import {useState,useEffect,useMemo} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
function ExamTeacher(){
    const {grade,rollnumber}=useSelector((state)=>state.auth);
    const [allData,setAllData]=useState([]);
    const [subjectIds,setSubjectIds]=useState([]);
    const [examNames,setExamNames]=useState([]);
    const processedItems = useMemo(() =>{ 
        GetAllExamByClassName()
        },
        []);
    async  function GetAllExamByClassName(){
        try{
            const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/get-exam-by-grade`,{grade:grade});
            const data=response?.data?.ExamDb;
            setAllData(data);
        }
        catch(err){
            console.log(err);
        }
    }
    function filterDataAccordingly(){
        if(allData.length<=0)
            return;
        const temp2=[];
        allData.forEach((ele)=>{
            if(!temp2.includes(ele.examName)){
                temp2.push(ele.examName);
            }
        })
        setExamNames(temp2);
    }
    useEffect(()=>{
        filterDataAccordingly();
    },[allData]);
    function SelectSubject(examType){
        let temp2=[]
        allData.map((ele)=>{
            if(ele.examName==examType)
                temp2.push(ele)
        })
        setExamType(examType);
        setSubjectIds(temp2);
    }
    //set subject detils to add marks to that subject\
    const [eType,setExamType]=useState("");
    const [targetSubject,setTargetSubject]=useState("");
    const [classData,setclassData]=useState([]);
    const [maxmarks,setMaxMarks]=useState(0);
    const [currentstumarks,setcurrstumarks]=useState(0);

    async function fetchAllStudents(){
        const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/getAllClassStudents`,{grade:grade});
        console.log(response);
        const arr=response?.data?.classDb?.rollnumber
        setclassData(arr); 
    }
    const [marksFromData,setmarksFormData]=useState([{}]);
    const [includedIndex,setIncludedIndex]=useState([]);
    function setEachStudentmarkDetail(x,y,idx){
        if(!includedIndex.includes(idx)){
        const newData = [...marksFromData]; // Create a copy of the existing data array
        newData.push({ rollNumber:x, marks: y }); // Add the new entry (modify as needed)
        setIncludedIndex([...includedIndex,idx]);
        setmarksFormData(newData);
        }
        setcurrstumarks(0);
       
    }
    //handler function to add marks to each student
    // async function CreateSubject(){
    //     try{
    //         if(targetSubject==""||maxmarks==0||eType==""||marksFromData.length<=0){
    //             alert("Complete All fileds");
    //         }
    //     }
    //     catch(){

    //     }
    // }
    async function addMarksOfStudents(){
        try{
            if(examId==""||marksFromData.length<=0){
                alert("ExamId or record data is not available");
            }
            else{
                try{
                const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/adding-marks`,{examId:examId,record:marksFromData});
                console.log(response);
                }
                catch(err){
                    console.log(err.message);
                }
            }
        }
        catch(err){

        }
    }
    const [examId,setExamId]=useState("");
    return(
        <div className="mt-[60px] flex min-h-screen flex-col">
            {console.log(allData,examNames,subjectIds)}
            {examNames.length>0 &&
                (<div className='mx-auto w-11/12 flex flex-col p-[20px] gap-10'>
                   <div className='flex flex-col border-4 border-gray rounded-lg gap-6  p-6'>
                   <p className='font-bold text-3xl'>Select Exam Type</p>
                   <div className=' flex gap-[20px]'>
                    {examNames.map((ele,idx)=>{
                        return(
                                    <button onClick={()=>{SelectSubject(ele)}} key={idx} className='w-[150px] h-[60px] border-gray border-4 rounded-md flex justify-center items-center text-[25px] hover:bg-gray-400'>
                                        <p>{ele}</p>
                                    </button>
                                )
                    })
                    }
                    </div>
                    </div>
                </div>
                )
                }
                {
                    subjectIds.length>0 &&
                    (
                    <div className='mx-auto w-11/12 flex flex-col p-[20px] gap-10'>
                    <div className='flex flex-col border-4 border-gray rounded-lg gap-6  p-6'>
                    <p className='font-bold text-3xl'>Select the Subject</p>
                    <div className=' flex gap-[20px]'>
                        {subjectIds.map((ele,idx)=>{
                            return(
                                        <button onClick={()=>{setTargetSubject(ele.SubjectId?.subjectName);setExamId(ele._id);fetchAllStudents()}} key={idx} className='w-[150px] h-[60px] border-gray border-4 rounded-md flex justify-center items-center text-[25px] hover:bg-gray-400'>
                                            <p>{ele.SubjectId?.subjectName}</p>
                                        </button>
                                    )
                        })
                        }
                        </div>
                        </div>
                    </div>
                    )
                }
                {/* adding class marks */}

                <div className="mx-auto w-11/12 flex flex-col p-10 border-2 border-gray gap-3 mt-[20px]">
                { classData.length>0 && <input className="w-[300px] h-[40px] p-2 border-2 border-gray" type="number" placeholder="Enter Maximum Marks" onChange={(e)=>{setMaxMarks(e.target.value)}}></input>
}
                { 
                    classData.map((element,idx)=>{
                        return(
                            <div key={idx} className='flex justify-evenly text-xl border-2 border-gray rounded-md py-2'>
                              <p className='font-bold'>{element}</p>
                              <input className="border-2 border-black rounded-md p-1" type="number" max={maxmarks} onChange={(e)=>{setcurrstumarks(e.target.value)}}></input>
                              <button className={`${includedIndex.includes(idx)?"border-green-500 bg-green-300":"border-red-500"} border-2 rounded-md px-2 py-1`} onClick={()=>{setEachStudentmarkDetail(element,currentstumarks,idx)} }>Add</button>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={addMarksOfStudents}>Add Marks</button>
            {console.log(eType,targetSubject,maxmarks,examId,marksFromData,classData)}     
        </div>
    )
};
export default ExamTeacher;