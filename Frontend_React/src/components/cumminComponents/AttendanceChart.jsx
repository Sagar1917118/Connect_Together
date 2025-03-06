import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
function AttendanceChart({chartData}){
    console.log(chartData);
    const Xdata=[];
    chartData.forEach(element => {
        Xdata.push(element.date);
    });
    const Ydata=[];
    chartData.forEach(element => {
        Ydata.push(element.presence.length);
    });
    console.log(Xdata);
    console.log(Ydata);
    return(
        <div>
    <LineChart
      xAxis={[{ scaleType: 'point',data: Xdata }]}
      series={[
        {
          data:Ydata,
        },
      ]}
      width={500}
      height={300}
    />
    </div>)
};
export default AttendanceChart;