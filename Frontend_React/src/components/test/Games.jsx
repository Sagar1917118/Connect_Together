import React from 'react'
import {useState} from 'react';
import  Math_games from './maths-games/Start'
import  TicToe from './tick-toe-tow/TicToe'
import  Quiz from './test/Quiz'
import ScoreResult from './test/ScoreResult'
const Games = () => {
  const [current,setCurrent]=useState("MathGame");
  return (
    <div className='Games flex flex-col gap-10'>
      <div className='w-11/12 mx-auto flex gap-4 justify-center'>
        <button className='text-lg p-2 border-2 border-black rounded-md hover:bg-gray-200 font-bold' onClick={()=>{setCurrent("MathGame")}}>MathGame</button>
        <button className='text-lg p-2 border-2 border-black rounded-md hover:bg-gray-200 font-bold' onClick={()=>{setCurrent("TicTakToe")}}>TicTakToe</button>
        <button className='text-lg p-2 border-2 border-black rounded-md hover:bg-gray-200 font-bold' onClick={()=>{setCurrent("Quiz")}}>Quiz</button>
        <button className='text-lg p-2 border-2 border-black rounded-md hover:bg-gray-200 font-bold' onClick={()=>{setCurrent("ScoreResult")}}>ScoreResult</button>
      </div>
{current=="MathGame" && (<Math_games></Math_games>)}
{current=="TicTakToe" && (<TicToe></TicToe>)}
{current=="Quiz" && ( <Quiz></Quiz>)}
{current=="ScoreResult" && (<ScoreResult></ScoreResult>)}
    </div>
  )
}

export default Games
