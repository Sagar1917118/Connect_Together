import { useState, useEffect, useMemo } from 'react';
import AttendanceChart from "./AttendanceChart";
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import LoadingButton from './LoadingButton';
function Skeleton() {
    return (
        <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-full h-[50px] bg-gray-300 rounded-md animate-pulse"></div>
            ))}
        </div>
    );
}

function Attendance() {
    const { grade, rollnumber } = useSelector((state) => state.auth);
    const [classData, setClassData] = useState([]);
    const [pStudent, setPStudent] = useState([]);
    const [presentButtons, setPresentButtons] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        fetchAllStudents();
        getAllAttendanceByClass();
    }, [grade, rollnumber]);
    
    async function fetchAllStudents() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/other/getAllClassStudents`, { grade });
            setClassData(response?.data?.classDb?.rollnumber || []);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    }

    async function getAllAttendanceByClass() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/other/get-all-attendance-by-class`, { grade });
            setChartData(response?.data?.dbResponse || []);
        } catch (error) {
            console.error("Error fetching attendance", error);
        }
    }

    function handleClick(rollnumber, idx) {
        if (!presentButtons.includes(idx)) {
            setPStudent([...pStudent, rollnumber]);
            setPresentButtons([...presentButtons, idx]);
        } else {
            setPStudent(pStudent.filter((ele) => ele !== rollnumber));
            setPresentButtons(presentButtons.filter((ele) => ele !== idx));
        }
    }

    async function markAttendance() {
        try {
            // Uncomment the below lines when integrating with the API
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BASE_URL}/other/mark-attendance`, { grade, pStudent });
            toast.success("Attendance Marked Successfully");
            getAllAttendanceByClass();
            setLoading(false);
        } catch (error) {
            toast.error("Error marking attendance");
            console.error("Error marking attendance", error);
            setLoading(false);
        }
    }

    const todayDate = new Date().toLocaleDateString();

    return (
        <div className="mt-20 px-4 md:px-10">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">Attendance Tracker</h1>
            <p className="text-center text-lg font-semibold text-gray-700 mb-4">Mark attendance for Grade: <span className='text-indigo-600'>{grade}</span> on <span className="text-indigo-600">{todayDate}</span></p>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Student List */}
                <div className="max-h-[550px] overflow-y-scroll md:w-1/2 w-full border-2 border-gray-300 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Student List</h2>
                    {!classData ?<Skeleton></Skeleton>:
                    (
                    classData.length === 0 ? (
                        <p className="text-red-500 text-lg font-bold">No students found.</p>
                    ) : (
                        classData.map((student, idx) => (
                            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-300">
                                <p className="text-lg font-medium text-gray-700">{student}</p>
                                <button
                                    className={`px-4 py-2 rounded-md text-white transition-all ${presentButtons.includes(idx) ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
                                    onClick={() => handleClick(student, idx)}
                                >
                                    {presentButtons.includes(idx) ? "Present" : "Absent"}
                                </button>
                            </div>
                        ))
                    )
                )}
                </div>

                {/* Attendance Summary & Chart */}
                <div className="md:w-1/2 w-full flex flex-col items-center gap-5">
                    <div className="w-full flex justify-around text-xl p-4 bg-gray-100 rounded-lg shadow-lg">
                        <div className="text-center">
                            <p className="font-semibold text-gray-600">Total Students</p>
                            <span className="text-4xl font-bold text-indigo-600">{classData.length}</span>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-gray-600">Present Students</p>
                            <span className="text-4xl font-bold text-green-600">{pStudent.length}</span>
                        </div>
                    </div>
                    {
                        loading ? (<LoadingButton/>):(
                    
                        <button
                            className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-all"
                            onClick={markAttendance}
                        >
                            Mark Attendance
                        </button>
                        )}
                    <AttendanceChart chartData={chartData} />
                </div>
            </div>
        </div>
    );
}
export default Attendance;