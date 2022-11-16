import * as React from 'react';
import {useState} from "react";
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

// const chartData = [
//   { region: 'Asia', val: 4119626293 },
//   { region: 'Africa', val: 1012956064 },
//   { region: 'Northern America', val: 344124520 },
//   { region: 'Latin America and the Caribbean', val: 590946440 },
//   { region: 'Europe', val: 727082222 },
//   { region: 'Oceania', val: 35104756 },
// ];


function Bagel(props){
    const [chartData, setChartData] = useState([]);

    React.useEffect(() => {
      console.log("initial usertasks: ", props.todayTask);
    }, []);

    React.useEffect(() => {
      console.log("chartData: ", chartData);
    }, [chartData]);

    React.useEffect(() => {
      if(props.todayTask != undefined) {
        const newData = [];
        for(let i = 0; i < props.todayTask.length; i++) {
          // console.log(theseTasks[i][0])
          // console.log(theseTasks[i][1])
          newData.push( {
            name: props.todayTask[i][0],
            time: props.todayTask[i][1]
          });
        }
        setChartData(newData);
      }
    }, [props.todayTask]);

    console.log("data:")
    console.log(chartData)
    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="time"
            argumentField="name"
            innerRadius={0.4}

          />
          <Title
            text="Time on Tasks Today"
          />
          {/* <Animation /> */}
        </Chart>
      </Paper>
    );
  }
  export default Bagel

  
