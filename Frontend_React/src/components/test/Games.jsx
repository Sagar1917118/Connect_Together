import React from 'react'
import {useState} from 'react';
import  TicToe from './tick-toe-tow/TicToe'
import MathGame from './maths-games/components/MathGame';
import  Quiz from './test/Quiz'
const Games = () => {
  const [current,setCurrent]=useState("MathGame");
  return (
    <div className='Games flex flex-col gap-10'>
      <div className='w-11/12 mx-auto flex flex-wrap gap-4 justify-center'>
        <button className={`text-xl p-2 border-2 min-w-[150px] border-gray-400 rounded-md ${(current=="MathGame")?"bg-indigo-600 text-white":"bg-indigo-300"}  font-bold`} onClick={()=>{setCurrent("MathGame")}}>MathGame</button>
        <button className={`text-xl p-2 border-2 min-w-[150px] border-gray-400 rounded-md ${(current=="TicTakToe")?"bg-indigo-600 text-white ":"bg-indigo-300"} font-bold`} onClick={()=>{setCurrent("TicTakToe")}}>TicTakToe</button>
        <button className={`text-xl p-2 border-2 min-w-[150px] border-gray-400 rounded-md ${(current=="Quiz")?"bg-indigo-600 text-white":"bg-indigo-300"} font-bold`} onClick={()=>{setCurrent("Quiz")}}>Quiz</button>
      </div>
      <div className='w-11/12  flex justify-center mx-auto'>
        {current=="MathGame" && (<MathGame></MathGame>)}
        {current=="TicTakToe" && (<TicToe></TicToe>)}
        {current=="Quiz" && ( <Quiz></Quiz>)}
      </div>
    </div>
  )
}

export default Games
