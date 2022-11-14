import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const chartData = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 7 },
  { country: 'USA', area: 7 },
  { country: 'China', area: 7 },
  { country: 'Brazil', area: 6 },
  { country: 'Australia', area: 5 },
  { country: 'India', area: 2 },
  { country: 'Others', area: 55 },
];
//export default class Bagel extends React.PureComponent {
function Bagel(){
    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="area"
            argumentField="country"
            innerRadius={0.4}

          />
          <Title
            text="Area of Countries"
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
  export default Bagel

  
