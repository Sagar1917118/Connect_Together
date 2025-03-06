import React, { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import MeetingForm from './MeetingForm'; // Assuming you have a MeetingForm component

const MeetingPage = () => {
    const [showPopup, setShowPopup] = useState(false);
const [meetingData,setMeetingdata]=useState([]);
const [datafecthed,setdatafetched]=useState(false);
    const createMeetingHandle = (e) => {
        e.preventDefault();
        setShowPopup(true); // Open the pop-up component
    };

    const closePopup = () => {
        setShowPopup(false); // Close the pop-up component
    };
const fetchHandle=async()=>{
    const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/scheduledMeeting`);
    const data=await response.json();
    setMeetingdata(data);
    setdatafetched(true)

}
useEffect(()=>{fetchHandle();},[])

    return (
        <div className='Meetingpage'>
            <div className='newMeetingdiv'>
                <button onClick={createMeetingHandle}>Create Workshop</button>
            </div>
            <div className='meetingBox'>
                <div className='meetingheading'>Upcomming Workshop</div>
                <div className='futureMeetingList'>
                    {/* Render MeetingCard components here */}
                    {/* Assuming these are placeholders for existing meetings */}
                    {
                        datafecthed &&
                        meetingData.map((data,index)=>{
                            return <MeetingCard data={data} key={index} />
                        })
                    }
                    
                    {/* <MeetingCard />
                    <MeetingCard />
                    <MeetingCard />
                    <MeetingCard />
                    <MeetingCard />
                    <MeetingCard />
                    <MeetingCard />
                    <MeetingCard /> */}
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-button" onClick={closePopup}>Close</button>
                        {/* Render the MeetingForm component here */}
                        <MeetingForm />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MeetingPage;
