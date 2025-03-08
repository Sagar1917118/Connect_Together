import {useState,useEffect,useMemo} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast, { ToastIcon } from 'react-hot-toast';
import LoadingButton from './LoadingButton';
import CreateExam from './CreateExam';
import { FaRegFileAlt } from "react-icons/fa";
const Skeleton = ({ width = "100%", height = "20px", className = "" }) => {
    return (
      <div
        className={`bg-gray-300 animate-pulse rounded-md ${className}`}
        style={{ width, height }}
      ></div>
    );
  };
  function ExamButton({setCreateExam}) {  
    return (
      <button
        onClick={() => setCreateExam((prev) => !prev)}
        className="relative flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full hover:w-32 transition-all duration-300 overflow-hidden"
      >
        <FaRegFileAlt size={24} />
        <span className="z-10 text-center absolute opacity-0 hover:opacity-100 transition-opacity duration-300 text-black ml-8">
          Create Exam
        </span>
      </button>
    );
  }
function ExamTeacher(){
    const {grade,rollnumber}=useSelector((state)=>state.auth);
    const [allData,setAllData]=useState([]);
    const [subjectIds,setSubjectIds]=useState([]);
    const [examNames,setExamNames]=useState([]);
    const [loading,setLoading]=useState(false);
    const [createExam, setCreateExam] = useState(false);
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
            toast.error("Error in getting class details");
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
        // console.log(response);
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
        else{
            setIncludedIndex(includedIndex.filter((id) => id !== idx));
            var tempMark=[];
            marksFromData.forEach((ele)=>{
                if(ele.rollNumber!=x){
                    tempMark.push(ele);
                }
            })
            setmarksFormData(tempMark);           
            
        }
        setcurrstumarks(0);
       
    }
    async function addMarksOfStudents(){
        try{
            // console.log(examId,marksFromData);
            setLoading(true);
            if(examId==""||marksFromData.length<=1){
                // alert("ExamId or record data is not available");
                toast.error("Imcomplete data entries");
            }
            else{
                try{
                const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/adding-marks`,{examId:examId,record:marksFromData});
                // console.log(response);
                }
                catch(err){
                    console.log(err.message);
                }
                toast.success("Marks added successfully");
            }
            setLoading(false)
        }
        catch(err){
            toast.error("Error in Adding Marks");
            console.log(err);
            setLoading(false);
        }
    }
    const [examId,setExamId]=useState("");
    const [examLoading,setExamLoading]=useState(false);
    const [subjectLoading,setSubjectLoading]=useState(null);
    return(
        // ------------------------
        <div className="relative mt-40 flex flex-col md:flex-row items-center md:items-start md:justify-center px-4 md:px-8 min-h-screen gap-4">
             {createExam && (<CreateExam setCreateExam={setCreateExam} GetAllExamByClassName={GetAllExamByClassName}></CreateExam>)}
              <div className='w-full md:w-1/2'>
              <div className="w-full max-w-4xl p-6 border-4 border-indigo-600 rounded-lg shadow-md bg-white">
                <h2 className="text-2xl font-bold text-center mb-4">Select Exam Type</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {examLoading
                    ? [...Array(3)].map((_, i) => <Skeleton key={i} width={120} height={50} />)
                    : examNames.map((ele, idx) => (
                        <button
                          key={idx}
                         onClick={()=>{SelectSubject(ele)}}
                          className={`min-w-[150px] px-4 py-2 rounded-md ${eType==ele?"bg-blue-800" :"bg-blue-400"} text-white text-lg  transition`}
                        >
                          {ele}
                        </button>
                      ))}
                      <ExamButton setCreateExam={setCreateExam}></ExamButton>
              </div>
             </div>
             {subjectIds && subjectIds.length>0 && (
                <div className="w-full max-w-4xl p-6 border-4 border-indigo-600 rounded-lg shadow-md bg-white mt-6">
                  <h2 className="text-2xl font-bold text-center mb-4">Select the Subject</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    {subjectLoading
                      ? [...Array(3)].map((_, i) => <Skeleton key={i} width={120} height={50} />)
                      : subjectIds.map((ele, idx) => (
                          <button
                            key={idx}
                            onClick={()=>{setTargetSubject(ele.SubjectId?.subjectName);setExamId(ele._id);fetchAllStudents()}}
                            className={`min-w-[150px] px-4 py-2 rounded-md ${(targetSubject===ele.SubjectId.subjectName)?"bg-green-800":"bg-green-500"}  text-white text-lg  transition`}
                            >
                            {ele.SubjectId?.subjectName}
                          </button>
        
                        ))}
                  </div>
                </div>
              )}
              </div>
             <div className="w-full min-h-[420px] md:w-1/2 max-w-4xl p-6 border-4 border-indigo-600 rounded-lg shadow-md bg-white">
                    {!classData || classData.length==0 ?(<div className='w-full h-full flex flex-col gap-3'>{[...Array(3)].map((_, i) => <Skeleton key={i} width={400} height={100} />)}</div>):
                    (
                        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
                        {classData.length > 0 && (
                            <div className="mb-4">
                            <label className="block text-lg font-semibold text-gray-700 mb-1">
                                Enter Maximum Marks:
                            </label>
                            <div className='flex justify-between items-center gap-2'>
                                <input
                                    type="number"
                                    className="flex flex-1 max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="Enter Maximum Marks"
                                    onChange={(e) => setMaxMarks(e.target.value)}
                                />
                                {loading ? (<LoadingButton/>) : (
                                 <button onClick={addMarksOfStudents}className='min-w-[100px] px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-400 text-md text-white'>Submit</button>
                                )}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 max-h-[400px] overflow-y-scroll">
                            {classData.map((element, idx) => (
                            <div
                                key={idx}
                                className="flex flex-wrap items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-300"
                            >
                                <p className="text-lg font-medium">{element}</p>

                                <input
                                type="number"
                                max={maxmarks}
                                className="w-24 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onChange={(e) => setcurrstumarks(e.target.value)}
                                />

                                <button
                                className={`min-w-[80px] px-4 py-2 text-white font-medium rounded-md transition duration-200 ${
                                    includedIndex.includes(idx)
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600"
                                }`}
                                onClick={() => setEachStudentmarkDetail(element, currentstumarks, idx)}
                                >
                                {includedIndex.includes(idx) ? "Remove" : "Add"}
                                </button>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
            </div>
        </div>
    )
};
export default ExamTeacher;