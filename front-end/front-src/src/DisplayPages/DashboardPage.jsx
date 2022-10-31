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

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";
const HomeURL = BackendURL + "/home";
const scheduleTaskURL = BackendURL + "/scheduleTask";
const GetTasks = BackendURL + "/getTasks";
const checkInTask = BackendURL + "/checkInTask";

const CompleteButton = styled.button`
  font-size: 18px;
  width: 200px;
  height: 40px;
  margin-left: 15%;
  background-color: Lavender;
`;

const TaskDisplay = styled.div`
  padding-top: 3%;
  padding-left: 10%;
  padding-right: 10%;
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

/** Given the lists of task objects, returns the
 *  JSX that will render a list of boxes, which each box
 *  representing each task.
 *
 * @param {array} tasksToDisplay - the list of tasks to display 
 * @returns {array} taskDisplayList - the JSX array that will
 *                                    render each task as a box in
 *                                    the webpage
 */
function getTaskDisplayList(tasksToDisplay,
  getUserInfoFromServer) {
  return tasksToDisplay.map((task) => {
    console.log(task);
    return (
      <Box key = {task.taskid} sx={{
        width: 450,
        border: '2px dashed grey',
        margin: 'auto',
        mb: 2,
        '&:hover': {
          backgroundColor: 'blue',
          opacity: [0.5, 0.5, 0.5],},
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
            <CompleteButton onClick = {() => {
              /**
                My idea so far:
                  1. When the user clicks <CompleteButton>, Main.jsx
                     will run a function that will tell the server to
                     remove the desired task, and to get the new list
                     of tasks from the HTTP server.
                  2. Main.jsx will save its new lists of task in its
                     "userInfo" context variable.
                  3. Since "userInfo" context variable is updated,
                     the Dashboard will update automatically, as it is
                     a context consumer of userInfo.
               */
              getUserInfoFromServer();
              return;
            }}>
              I completed this task
            </CompleteButton>
          </TaskDisplay>
      </Box>
    );
  });
}

export default function Dashboard(props) {
  const [homeView, openHome] = useState(false);
  let tasksToDisplay = undefined;
  let taskDisplayList = [];

  const updateTask = async function(event, taskId, startDate, endDate, tag, complete) {
    event.preventDefault();
    // Send new task data to server
    const httpResponse = await fetch(RegisterURL, {
      mode: "cors",
      method: "post",
      "Content-Type": "application/json",
      body: JSON.stringify({taskId: taskId, startDate: startDate, endDate: endDate, tag: tag, complete: complete})
    });
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
                      <Typography component="h1" variant="h5">
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
                        Check in your completed tasks!
                      </Typography>

                      <UserInfo.Consumer>
                        {({username, password, userInfo, getUserInfoFromServer}) => {
                          tasksToDisplay = userInfo.tasks;
                          taskDisplayList = getTaskDisplayList(tasksToDisplay,
                            getUserInfoFromServer);
                          return (taskDisplayList);
                        }}
                      </UserInfo.Consumer>
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
