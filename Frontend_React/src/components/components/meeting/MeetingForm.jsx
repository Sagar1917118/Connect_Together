import React, { useState } from 'react';

function MeetingForm() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        teacherId: '', // Assuming you will handle getting teacherId elsewhere
        student: '', // Assuming you will handle getting studentId elsewhere
        g_meet: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/create`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Convert formData to JSON
        });
        setShowForm(false);
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Open Form</button>
            {showForm && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Meeting Form</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title:</label><br />
                            <input type="text" id="title" name="title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} /><br />
                            <label htmlFor="description">Description:</label><br />
                            <input type="text" id="description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} /><br />
                            <label htmlFor="gMeetLink">Google Meet Link:</label><br />
                            <input type="text" id="gMeetLink" name="gMeetLink" value={formData.g_meet} onChange={(e) => setFormData({ ...formData, g_meet: e.target.value })} /><br />
                            <label htmlFor="date">Date:</label><br />
                            <input type="date" id="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} /><br />
                            <label htmlFor="time">Time:</label><br />
                            <input type="time" id="time" name="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} /><br />
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={() => setShowForm(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MeetingForm;
