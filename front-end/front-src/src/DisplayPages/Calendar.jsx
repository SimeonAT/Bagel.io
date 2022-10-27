// sources user:
// https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
const BackendURL = "http://localhost:8000";

const currentDate = new Date();


function Calendar(props) {
    console.log("These are the props:::");
    console.log(props.userInfo)
    const userInfo = props.userInfo;
    // let tasksToDisplay = undefined;
    // let taskDisplayList = [];
    let calendarTasks = undefined;
    let calendarData = []

    if(userInfo !== undefined) {
        calendarTasks = props.userInfo.tasks;
        for(let i = 0; i < calendarTasks.length; i++) {
            calendarData.push( {
                title: calendarTasks[i].name,
                startDate: new Date(2022, 9, 26, 14, 30),
                endDate: new Date(2022, 9, 26, 16, 0), 
                id: {i}
                //startDate: calendarTasks[i].startDate,
                //endDate: calendarTasks[i].endDate,
                //id: calendarTasks[i].id
            });
        }
        console.log("finished!!");
        console.log(calendarData);
        console.log("yeet");
    }
   let tasksToDisplay =[];
    return (
        <Paper>
            <Scheduler
            data={calendarData}
            >
        
                <ViewState
                    currentDate={currentDate}
                    />
            
                <DayView
                    startDayHour={8}
                    endDayHour={20}
                    cellDuration = {60}
                    />
                <Appointments />

            </Scheduler>
        </Paper>
    )
}

export default Calendar
