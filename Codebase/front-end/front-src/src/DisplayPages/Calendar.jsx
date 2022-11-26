import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, Appointments, Toolbar, DateNavigator, TodayButton } from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = new Date()

//sets the color for the appointments (the scheduled tasks)
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

//Sends data to Calendar and populates 
function Calendar(props) {
  let userInfo = props.userInfo;
  let calendarTasks = undefined;
  let calendarData = []

  if(userInfo !== undefined) {
    calendarTasks = props.userInfo.tasks;
    for(let i = 0; i < calendarTasks.length; i++) {
      calendarData.push( {
        title: calendarTasks[i].name,
        startDate: calendarTasks[i].startDate,
        endDate: calendarTasks[i].endDate, 
        id: calendarTasks[i].taskid
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

