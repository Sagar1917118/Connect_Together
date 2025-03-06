import React from 'react'
import studentFrusteted from '../../assets/frustratedStudent.avif'
import { Slide } from 'react-awesome-reveal'

const Section2AskedPart = () => {
  return (
    <div className='section2AskedPart'>
        <div className='section2AskedPartFirst'>
            <div className='askedPartText'>
             <div><span className='askedPartSpan'>Next,</span> we asked students if they were satisfied with their current approach to dealing with confusion:</div>
             <div className='askedPartDataSection'><span className='askedPartDataSectionSpan'>85% </span>- Responded with a resounding NO!</div>
            </div>
            <Slide>
            <div className='askedPartImage'>
                <img src={studentFrusteted}></img>
            </div>
            </Slide>
        </div>

        <div className='askedPartButton'>
            It's clear that there's a need for better solutions to address learning challenges and we created {" "} <span className='askedPart'> Menty.</span>
        </div>

    </div>
  )
}

export default Section2AskedPart
