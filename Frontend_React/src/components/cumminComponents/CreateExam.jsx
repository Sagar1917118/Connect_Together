import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io"; // Import close icon
import LoadingButton from "./LoadingButton";
import toast from "react-hot-toast";
function CreateExam({ setCreateExam,GetAllExamByClassName }) {
  const { grade, rollnumber } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const processedItems = useMemo(() => {
    getSubjectByClass();
  }, []);

  async function getSubjectByClass() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/other/get-subject-by-grade`,
        { grade: grade }
      );
      const data = response?.data?.subjectDb;
      setAllSubjects(data);
    } catch (err) {
      console.log(err);
    }
  }

  const [allsubjects, setAllSubjects] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [testName, setTestName] = useState("");
  const [maxMarks, setMaxMarks] = useState(0);
  const [loading,setLoading]=useState(false);

  async function createExam(opt, tName) {
    const subject = allsubjects.find((ele) => ele.subjectName === opt);
    const subjectId = subject?._id || "";

    try {
        setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/other/creating-exam`,
        { subjectId, examName: testName, totalMarks: maxMarks, grade }
      );
      toast.success("Exam created Successfully");
      GetAllExamByClassName();
      navigate("/marks");
      setLoading(false);
    } catch (err) {
        setLoading(false);
        toast.error("Error in creating Exam");
      console.log(err);
    }
  }

  return (
      <div className="z-50 absolute top-4 left-1/2 transform -translate-x-1/2 w-[450px] bg-white shadow-lg rounded-lg p-6 flex flex-col gap-5 border-2 border-gray-300">
        {/* Close Button */}
        <button
          onClick={()=>{setCreateExam(false)}}
          className=" max-w-10  bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
        >
          <IoMdClose size={20} />
        </button>

        <p className="text-xl font-semibold text-center">Create New Test</p>

        <select
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select Subject</option>
          {allsubjects.map((option, index) => (
            <option key={index} value={option?.subjectName}>
              {option?.subjectName}
            </option>
          ))}
        </select>

        <input
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Enter Test Name"
          onChange={(e) => setTestName(e.target.value)}
        />

        <input
          className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          type="number"
          placeholder="Enter Maximum Marks"
          onChange={(e) => setMaxMarks(e.target.value)}
        />

        {
            loading ?(<LoadingButton></LoadingButton>):(
                <button
                className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition"
                onClick={() => createExam(selectedOption, testName)}
                >
                Create Test
                </button>
        )}
      </div>
  );
}

export default CreateExam;
