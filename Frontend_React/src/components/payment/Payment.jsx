import React,{useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast'
const  Payment= () => {
  const {user}=useSelector((state)=>state.profile);
  const {grade,rollnumber}=useSelector((state)=>state.auth);
      const [formData, setFormData] = useState({
            studentId: user._id,
            studentName:user.firstName+user.lastName,
            studentClass:grade,
            feeType: '',
            feeAmount: '',
            collegeId: '',
            mobileNumber: '' // New field for mobile number
          });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!formData.studentId||!formData.studentName||!formData.studentClass||!formData.feeType||!formData.feeAmount||!formData.collegeId||!formData.mobileNumber){
        toast.error("All fileds are required");
        return;
      }
      // console.log("hello ji ",process.env.PAYMENTCALLBACKURL)
      // try {
      //   await axios.post('http://your-backend-url/addStudent', formData);
      //   alert('Student added successfully!');
      // } catch (error) {
      //   console.error('Error adding student:', error);
      //   alert('Error adding student. Please try again.');
      // }
      checkoutHandler();
      };
const checkoutHandler = async (amount) => {
      amount=12001;
      try{
      const response1=await fetch(`${process.env.REACT_APP_BACKEND_URL}/getkey`);
      const {key}=await response1.json();
      console.log(key);
                  try {
                    // Make a POST request to the backend server
                  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/checkout`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  credentials: 'include',
                      body: JSON.stringify(formData)
                  // body: JSON.stringify(formData)
                  });
                
                    // Parse the JSON response
                  const data = await response.json();
                  console.log("second razor pay call ",data);
                  const {amount:amountobtained,id}= data;
                  // console.log(data);
                  const redirecturl=process.env.REACT_REDIRECT_PAYMENT_URL;
                  var options = {
                      key: key, // Enter the Key ID generated from the Dashboard
                      amount: amountobtained, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                      currency: "INR",
                      name: formData.collegeId,//
                      description:formData.feeType,
                      image: "data:image/jpeg;base64,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",
                      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the previous step
                      // callback_url:`${process.env.REACT_APP_FRONTEND_URL}/paymentverification`,
                      callback_url:redirecturl,
                      prefill: {
                        "name": formData.studentName,
                        "email": "suryasuraj8400@gmail.com",
                        "contact": formData.mobileNumber
                        },
                      notes: {
                          "address": "Razorpay Corporate Office"
                      },
                  theme: {
                        "color": "#3399cc"
                  }
                  };
                  const rzp1 = new window.Razorpay(options);
                  rzp1.open();

                  } catch (error) {
                    // Handle any errors that occur during the request
                  console.error("Error:", error);
                  }
                }
                catch(err){
                  console.log(err);
                  toast.error("Error in Payment");
                }
          };


      return (
      <div className='w-11/12 mx-auto'>
          <div className="bg-indigo-200 mt-10 w-full mx-auto  p-6 rounded-lg shadow-lg border border-indigo-300">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Add Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex flex-1 flex-col'>
                <label className="block text-lg font-medium text-indigo-700">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md bg-indigo-300  focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className='flex flex-1 flex-col'>
                <label className="block text-lg font-medium text-indigo-700">Student Name:</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md bg-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              </div>

              <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex flex-1 flex-col'>
              <label className="block text-lg font-medium text-indigo-700">Mobile Number:</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md bg-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className='flex flex-1 flex-col'>
              <label className="block text-lg font-medium text-indigo-700">Class:</label>
                <input
                  type="text"
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md bg-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-indigo-700">Fee Type:</label>
                <select
                  name="feeType"
                  value={formData.feeType}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md bg-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Fee Type</option>
                  <option value="Tuition Fee">Tuition Fee</option>
                  <option value="Extracurricular Activities">Extracurricular Activities</option>
                  <option value="Travel Fee">Travel Fee</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium  text-indigo-700">Fee Amount:</label>
                <input
                  type="text"
                  name="feeAmount"
                  value={formData.feeAmount}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md bg-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-indigo-700">General Register Number:</label>
                <input
                  type="text"
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md bg-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition"
              >
                Submit
              </button>
            </form>
          </div>

          
      </div>
      )
}

export default Payment;
