/* ---- SOURCES USED ----
   - https://developer.mozilla.org/en-US/docs/Web/API/fetch
   - https://developer.mozilla.org/en-US/docs/Web/API/Response
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
   - https://expressjs.com/en/4x/api.html#express.json
   - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/

   - https://stackabuse.com/get-http-post-body-in-express-js/
   - https://www.npmjs.com/package/body-parser
   - https://dmitripavlutin.com/fetch-with-json/
   - http://expressjs.com/en/resources/middleware/body-parser.html#bodyparserjsonoptions
   - https://reactrouter.com/en/main/components/navigate
   - https://reactjs.org/docs/components-and-props.html
   - https://reactjs.org/docs/context.html

   - https://reactjs.org/docs/state-and-lifecycle.html
   - https://reactjs.org/docs/hooks-intro.html
   - https://beta.reactjs.org/learn/updating-arrays-in-state
   - https://www.robinwieruch.de/react-update-item-in-list/
   - https://reactjs.org/docs/lists-and-keys.html
   - https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/

   - https://stackoverflow.com/questions/35098324/react-form-component-onsubmit-handler-not-working
   - https://stackoverflow.com/questions/51521237/onsubmit-is-not-working-in-react-js
   - https://stackoverflow.com/questions/69128531/react-to-do-list-not-updating
   - https://stackoverflow.com/questions/71790680/react-not-rendering-list-after-the-state-is-changed
*/
import {useState} from "react";
import {useRef} from 'react';
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
import { Button, TextField, Link, Box, Container, Typography} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
//import { Checkbox, FormGroup, FormControlLabel} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, Grid } from '@mui/material';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import Copyright from "./Copyright";
import Calendar from "./Calendar";
import UserInfo from '../UserContext';
import {getTasksFromServer, getTodayTasksFromList} from './DashboardPage';
import {validateDateFieldFormat} from '../frontendUtils';

import axios from 'axios';

const BackendURL = "http://localhost:8000";
const scheduleTaskURL = BackendURL + "/scheduleTask";


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

export default function Home(props) {
  const userInfoProp = props.userInfo;
  const [dashboardView, openDashboard] = useState(false);

  const [tag, setTag] = React.useState('');
  const [overlapingTimeErrorMessage, setOverlapingTimeErrorMessage] = React.useState("");
  const [overlapingTimeSuggestion, setOverlapingTimeSuggestion] = React.useState("");

  const [isTaskNameInvalid, setIsTaskNameInvalid] = React.useState(false);
  const [isCategoryInvalid, setIsCategoryInvalid] = React.useState(false);
  const [currentStartTimeError, setCurrentStartTimeError] = React.useState(null);
  const [errorStartDate, setStartTimeErrorDate] = React.useState(false);
  const [currentEndTimeError, setCurrentEndTimeError] = React.useState(null);
  const [errorEndDate, setEndTimeErrorDate] = React.useState(false);

  const [startDateWithNoInitialValue, setStartDateWithNoInitialValue] = React.useState(null);
  const [endDateWithNoInitialValue, setEndDateWithNoInitialValue] = React.useState(null);

  const [isStartDateOpen, setIsStartDateOpen] = React.useState(false);
  const [anchorElStartDate, setAnchorElStartDate] = React.useState(null);
  const [isEndDateOpen, setIsEndDateOpen] = React.useState(false);
  const [anchorElEndDate, setAnchorElEndDate] = React.useState(null);

  const taskNameRef = useRef('');
  const taskStartRef = useRef('');
  const taskEndRef = useRef('');
  const categoryManualInputRef = useRef('');
  const categoryDropdownInputRef = useRef('');
  
  const handleTagDropdownChange = (event) => {
    setTag(event.target.value);
  };

  const handleStartDateAnchoring = (event) => {
    setIsStartDateOpen((isOpen) => !isOpen);
    setAnchorElStartDate(event.currentTarget);
  }

  const handleEndDateAnchoring = (event) => {
    setIsEndDateOpen((isOpen) => !isOpen);
    setAnchorElEndDate(event.currentTarget);
  }

  const validateRequiredTaskFields = values => {
    // verify that task name is not blank
    if (values.taskName !== "") {
      setIsTaskNameInvalid(false);
    } else {
      setIsTaskNameInvalid(true);
    }

    const isValidStartTime = validateDateFieldFormat(values.startTime);
    if (isValidStartTime) {
      setCurrentStartTimeError(null);
      setStartTimeErrorDate(false);
    } else {
      setCurrentStartTimeError('Please enter valid date in format MM/DD/YYYY TT:TT XM');
      setStartTimeErrorDate(true);
    }

    const isValidEndTime = validateDateFieldFormat(values.endTime);
    if (isValidEndTime) {
      setCurrentEndTimeError(null);
      setEndTimeErrorDate(false);
    } else {
      setCurrentEndTimeError('Please enter valid date in format MM/DD/YYYY TT:TT XM');
      setEndTimeErrorDate(true);
    }

    if (values.tag !== "") {
      setIsCategoryInvalid(false);
    } else {
      setIsCategoryInvalid(true);
    }

  };

  const createTask = async function(event, userInfo, setUserInfo) {
    event.preventDefault();
    const taskCategoryToRecord = categoryManualInputRef.current.value != '' ? categoryManualInputRef.current.value : categoryDropdownInputRef.current.value;
    validateRequiredTaskFields({taskName: taskNameRef.current.value, startTime: taskStartRef.current.value,
                                endTime: taskEndRef.current.value, tag: taskCategoryToRecord});

    // NOTE: must convert dates to ISO strings on front end to make this happend on the users local machine
    let taskStartISO = new Date(taskStartRef.current.value).toISOString();
    let taskEndISO = new Date(taskEndRef.current.value).toISOString();

    const isInvalidTask = await newTaskOverlapsExistingTask(taskStartISO, userInfo);

    if (isInvalidTask) {
      setOverlapingTimeErrorMessage("The task time you entered overlaps with an existing task!");
      setOverlapingTimeSuggestion("Please enter a unique task time!");
      setEndDateWithNoInitialValue(null);
      setStartDateWithNoInitialValue(null);
      taskStartRef.current.value = '';
      taskEndRef.current.value = '';
      return;
    }

    // // Send task to backend for creation
    // const httpResponse = await fetch(scheduleTaskURL, {
    //   mode: "cors",
    //   method: "post",
    //   "Content-Type": "application/json",
    //   body: JSON.stringify({
    //     username: userInfo.username,
    //     taskName: taskNameRef.current.value,
    //     startDate: taskStartISO,
    //     endDate: taskEndISO,
    //     tag: taskCategoryToRecord
    //   })
    // });
    // if (!httpResponse.ok) {
    //   return;
    // }
    // let responseBody = await httpResponse.json();

    //JSONFIX
    const httpResponse = await axios.post('http://localhost:8000/scheduleTask', { 
      username: userInfo.username,
      taskName: taskNameRef.current.value,
      startDate: taskStartISO,
      endDate: taskEndISO,
      tag: taskCategoryToRecord
    });
    const responseBody = httpResponse.data;
    // console.log(`typeof(responseBody): ${typeof(responseBody)}`);
    // console.log(`responseBody: ${JSON.stringify(responseBody)}`);

    // Update the front end's userInfo task list with the new task.
     const newUserInfo = userInfo;
     newUserInfo.tasks.push(responseBody);
     setUserInfo(newUserInfo);

    resetFormValues(taskNameRef, categoryManualInputRef, categoryDropdownInputRef);
    setOverlapingTimeErrorMessage('');
    setOverlapingTimeSuggestion('');

  };

  const newTaskOverlapsExistingTask = async function(taskStartISO, userInfo) {
    const currentTaskStartTime = new Date(taskStartISO).getTime();
    const existingTaskList = await getTasksFromServer(userInfo.username);
    const existingTodayTasks = getTodayTasksFromList(existingTaskList);
    for (let i = 0; i < existingTodayTasks.length; i++){
      const existingTaskStartTime = new Date(existingTodayTasks[i].startDate).getTime();
      const existingTaskEndTime = new Date(existingTodayTasks[i].endDate).getTime();
      if (startTimeOverlapsExisting(currentTaskStartTime, existingTaskStartTime, existingTaskEndTime)) {
        return true;
      }
    }
    return false;
  }

  const startTimeOverlapsExisting = function(currentTaskStartTime, existingTaskStartTime, existingTaskEndTime){
    if (currentTaskStartTime >= existingTaskStartTime && currentTaskStartTime <= existingTaskEndTime) {
      return true;
    } else {
      return false;
    }
  }

  const resetFormValues = async function(taskNameRef, categoryManualInputRef, categoryDropdownInputRef){
    taskNameRef.current.value = '';
    categoryManualInputRef.current.value = '';
    categoryDropdownInputRef.current.value = '';
    setEndDateWithNoInitialValue(null);
    setStartDateWithNoInitialValue(null);
    taskStartRef.current.value = '';
    taskEndRef.current.value = '';
  }

  const navigateToDashboard = async function(event) {
    event.preventDefault();
    openDashboard(true);
    return;
  }

  const renderPage = (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Link href = '/' style={{ textDecoration: 'none' }}>
          <Box textAlign='left'>
              <Button 
                color="primary"
                type="submit"
                sx={{ mt: 3, mb: 2, mr: 5, ml: 5,
                  pr: 7, pl: 7, 
                  border: 2,
                  fontWeight: 600,
                  fontSize: 16 }}>
                Logout
              </Button>
            </Box>
        </Link>

        <Container component="main">
          <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
              <UserInfo.Consumer>
                {(userInfo) => {
                  return (
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                      Welcome {userInfo.username}!
                    </Typography>
                  );
                }}
              </UserInfo.Consumer>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box label="calendar-column"
                        sx={{
                          width: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                        >
                          <Typography component="h1" variant="h5">
                            Today's Tasks
                          </Typography>

                          <UserInfo.Consumer>
                          {(userInfo) => {
                            return (<Calendar userInfo = {userInfo.userInfo} />);
                          }}
                          </UserInfo.Consumer>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                <UserInfo.Consumer>
                  {(userInfo) => {
                    return (
                      <Box label="create-task-column"
                        sx={{
                          width: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >

                        <Typography component="h1" variant="h5">
                          Add New Task
                        </Typography>

                        <Box noValidate sx={{ mt: 1 }}>
                          <TextField
                            inputRef={taskNameRef}
                            margin="normal"
                            required
                            fullWidth
                            error={isTaskNameInvalid}
                            helperText={isTaskNameInvalid && "Task Name is required"}
                            id="taskName"
                            label="Task Name"
                            name="taskName"
                            autoFocus
                            sx={{ mb: 3 }}
                          />

                          <Stack width={500} margin="normal" spacing={3} sx={{ mb: 3 }}>
                            <DateTimePicker
                              onError={(reason, value) => {
                                if (reason) {
                                  setCurrentStartTimeError('Please enter valid date in format MM/DD/YYYY TT:TT XM');
                                  setStartTimeErrorDate(true);
                                } else {
                                  setCurrentStartTimeError(null);
                                  setStartTimeErrorDate(false);
                                }
                              }}
                              renderInput={(params) => <TextField {...params}
                                onClick={handleStartDateAnchoring}
                                error={errorStartDate}
                                helperText={currentStartTimeError ?? currentStartTimeError}
                                inputRef={taskStartRef}
                              />}
                              margin="normal"
                              required
                              fullWidth
                              name="startDate"
                              label="Start Date/Time *"
                              id="startDate"
                              value={startDateWithNoInitialValue}
                              onChange={(newValue) => setStartDateWithNoInitialValue(newValue)}
                              clearable
                              open={isStartDateOpen}
                              onClose={() => setIsStartDateOpen(false)}
                              PopperProps={{
                                placement: "bottom-end",
                                anchorEl: anchorElStartDate
                              }}                            
                            />

                            <DateTimePicker
                              onError={(reason, value) => {
                                if (reason) {
                                  setCurrentEndTimeError('Please enter valid date in format MM/DD/YYYY TT:TT XM');
                                  setEndTimeErrorDate(true);
                                } else {
                                  setCurrentEndTimeError(null);
                                  setEndTimeErrorDate(false);
                                }
                              }}
                              renderInput={(params) => <TextField {...params}
                                onClick={handleEndDateAnchoring}
                                inputRef={taskEndRef}
                                error={errorEndDate}
                                helperText={currentEndTimeError ?? currentEndTimeError}
                              />}
                              margin="normal"
                              required
                              fullWidth
                              name="endDate"
                              label="End Date/Time *"
                              id="endDate"
                              value={endDateWithNoInitialValue}
                              onChange={(newValue) => setEndDateWithNoInitialValue(newValue)}
                              clearable
                              open={isEndDateOpen}
                              onClose={() => setIsEndDateOpen(false)}
                              PopperProps={{
                                placement: "bottom-end",
                                anchorEl: anchorElEndDate
                              }}  
                            />
                          </Stack>

                          <FormControl fullWidth
                          error={isCategoryInvalid}
                          helperText={isCategoryInvalid && "Category Name is required"} >
                            <InputLabel id="demo-simple-select-label">Select a Category</InputLabel>
                            <Select
                              inputRef={categoryDropdownInputRef}
                              id="select-a-category"
                              value={tag}
                              label="Select a Category"
                              onChange={handleTagDropdownChange}
                            >
                              <MenuItem value='Work'>Work</MenuItem>
                              <MenuItem value='Study'>Study</MenuItem>
                              <MenuItem value='Exercise'>Exercise</MenuItem>
                              <MenuItem value='Chores'>Chores</MenuItem>
                              <MenuItem value='Socialization'>Socialization</MenuItem>
                              <MenuItem value='Hobbies'>Hobbies</MenuItem>
                              <MenuItem value='Rest'>Rest</MenuItem>
                              <MenuItem value='Nourishment'>Nourishment</MenuItem>
                              <MenuItem value='Relaxation'>Relaxation</MenuItem>
                            </Select>
                          </FormControl>

                          <Typography align="center">-or-</Typography>

                          <TextField 
                            inputRef={categoryManualInputRef}
                            error={isCategoryInvalid}
                            helperText={isCategoryInvalid && "Please enter a category or select one from above!"}
                            margin="normal"
                            fullWidth
                            name="category"
                            label="Create your own Category"
                            id="category"
                            sx={{ mt: 0, mb: 3 }}
                          />

                          <Box textAlign='center'>
                            <Button
                              color="primary"
                              type="submit"
                              variant="outlined"
                              onClick={(event) => {
                                createTask(event, userInfo.userInfo,
                                  userInfo.setUserInfo);
                              }}
                              sx={{
                                mt: 3, mb: 2,
                                pr: 7, pl: 7,
                                border: 2
                              }}
                            >
                              Add Task
                            </Button>
                            {overlapingTimeErrorMessage && <Typography style={{color: 'red'}} className="error"> {overlapingTimeErrorMessage} </Typography>}
                            {overlapingTimeSuggestion && <Typography style={{color: 'red'}} className="error"> {overlapingTimeSuggestion} </Typography>}
                          </Box>
                        </Box>
                      </Box>
                    );
                  }}
                </UserInfo.Consumer>

                  </Grid>
                </Grid>

                <Box>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      variant="outlined"
                      onClick = {navigateToDashboard}
                      sx={{ mt: 6, mb: 2,
                        pr: 5, pl: 5,
                        border: 2, 
                        fontSize: 22,
                       }}
                      >
                      Go To Dashboard
                    </Button>
                </Box>

          </Box>         

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </LocalizationProvider>
  </ThemeProvider>
);
return (
  <div className="HomePage">
    <div className="taskView">
    <UserInfo.Consumer>
      {(userInfo) => {
        if (userInfo.username === undefined) {
          return (<Navigate to = "/login" />);
        } else if (dashboardView) {
          return (<Navigate to = "/dashboard" />);
        }
        return renderPage;
      }}
    </UserInfo.Consumer>
    </div>
  </div>
);
}