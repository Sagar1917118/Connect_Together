import React from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";

const MeetingCard = (props) => {
  const { title, date, time, description, g_meet } = props.data;

  const meetingHandle = () => {
    console.log("meeting handle clicked");
    window.open(g_meet, '_blank'); // Opens the link in a new tab
  };

  return (
    <div className='MeetingCard'>
      <div className='topsection'>
        <div>Title: {title}</div>
        <div className='datetimediv'>Date: {date} Time: {time}</div>
        <div onClick={meetingHandle} className='meetinglink'><FaExternalLinkAlt /></div>
      </div>
      <div className='description'>
        {description}
      </div>
    </div>
  );
};

export default MeetingCard;
