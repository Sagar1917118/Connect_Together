import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeWorkReview from "./HomeWorkReview";
import Loader from "./Loader";
function Skeleton(){
    return(
        <div className="allSubjects grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                key={index}
                className="w-[150px] h-[50px] bg-gray-300 rounded-lg animate-pulse"
                ></div>
            ))}
            </div>
    )
}
const CreateDiary = () => {
    const [allSubject, setAllSubject] = useState(null);

    const fetchSubjects = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/other/getallsubject", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            setAllSubject(result.data); 
        } catch (error) {
            console.log("Error in getting all subjects");
        }
    }

    useEffect(() => {
        fetchSubjects();
    }, []);
    const navigate=useNavigate();

    function clickHandler(subjectId,grade){
        navigate(`/addhomework/${subjectId}`, { state: { grade } });
    }
    return (
        <div className='showAllSubject'>
            {   
                !allSubject ? (<Skeleton></Skeleton>) : (
                        <div className="allSubjects grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {allSubject.map((subject) => (
                            <h1
                            key={subject._id}
                            className="particularSubject w-[150px] p-2 bg-indigo-600 text-white flex items-center justify-center text-center rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-purple-600"
                            onClick={() => clickHandler(subject._id, subject.grade)}
                            >
                            {subject.subjectName}
                            </h1>
                        ))}
                        </div>
                )
            }
             <div>
                <HomeWorkReview/>
          </div>
        </div>
    )
}

export default CreateDiary
