//API for Bagel from https://devexpress.github.io/devextreme-reactive/react/chart/demos/pie/doughnut/
import * as React from 'react';
import {useState} from "react";
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Tooltip,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {EventTracker, HoverState } from '@devexpress/dx-react-chart';


function Bagel(props){
    const [chartData, setChartData] = useState([]);

    React.useEffect(() => {
      console.log("chartData: ", chartData);
    }, [props.todayTask]);
   //adds task category and time to the data field everytime todayTask prop is updated
    React.useEffect(() => {
      if(props.todayTask != undefined) {
        const newData = [];
        for(let i = 0; i < props.todayTask.length; i++) {
          newData.push( {
            name: props.todayTask[i][0],
            time: props.todayTask[i][1]
          });
        }
        setChartData(newData);
      }
    }, [props.todayTask]);
    return (
      <Chart
        data={chartData}
      >
        <PieSeries
          valueField="time"
          argumentField="name"
          innerRadius={0.4}
        />

        <Title
          text={props.title}
        />

        <Legend
        position="bottom"
         />

        <EventTracker />
        <HoverState />
        <Tooltip />
      </Chart>
    );
  }
  export default Bagel

  
