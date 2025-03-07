import React, { useEffect, useState } from 'react'
// import { QuizData } from './data'
import QuizResult from './QuizResult';

function Quiz() {
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [score,setScore] = useState(0);
    const [clickedOption,setClickedOption]=useState(0);
    const [QuizData,setQuizDate]=useState([]);
    const [datafecthed,setDataFetched]=useState(false);
    const [showResult,setShowResult]=useState(false);
    
const fetchFunction=async()=>{
      const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/testquestion`);
      const data=await response.json();
      setDataFetched(true);
      console.log(data);
      setQuizDate(data);
      console.log(data[1]);

}

useEffect(()=>{
    fetchFunction();
},[])

    const changeQuestion = ()=>{
        updateScore();
        if(currentQuestion< QuizData.length-1){
            setCurrentQuestion(currentQuestion+1);
            setClickedOption(0);
        }else{
            setShowResult(true)
        }
    }
    const updateScore=()=>{
        if(clickedOption===QuizData[currentQuestion].answer){
            setScore(score+1);
        }
    }
    const resetAll=()=>{
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }
  return (
    <div className='border-4 border-indigo-600 p-2 md:p-10 rounded-lg'>
        <p className="text-indigo-600 text-2xl font-bold">Welcome to Quiz Game!!</p>
        <div className="container">
            {showResult&&
             (
                <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll}/>
            )}

            {/* {datafecthed &&
            <div className="question">
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{QuizData[currentQuestion].question}</span>
            </div>
            } */}

            { (!showResult && datafecthed ) &&
            <div className='testdiv'>
            <div className="w-full text-black font-semibold mt-4 text-xl">
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{QuizData[currentQuestion].question}</span>
            </div>

 
            <div className="option-container">
                {QuizData[currentQuestion].options.map((option,i)=>{
                    return(
                        <button 
                        // className="option-btn"
                        className={`option-btn ${
                            clickedOption == i+1?"checked":null
                        }`}
                        key={i}
                        onClick={()=>setClickedOption(i+1)}
                        >
                        {option}
                        </button>
                    )
                })}                
            </div>

            <div className='nextbutton'>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion}/>
                </div>
            </div>
            }
        </div>

    </div>
  )
}

export default Quiz