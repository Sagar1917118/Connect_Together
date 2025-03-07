import React from 'react';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast'; 

// Common Components
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute';

// Pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AttendQuestionPage from './pages/AttendQuestionPage';
import StudentInfo from './pages/StudentInfo';
import InstructorInfo from './pages/InstructorInfo';
import NotificationPage from './pages/NotificationPage';
import Error from "./pages/Error";
import MyDiary from './pages/MyDiary';
import StudentMarkPage from './pages/StudentMarkPage';

// Dashboard Components
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";

// Doubt Section
import AskDoubt from "./components/core/Doubt/AskDoubt";

// Chat Section
import ChatSection from './components/core/ChatSection/ChatSection';

// Attendance & Exams
import Attendance from "./components/cumminComponents/Attendance";
import StudentAttendance from './components/cumminComponents/StudentAttendance';
import ExamTeacher from "./components/cumminComponents/ExamTeacher";
import CreateExam from "./components/cumminComponents/CreateExam";

// Homework & Diary
import AddHomework from './components/cumminComponents/AddHomework';
import CreateDiary from './components/cumminComponents/CreateDiary';
import AddHomeworkSubject from './components/cumminComponents/AddHomeworkSubject';

// Games & Blogs
import Game from "./components/test/Games";
import BlogPage from "./components/blog/BlogPage";

// Payment
import Payment from "./components/payment/Payment";
import Paymentsuccess from "./components/payment/Paymentsuccess";


import Home from "./components/Hero/Home"



const App = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className=''>
      <Toaster />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboard Routes */}
        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
        </Route>

        {/* Student Routes */}
        {user?.role == "Student" && (
          <>
            <Route path="/askdoubt" element={<PrivateRoute><AskDoubt /></PrivateRoute>} />
            <Route path="/mydiary" element={<MyDiary />} />
            <Route path="/marks" element={<StudentMarkPage />} />
            <Route path="/attendance" element={<StudentAttendance />} />
            <Route path="/games" element={<Game />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/paymentverification" element={<Paymentsuccess />} />
          </>
        )}

        {/* Instructor Routes */}
        {user?.role == "Instructor" && (
          <>
            <Route path="/notification" element={<PrivateRoute><NotificationPage /></PrivateRoute>} />
            <Route path="/attend-question/:id" element={<PrivateRoute><AttendQuestionPage /></PrivateRoute>} />
            <Route path="/marks" element={<ExamTeacher />} />
            <Route path="/marks/create-exam" element={<CreateExam />} />
            <Route path="/mydiary" element={<CreateDiary />} />
            <Route path="/addhomework/:id" element={<AddHomeworkSubject />} />
            <Route path="/attendance" element={<Attendance />} />
          </>
        )}

        {/* General Routes */}
        <Route path="/student-info" element={<StudentInfo />} />
        <Route path="/instructor-info" element={<InstructorInfo />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/chat-section" element={<PrivateRoute><ChatSection /></PrivateRoute>} />

        {/* Error Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
