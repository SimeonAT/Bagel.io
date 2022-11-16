// sources user:
// https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
const BackendURL = "http://localhost:8000";

const currentDate = new Date()

function getNextDay(currentDate) {
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}



const Appointment = ({
    children, style, ...restProps
  }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: '#CAD58D',
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
);


function Calendar(props) {
  console.log(currentDate);
  console.log(getNextDay(currentDate))
  const [userInfo, updateUserInfo] = React.useState(props.userInfo);
  let calendarTasks = undefined;
  let calendarData = []

  if(userInfo !== undefined) {
    calendarTasks = props.userInfo.tasks;
    for(let i = 0; i < calendarTasks.length; i++) {
      calendarData.push( {
        title: calendarTasks[i].name,
        startDate: calendarTasks[i].startDate,
        endDate: calendarTasks[i].endDate, 
        id: {i}
      });
    }
  }
  return (
    <Paper>
      <Scheduler
        data={calendarData}
        height={600}
      >
        <ViewState
          defaultCurrentDate= {currentDate}
        />
    
        <DayView  
          startDayHour={0}
          endDayHour={24}
          cellDuration = {60}
        />
        <Appointments 
          appointmentComponent={Appointment}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />

      </Scheduler>
    </Paper>
  )
}

export default Calendar

