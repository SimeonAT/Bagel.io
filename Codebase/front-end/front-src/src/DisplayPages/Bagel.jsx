import * as React from 'react';
import {useState} from "react";
import { Chart, PieSeries, Title, Tooltip, Legend } from '@devexpress/dx-react-chart-material-ui';
import {EventTracker, HoverState } from '@devexpress/dx-react-chart';
import { Palette } from '@devexpress/dx-react-chart';


function Bagel(props){
    const [chartData, setChartData] = useState([]);
    const scheme = [
      "#CAD58D", 
      "#0a5f42", 
      "#878E62",
      "#f0e9db", 
      "#464444", 
      "#c2a594",
      "#33261d",
      "#B5824D",
      "#93a197", 
      "#008080", 
      "#20b2aa", 
      "#468499",
    ];

    React.useEffect(() => {
    }, [props.todayTask]);
   //adds task category and time to the data field everytime todayTask prop is updated
    React.useEffect(() => {
      if(props.todayTask !== undefined) {
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
        <Palette scheme={scheme} />

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

  