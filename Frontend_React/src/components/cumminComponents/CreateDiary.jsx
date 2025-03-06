import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeWorkReview from "./HomeWorkReview";
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
                !allSubject ? (<div>Loading...</div>) : (
                    <div className='allSubjects'>
                        {allSubject.map(subject => (
                            <h1 key={subject._id} className='particularSubject' onClick={()=>clickHandler(subject._id,subject.grade)}>{subject.subjectName}</h1>
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
