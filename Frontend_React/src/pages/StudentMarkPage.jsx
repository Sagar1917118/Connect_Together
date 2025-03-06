import {useState,useEffect,useMemo} from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from 'axios';
import { useSelector } from 'react-redux'
function StudentMarkPage(){
    const {grade,rollnumber}=useSelector((state)=>state.auth);
    const [allData,setAllData]=useState([]);
    const [subjectIds,setSubjectIds]=useState([]);
    const [examNames,setExamNames]=useState([]);
    const [temp,setTemp]=useState(null);
    const [graphData,setData]=useState(null);
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
    const [getMarks,setMarks]=useState([]);
    function getRequiredData(id){
        console.log(id);
        const data=allData.filter((ele)=>ele._id==id);
        console.log(data);
        const temp=data[0].marksRecord;
        setTemp(temp);
        calculateValues(temp);
        console.log(temp);
    }

    function calculateValues(temp){
        let maxi=-1;
        let studentMark=0;
        var totalMarks=0;
        temp.forEach((ele)=>{
          if(ele.marks>maxi) maxi=ele.marks;
          if(ele.marks>=0)totalMarks += parseInt(ele.marks, 10);
          if(ele.rollNumber==parseInt(rollnumber,10)) studentMark=ele.marks;
        })
        var averageMark=0
        if(temp.length!=1) averageMark=totalMarks/(temp.length-1);
        setData({maxi:maxi,studentMark:studentMark,averageMark:averageMark})
        console.log(graphData);
    }
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
                                        <button onClick={()=>{setTargetSubject(ele.SubjectId?.subjectName);getRequiredData(ele._id)}} key={idx} className='w-[150px] h-[60px] border-gray border-4 rounded-md flex justify-center items-center text-[25px] hover:bg-gray-400'>
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
            {console.log()}  

        {!temp?(<div></div>):(
          <div className='bigGraphContainer'>
        <div className='graphContainer'>
            <Bar
                data={{
                  labels:["Your Child Marks","Class Average Marks","Class Hightes Mark"],
                  datasets:[
                    {
                      label:"Average Marks",
                      data:[graphData.studentMark,graphData.averageMark,graphData.maxi],
                      backgroundColor: [
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                      ],
                      borderRadius: 5,

                    }
                  ]
                }}
                
            />
        </div>
        </div>
        )}   
        </div>
    )
};
export default StudentMarkPage;