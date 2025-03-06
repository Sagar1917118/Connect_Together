import React, { useState } from 'react';
import axios from 'axios';
const HomeWorkReview = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [review, setReview] = useState('');
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(); // Use getDate() to get the day of the month
  const formattedDate = day + "-" + month + "-" + year;
  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Roll Number:', rollNumber);
    console.log('Review:', review);
    console.log('date', formattedDate);
    // Reset form fields
    try{
      const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/other/review-homework`,
      {rollnumber:rollNumber,review:review,date:formattedDate});
      console.log(response);
    }
    catch(err){
      console.log("Error in reviewing homework",err);
    }
    setRollNumber('');
    setReview('');
  };

  return (
    <div className=" mx-auto w-[50%] my-8 border-2 p-4 border-gray-400 rounded-md">
      <p className='font-bold text-lg'>Add HomeWork Review For Student</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={rollNumber}
            onChange={handleRollNumberChange}
            autoComplete="off"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 rounded-md p-2 border-gray-400 rounded-m
            d"
          />
        </div>
        <div >
          <label htmlFor="review" className="block text-sm font-medium text-gray-700">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            value={review}
            onChange={handleReviewChange}
            rows={4}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 rounded-md p-2 border-gray-400 rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeWorkReview;
