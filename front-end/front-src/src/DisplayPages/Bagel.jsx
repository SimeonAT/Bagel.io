import * as React from 'react';
import {useState} from "react";
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
//API from https://devexpress.github.io/devextreme-reactive/react/chart/docs/reference/pie-series/

function Bagel(props){
    const [chartData, setChartData] = useState([]);

    React.useEffect(() => {
    }, [chartData]);
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
          {/* For some reason this animation statement is causing a lot of errors in the code */}
          {/* <Animation /> */}
        </Chart>
      </Paper>
    );
  }
  export default Bagel

  
