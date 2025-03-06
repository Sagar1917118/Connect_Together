import React from 'react'
import { JackInTheBox } from 'react-awesome-reveal'



function Section2(){
    const data=[
        {
            id:1,
            number:"18%",
            problem:"Seek help from a friend"
        },
        {
            id:2,
            number:"13%",
            problem:"Search for answers online"
        },
        {
            id:3,
            number:"8%",
            problem:"Approach the teacher for clarification"

        },
        {
            id:4,
            number:"61%",
            problem:"Give up and do nothing"

        },

    ]
    return(
        <>
            <div className="highlightingProblemDiv">
                <h1 className="highlightingProblemHeading">This is what we found</h1>
                <div className="highlightingProblemCardsSection">
                {
                    data.map((problem,index)=>{
                        return(
                            <JackInTheBox>
                            <div className={problem.id<=3?"problemsCard addBorder":"problemsCard"} key={index}>
                                <div className="problemsCardNumber">{problem.number}</div>
                                <div className="problemsCardProblems">{problem.problem}</div>
                            </div>
                            </JackInTheBox>
                        )
                    })
                }
                </div>
            
            </div>
        </>
        
    )
};
export default Section2;
