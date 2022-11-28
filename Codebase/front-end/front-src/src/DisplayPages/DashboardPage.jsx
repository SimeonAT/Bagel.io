import * as React from 'react';
import { Button, CssBaseline, Link, Box, Typography, Container, createTheme, ThemeProvider, Grid } from '@mui/material';
import Copyright from "./Copyright";
import {Navigate} from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserInfo from '../UserContext';
import Bagel from "./Bagel";
import axios from 'axios';
import {calculateTotalCompletedByTag} from '../frontendUtils';
import {CompleteButton, ButtonSection, TaskDisplay} from './Styles';
import background from '../Images/TEST.png'

const theme = createTheme( {
  palette: {
    primary: {
      light: '#d1ccdc',
      main: '#263238',
      dark: '#424c55',
      contrastText: '#fff',
    },
  },
  });

export default function Dashboard(props) {
  const userInfoProp = props.userInfo;

  const [homeView, openHome] = React.useState(false);
  const [taskListToRender, setTaskListToRender] = React.useState(undefined);

  let username = undefined;
  if (userInfoProp !== undefined) {
    username = userInfoProp.username;
  }

  let initialTaskList = undefined;
  if (userInfoProp !== undefined) {
    initialTaskList = userInfoProp.tasks;
  }

  const [taskDisplayList, setTaskDisplayList] = React.useState(initialTaskList);
  const [renderTaskList, setRenderTaskList] = React.useState(true);

  React.useEffect(() => {
    if ((taskDisplayList !== undefined) && (renderTaskList === true)) {
      setTaskListToRender(getTaskDisplayList(taskDisplayList));
      setRenderTaskList(false);
    }
    return;
  });

  //getting elements of the time task list (waiting on await so that an empty promise is not sent))
  const [todaysTasks, setTodaysTask] = React.useState([]);
  React.useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await calculateTotalCompletedByTag(username, true);
      setTodaysTask(tasks);
      
    }
    fetchTasks();
  }, [taskListToRender]);
  const [overallTasks, setOverallTask] = React.useState([]);
  React.useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await calculateTotalCompletedByTag(username, false);
      setOverallTask(tasks);
    }
    fetchTasks();
  }, [taskListToRender]);


  /**
   * Updates task in backend
   * NOTE: All fields must be present, or the back-end will give an error.
   * 
   * @param taskId : unique id for task
   * @param startDate : ISO start date string
   * @param endDate : ISO end date string
   * @param tag : string for category
   * @param complete : boolean flag whether task is marked complete
   * @param checkedIn : boolean flag whether task has been checked in, regardless of whether or not it is marked complete
   */
  const updateTask = async function(taskId, startDate, endDate, tag, complete, checkedIn) {
    // Send new task data to server
    //JSONFIX
    const httpResponse = await axios.post('http://localhost:8000/updateTask', { 
      taskId: taskId, startDate: startDate, endDate: endDate, tag: tag, complete: complete, checkedIn: checkedIn
    });
    if (httpResponse) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Constructs list of tasks that need to be checked in
   *
   * @param tasksToDisplay : list of all tasks for user
   * @return: UI block to insert into page 
   */
  const getTaskDisplayList = function (tasksToDisplay) {
    const uncheckedTasks = tasksToDisplay.filter((task) => {
      return task.checkedIn === false;
    });
    return uncheckedTasks.map((task) => {
      return (
        <Box key={task.taskid}
         sx={{
          width: 450,
          border: 4,
          boxShadow: 3,
          borderRadius: 8,
          margin: 'auto',
          mb: 2,
         }}>
          <TaskDisplay>
            <div>
              <b>Task Name:</b> {task.name}
            </div>
            <div>
              <b>Category:</b> {task.tag}
            </div>
            <div>
              <b>Start Time:</b> {new Date(task.startDate).toLocaleString()}
            </div>
            <div>
              <b>End Time:</b> {new Date(task.endDate).toLocaleString()}
            </div>
            <UserInfo.Consumer>
              {({username, password, userInfo, setUserInfo}) => {
                const buttonHandler = function ({complete}) {
                  const taskToRemove = task;
                  taskToRemove.checkedIn = true;
                  taskToRemove.complete = complete;

                  const newUserInfo = {};
                  Object.assign(newUserInfo, userInfo);
                  newUserInfo.tasks = newUserInfo.tasks.filter((task) => {
                    return task.checkedIn === false;
                  });
                  setTaskDisplayList(newUserInfo.tasks);
                  setRenderTaskList(true);
                  updateTask(task.taskid, task.startDate, task.endDate, task.tag, task.complete, task.checkedIn);
                  return;
                };

                return (
                  <div>
                    <ButtonSection>
                      <CompleteButton onClick={() => {
                        buttonHandler({ complete: true });
                      }}>
                        Finished
                      </CompleteButton>

                      <CompleteButton onClick={() => {
                        buttonHandler({ complete: false });
                      }}>
                        Incomplete
                      </CompleteButton>
                    </ButtonSection>
                  </div>
                );
              }}
            </UserInfo.Consumer>
          </TaskDisplay>
        </Box>
      );
    });
  }

  /**
   * Navigates user to home page
   *
   */
  const navigateToHome = async function(event) {
    event.preventDefault();
    openHome(true);
    return;
  }

  const renderPage = (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage:`url(${background})` }}>
        <Link href = '/home' style={{ textDecoration: 'none' }}>
          <Box textAlign='left'>
              <Button 
                color="primary"
                type="submit"
                onClick = {navigateToHome}
                sx={{ mt: 3, mb: 2, mr: 5, ml: 5,
                  pr: 7, pl: 7, 
                  border: 2,
                  fontWeight: 600,
                  fontSize: 16,
                  backgroundColor: "white" }} >
                Home
              </Button>
            </Box>
        </Link>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main">
        

          <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                >
                <UserInfo.Consumer>
                  {({username, password, userInfo}) => {
                    return (
                      <Typography component="h1" variant="h2" data-testid="title" sx={{ mb: 5, textTransform: 'capitalize' }} onClick={() => calculateTotalCompletedByTag(username, true)}>
                          {username}'s Dashboard
                      </Typography>
                    );
                  }}
                </UserInfo.Consumer>
                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                      >
                      <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
                        Check in your tasks!
                      </Typography>
                      {taskListToRender}
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                      >

                      <Typography component="h1" variant="h3">
                        Your Productivity Bagels
                      </Typography>
                      <Bagel
                        todayTask = {todaysTasks}
                        title = {"Hours Spent on Tasks Today"}
                       />
                      <Bagel
                        todayTask = {overallTasks}
                        title = {"Hours Spent on Tasks This Month"}
                       />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
);
return (
  <div className="DashboardPage">
    <div className="dashboardView">
      <UserInfo.Consumer>
        {({username, password, userInfo}) => {
          return (
            <div>
              {homeView ? (<Navigate to = "/home" />) : 
              (username === undefined ? <Navigate to = "/login" /> : renderPage)}
            </div>
          );
        }}
      </UserInfo.Consumer>
    </div>
  </div>
);
}