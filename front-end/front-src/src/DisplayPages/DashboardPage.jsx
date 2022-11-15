/* ---- SOURCES USED ----
   - https://developer.mozilla.org/en-US/docs/Web/API/fetch
   - https://developer.mozilla.org/en-US/docs/Web/API/Response
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
   - https://expressjs.com/en/4x/api.html#express.json
   - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/

   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
   - https://jsdoc.app/about-getting-started.html
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters

  - https://mui.com/system/spacing/#horizontal-centering
  - https://mui.com/system/spacing/#transformation
  - https://mui.com/system/spacing/
  - https://mui.com/system/getting-started/the-sx-prop/#basic-example
  - https://mui.com/system/getting-started/the-sx-prop/
  - https://mui.com/material-ui/react-text-field/#form-props
  - https://mui.com/material-ui/react-text-field/#basic-textfield
  - https://mui.com/material-ui/react-text-field/

   - https://masteringjs.io/tutorials/fundamentals/parameters
   - https://stackabuse.com/get-http-post-body-in-express-js/
   - https://www.npmjs.com/package/body-parser
   - https://dmitripavlutin.com/fetch-with-json/
   - http://expressjs.com/en/resources/middleware/body-parser.html#bodyparserjsonoptions
   - https://reactrouter.com/en/main/components/navigate
   - https://reactjs.org/docs/components-and-props.html
   - https://reactjs.org/docs/context.html

   - https://stackoverflow.com/questions/35098324/react-form-component-onsubmit-handler-not-working
   - https://stackoverflow.com/questions/51521237/onsubmit-is-not-working-in-react-js

   - https://reactjs.org/docs/state-and-lifecycle.html
   - https://reactjs.org/docs/hooks-intro.html
   - https://beta.reactjs.org/learn/updating-arrays-in-state
   - https://www.robinwieruch.de/react-update-item-in-list/
   - https://reactjs.org/docs/lists-and-keys.html
   - https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
   - https://www.robinwieruch.de/react-event-handler/
   - https://reactjs.org/docs/handling-events.html
   - https://reactjs.org/docs/refs-and-the-dom.html

   - https://styled-components.com/docs/api#primary
   - https://styled-components.com/

   - https://www.w3schools.com/css/css_font.asp
   - https://www.w3schools.com/css/css_inline-block.asp
   - https://www.w3schools.com/colors/colors_picker.asp
   - https://www.w3schools.com/colors/colors_names.asp
   - https://www.w3schools.com/css/css_positioning.asp
   - https://www.w3schools.com/cssref/pr_font_weight.asp
   - https://www.w3schools.com/css/css_margin.asp
   - https://www.w3schools.com/css/css_padding.asp
   - https://www.w3schools.com/css/css_boxmodel.as
   - https://www.w3schools.com/CSSREF/css3_pr_opacity.php
   - https://www.w3schools.com/cssref/pr_class_display.php
   - https://www.w3schools.com/html/html_forms.asp

   - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
*/
import {useState} from "react";
import {useRef} from 'react';
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "./Copyright";
import {Navigate} from "react-router-dom";
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';

import UserInfo from '../UserContext';
import styled from "styled-components";

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND*SECONDS_IN_MINUTE;

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";
const HomeURL = BackendURL + "/home";
const scheduleTaskURL = BackendURL + "/scheduleTask";
const GetTasks = BackendURL + "/getTasks";
const updateTaskURL = BackendURL + "/updateTask";

const CompleteButton = styled.button`
  font-size: 18px;
  width: 200px;
  height: 40px;
  background-color: Lavender;
`;

const ChangeButton = styled(CompleteButton)`
  display: inline;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const TaskDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 5%;
  padding-bottom: 3%;
  padding-left: 5%;
  padding-right: 5%;
`;

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

export const getTasksFromServer = async function(username) {
  const httpResponse = await fetch(GetTasks, {
    mode: "cors",
    method: "post",
    "Content-Type": "application/json",
    body: JSON.stringify({username: username})
  });
  let responseBody = await httpResponse.json();
  let taskList = responseBody.taskList;
  return taskList;
}

export const getTodayTasksFromList = function(fullTaskList) {
  const now = new Date();
  const todayTaskList = [];
  for (let i = 0; i < fullTaskList.length; i++){
    const taskDate = new Date(fullTaskList[i].startDate);
    if (now.getDay() === taskDate.getDay()) { 
      todayTaskList.push(fullTaskList[i]);
    }
  }
  return todayTaskList;
}

export default function Dashboard(props) {
  /**
   * NOTE: The userInfoProp object may be stale,
   *       as the server may update the user information
   *       after giving the front-end the "userInfoProp".
   *
   *       For the most up to date version of userInfo,
   *       user the "userInfo" context.
   */
  const userInfoProp = props.userInfo;

  let username = undefined;
  if (userInfoProp !== undefined) {
    username = userInfoProp.username;
  }

  const [homeView, openHome] = useState(false);
  let tasksToDisplay = undefined;
  let taskDisplayList = [];

  const [taskListToRender, setTaskListToRender] = useState(undefined);

  // NOTE: All fields must be present, or the back-end will give an error.
  const updateTask = async function(taskId, startDate, endDate, tag, complete, checkedIn) {
    console.log('updateTask() called: params. taskid: ' + taskId + ', startDate: ' + startDate + ', endDate: ' + endDate + ', tag: ' + tag + ', complete: ' + complete + ', checkedIn: ' + checkedIn );
    // Send new task data to server
    const httpResponse = await fetch(updateTaskURL, {
      mode: "cors",
      method: "post",
      "Content-Type": "application/json",
      body: JSON.stringify({taskId: taskId, startDate: startDate, endDate: endDate, tag: tag, complete: complete, checkedIn: checkedIn})
    });
    console.log(httpResponse);
  }

  const getTaskDisplayList = function (tasksToDisplay, setTaskListToRender) {
    const uncheckedTasks = tasksToDisplay.filter((task) => {
      return task.checkedIn === false;
    });

    return uncheckedTasks.map((task) => {
      return (
        <Box key={task.taskid} 
         component = "form"
         sx={{
          width: 450,
          border: '2px dashed grey',
          margin: 'auto',
          mb: 2,
         }}
         onSubmit = {(event) => {
          event.preventDefault();
          console.log(event);
          console.log('Changing Fields...');
         }}>
          <TaskDisplay>
              <TextField
                id = 'task-name'
                label = 'Task Name'
                variant = 'outlined'
                defaultValue = {task.name}
                sx = {{mb: 3}}
              />

              <TextField 
                  id = 'category'
                  label = 'Category'
                  variant = 'outlined'
                  defaultValue = {task.tag}
                  sx = {{mb: 3}}
                />

              <TextField 
                  id = 'start-time'
                  label = 'Start Time'
                  variant = 'outlined'
                  defaultValue = {new Date(task.startDate).toLocaleString()}
                  sx = {{mb: 3}}

                />

              <TextField
                  id = 'end-time'
                  label = 'End Time'
                  variant = 'outlined'
                  defaultValue = {new Date(task.endDate).toLocaleString()}
                  sx = {{mb: 3}}
              />

            <ChangeButton type = "submit">
              Change Fields
            </ChangeButton>
            <UserInfo.Consumer>
              {({username, password, userInfo, setUserInfo}) => {
                const buttonHandler = function ({complete}) {
                  console.log('Before click. task.complete = ' + task.complete);
                  const taskToRemove = task;
                  taskToRemove.checkedIn = true;
                  taskToRemove.complete = complete;

                  const newUserInfo = {};
                  Object.assign(newUserInfo, userInfo);
                  newUserInfo.tasks = newUserInfo.tasks.filter((task) => {
                    return task.checkedIn === false;
                  });

                  // setUserInfo(newUserInfo);
                  setTaskListToRender(undefined);
                  updateTask(task.taskid, task.startDate, task.endDate, task.tag, task.complete, task.checkedIn);
                  console.log('Updated user info');
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


  const calculateTotalCompletedByCategory = async function(calculatingOnlyToday) {
    let taskList = await getTasksFromServer(username);

    if (calculatingOnlyToday) {
      //fliter for only today's tasks
      taskList = getTodayTasksFromList(taskList);
    }

    console.log(taskList);
    const totalsList = []
    for (let i = 0; i < taskList.length; i++){
      const needToAddTaskTime = (taskList[i].complete === true && taskList[i].checkedIn === true);

      if (needToAddTaskTime) {
        const category = taskList[i].tag;
        const categoryAlreadyPresent = isCategoryInTotalList(totalsList, category);
        if (categoryAlreadyPresent) {
          //add sum
          const taskTime = calculateTaskTime(taskList[i]);
          let tagIndex = 0;
          for (let j = 0; j < totalsList.length; j++) {
            if (totalsList[j][0] === category) {
              tagIndex = j;
            }
          }
          const oldTotal = totalsList[tagIndex][1];
          const newTotal = oldTotal + taskTime;
          totalsList[tagIndex][1] = newTotal;
        } else {
          //instantiate and add sum
          const taskTime = calculateTaskTime(taskList[i]);
          console.log(taskTime);
          console.log(totalsList);
          totalsList.push([category, taskTime]);
          console.log(totalsList);
        }
      }
    }
    console.log(totalsList);
    return totalsList;
  }

  const isCategoryInTotalList = function(totalsList, tag){
    if(totalsList.length === 0) {
      return false;
    }
    for (let i = 0; i < totalsList.length; i++){
      if (totalsList[i][0] === tag) {
        return true;
      }
    }
    return false;
  }

  const calculateTaskTime = function(task){
    const startTime = new Date(task.startDate);
    const endTime = new Date(task.endDate);
    const taskLengthInHours = (endTime.getTime() - startTime.getTime()) / MILLISECONDS_IN_MINUTE;
    return taskLengthInHours;
  }

  const navigateToHome = async function(event) {
    event.preventDefault();
    openHome(true);
    return;
  }

  const renderPage = (
    <ThemeProvider theme={theme}>

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
                fontSize: 16 }} >
              Home
            </Button>
          </Box>
      </Link>

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
                      <Typography component="h1" variant="h5" onClick={() => calculateTotalCompletedByCategory(true)}>
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
                      <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                        Check in your tasks!
                      </Typography>

                      <UserInfo.Consumer>
                        {({username, password, userInfo}) => {
                          console.log('Updating Task List to Render');
                          if (taskListToRender === undefined) {
                            setTaskListToRender(getTaskDisplayList(userInfo.tasks,
                              setTaskListToRender));
                          }
                          
                          return (null);
                        }}
                      </UserInfo.Consumer>
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

                      <Typography component="h1" variant="h5">
                        Your Productivity Bagel
                      </Typography>
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
