import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';

const ScoreResult = () => {
  const { user } = useSelector((state) => state.profile);
  const [studentId, setStudentId] = useState(user ? user._id : '');

  const [Xdata, setXdata] = useState([]);
  const [Ydata, setYdata] = useState([]);
  const [datafetched, setdatafetched] = useState(false);

  const fetchHandel = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getscore/${studentId}`);
      const data = await response.json();

      const xData = []; // Scores
      const yData = []; // Dates as numeric values

      data.forEach((item) => {
        const { score, dates } = item;
        xData.push(score);

        // Convert the date string to a timestamp (milliseconds since the Unix epoch)
        const timestamp = new Date(dates).getTime();
        yData.push(timestamp);
      });

      setXdata(xData);
      setYdata(yData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData = async () => {
    await fetchHandel();
    setdatafetched(true);
  };
  useEffect(() => {

    fetchData();
  }, [studentId]);

  return (
    <div className='ScoreResult'>
      <div className='information'>
        <div className="heading">Score result of previous Test</div>
        <div className='info'>X-axis: Score</div>
        <div className='info'>Y-axis: Date</div>
      </div>
      
      {datafetched && (
        <LineChart
          xAxis={[{ data: Ydata }]}
          series={[
            {
              data: Xdata,
            },
          ]}
          width={500}
          height={300}
        />
      )}
    </div>
  );
};

export default ScoreResult;
