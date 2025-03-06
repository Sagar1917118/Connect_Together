import React from 'react'

const CalenderCard = (props) => {
      const {date,month,year,event,description}=props.data;
      console.log(date,month,year,event,description);
return (
    <div className='CalenderCard'>
      <div className='date'>{date} {month} {year}</div>
      
      <div className='event-description'>
            <div className='event'>{event}</div>
            <span className='separator'></span>
            <div className='description'>{description}</div>
      </div>
      
    </div>
  )
}

export default CalenderCard
