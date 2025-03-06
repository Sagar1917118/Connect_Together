import React, { useEffect } from 'react'
import "./App.css"
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/core/Auth/OpenRoute'
import Signup from './pages/Signup'
import Login from './pages/Login'
// import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import Contact from './pages/Contact'
import VerifyEmail from './pages/VerifyEmail'
// import ForgotPassword from './pages/ForgotPassword'
// import UpdatePassword from './pages/UpdatePassword'
// import About from './pages/About'
// import Contact from './pages/Contact'
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import Dashboard from "./pages/Dashboard"
import AttendQuestionPage from './pages/AttendQuestionPage'
import AddHomework from './components/cumminComponents/AddHomework'

//
import StudentInfo  from './pages/StudentInfo';
import InstructorInfo from './pages/InstructorInfo'
//doubt
import AskDoubt from "./components/core/Doubt/AskDoubt"
import LiveStream from './pages/LiveStream'
import { useSelector } from 'react-redux'
import NotificationPage from './pages/NotificationPage';

import Error from "./pages/Error";
import ChatSection from './components/core/ChatSection/ChatSection'
import MyDiary from './pages/MyDiary'
import StudentMarkPage from './pages/StudentMarkPage'

// socket


import Attendance from "./components/cumminComponents/Attendance";
import ExamTeacher from "./components/cumminComponents/ExamTeacher";
import CreateExam from "./components/cumminComponents/CreateExam";import CreateDiary from './components/cumminComponents/CreateDiary'
import AddHomeworkSubject from './components/cumminComponents/AddHomeworkSubject'
import StudentAttendance from './components/cumminComponents/StudentAttendance'

import Game from "./components/test/Games";
import ScoreResult from "./components/test/test/ScoreResult";
import BlogPage from "./components/blog/BlogPage";
import Calender from "./components/calender/Calender";
import Payment from "./components/payment/Payment";
import Paymentsuccess from "./components/payment/Paymentsuccess";
import Paymenthistory from "./components/payment/Paymenthistory";
import MeetingPage from "./components/components/meeting/MeetingPage";
import { Toaster } from 'react-hot-toast'; 
const App = () => {
  const {user}=useSelector((state)=>state.profile);
  return (
    <div className='app'>
           <Toaster/>
      <Navbar/>

      <Routes>
          {/* <Route path="/" element={<Attendance/>} /> */}
          <Route path="/exam-teacher" element={<ExamTeacher/>}></Route>
          <Route path="/create-exam" element={<CreateExam/>}></Route>
          {/* ------------------------ */}
          <Route path="/" element={<Home/>} />
          <Route path="/Student-info" element={<StudentInfo/>} />
          <Route path="/Instructor-info" element={<InstructorInfo/>}></Route>
          <Route path="/signup" element = { <OpenRoute> <Signup /> </OpenRoute> } />
          <Route path="/login" element = { <OpenRoute> <Login /> </OpenRoute> } />
          <Route path="/forgot-password" element = { <OpenRoute> <ForgotPassword /> </OpenRoute> } />
          <Route path="/update-password/:id" element = { <OpenRoute> <UpdatePassword /> </OpenRoute> } />
          <Route path="about" element = {  <About /> } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify-email" element = { <OpenRoute> <VerifyEmail /> </OpenRoute> } />
          <Route element = {<PrivateRoute> <Dashboard /> </PrivateRoute>} >
              <Route path="dashboard/my-profile" element={ < MyProfile />} /> 
              <Route path="dashboard/Settings" element={<Settings />} /> 
          </Route>
          {user?.role==="Student" && <Route path="/askdoubt" element={<PrivateRoute> <AskDoubt></AskDoubt></PrivateRoute>}></Route>}
          {user?.role==="Instructor" && <Route path="/notification" element={<PrivateRoute> <NotificationPage/></PrivateRoute>}></Route>}
          {user?.role==="Instructor" && <Route path="/attend-question/:id" element={<PrivateRoute> <AttendQuestionPage /></PrivateRoute>}></Route>}
          {user?.role==="Student" && <Route path="/mydiary" element={<MyDiary/>}></Route>}
          {user?.role=="Student" && <Route path="/marks" element={<StudentMarkPage/>}/>}
          {user?.role=="Instructor" && <Route path="/marks" element={<ExamTeacher/>}/>}
          {user?.role=="Instructor" && <Route path="/marks/create-exam" element={<CreateExam/>}/>}

          {user?.role=="Instructor" && <Route path="/mydiary" element={<CreateDiary/>}/>}
          {user?.role=="Instructor" && <Route path="/addhomework/:id" element={<AddHomeworkSubject/>}/>}
          {user?.role=="Instructor" && <Route path="/attendance" element={<Attendance></Attendance>}/>}
          {user?.role=="Student" && <Route path="/attendance" element={<StudentAttendance/>}/>}
          <Route path="/chat-section" element={<PrivateRoute><ChatSection/></PrivateRoute>}></Route>
          {user?.role=="Student" && <Route path="/games" element={<Game/>}/>}       
          {/* {user?.role=="Student" && <Route path="/score-result" element={<ScoreResult/>}/>}        */}
          {user?.role=="Student" && <Route path="/blog" element={<BlogPage/>}/>}       
          {user && <Route path="/calender" element={<Calender/>}></Route>}
          {user?.role=="Student" && <Route path="/payment" element={<Payment/>}/>}       
          {user?.role=="Student" && <Route path="/paymentverification" element={<Paymentsuccess/>}/>}     
          {user?.role=="Student" && <Route path="/payment-history" element={<Paymenthistory/>}/>}     
          <Route path="/webinars" element={<MeetingPage/>}> </Route>
<Route path="*" element={<Error/>}></Route>
      </Routes>
    </div>
  )
}

export default App;