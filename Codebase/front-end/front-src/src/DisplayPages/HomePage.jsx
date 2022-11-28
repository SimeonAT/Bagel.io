import * as React from 'react';
import { Button, TextField, Link, Box, Container, Typography, CssBaseline, createTheme, ThemeProvider, Stack, Grid, Select, FormControl, MenuItem, InputLabel  } from '@mui/material';
import { Navigate } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Copyright from "./Copyright";
import Calendar from "./Calendar";
import UserInfo from '../UserContext';
import {validateDateFieldFormat, newTaskOverlapsExistingTask} from '../frontendUtils';
import axios from 'axios';
import background from '../Images/TEST.png'


const theme = createTheme( {
  palette: {
    primary: {
      light: '#d1ccdc',
      main: '#263238',
      dark: '#424c55',
      contrastText: '#fff',
    },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
  },
  });

export default function Home(props) {
  const [dashboardView, openDashboard] = React.useState(false);

  const [tag, setTag] = React.useState('');
  const [overlapingTimeErrorMessage, setOverlapingTimeErrorMessage] = React.useState("");
  const [overlapingTimeSuggestion, setOverlapingTimeSuggestion] = React.useState("");

  const [isTaskNameInvalid, setIsTaskNameInvalid] = React.useState(false);
  const [isTagInvalid, setIsTagInvalid] = React.useState(false);
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

  const taskNameRef = React.useRef('');
  const taskStartRef = React.useRef('');
  const taskEndRef = React.useRef('');
  const tagManualInputRef = React.useRef('');
  const tagDropdownInputRef = React.useRef('');
  
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

  /**
   * Checks to see if all fields are valid for creating task
   *
   * @param values : the input from the fields
   */
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
      setIsTagInvalid(false);
    } else {
      setIsTagInvalid(true);
    }

  };

  /**
   * Creates task in backend
   *
   * @param userInfo : user info with name ect for calling server functions
   * @param setUserInfo : function to update user info state
   */
  const createTask = async function(event, userInfo, setUserInfo) {
    event.preventDefault();
    const taskTagToRecord = tagManualInputRef.current.value !== '' ? tagManualInputRef.current.value : tagDropdownInputRef.current.value;
    validateRequiredTaskFields({taskName: taskNameRef.current.value, startTime: taskStartRef.current.value,
                                endTime: taskEndRef.current.value, tag: taskTagToRecord});

    // NOTE: must convert dates to ISO strings on front end to make this happend on the users local machine
    if ((taskStartRef.current.value === "") || (taskEndRef.current.value === "")) {
        // The user has not entered any times. Do not create the task,
        // and tell the user about this error.
        return;
    }
    let startDateObject = new Date(taskStartRef.current.value);
    let endDateObject = new Date(taskEndRef.current.value);
    let taskStartISO = startDateObject.toISOString();
    let taskEndISO = endDateObject.toISOString();

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

    if (taskNameRef.current.value.length > 32) {
      setOverlapingTimeErrorMessage('The task name is too long.');
      setOverlapingTimeSuggestion('Please enter a task name that is 32 characters or less.');
      return;
    }
    if (taskTagToRecord.length > 32) {
      setOverlapingTimeErrorMessage('The task tag is too long.');
      setOverlapingTimeSuggestion('Please enter a task tag that is 32 characters or less.');
      return;
    }

    if (startDateObject.valueOf() > endDateObject.valueOf()) {
      setOverlapingTimeErrorMessage('The end time you entered is before the start time.');
      setOverlapingTimeSuggestion('Please enter valid dates!');
      return;
    }

    //JSONFIX
    const httpResponse = await axios.post('http://localhost:8000/scheduleTask', { 
      username: userInfo.username,
      taskName: taskNameRef.current.value,
      startDate: taskStartISO,
      endDate: taskEndISO,
      tag: taskTagToRecord
    });
    const responseBody = httpResponse.data;

    // Update the front end's userInfo task list with the new task.
     const newUserInfo = userInfo;
     newUserInfo.tasks.push(responseBody);
     setUserInfo(newUserInfo);

    resetFormValues(taskNameRef, tagManualInputRef, tagDropdownInputRef);
    setOverlapingTimeErrorMessage('');
    setOverlapingTimeSuggestion('');

  };

  /**
   * Resets form values to prepare for next task creation
   *
   * @param taskNameRef : pointer to ref of name field
   * @param tagManualInputRef : pointer to ref of manual input of category field
   * @param tagDropdownInputRef: pointer to ref of dropdown input of category field
   */
  const resetFormValues = async function(taskNameRef, tagManualInputRef, tagDropdownInputRef){
    taskNameRef.current.value = '';
    tagManualInputRef.current.value = '';
    tagDropdownInputRef.current.value = '';
    setEndDateWithNoInitialValue(null);
    setStartDateWithNoInitialValue(null);
    taskStartRef.current.value = '';
    taskEndRef.current.value = '';

    // The drop-down menu is dependent on the "tag" state, not
    // on the "tagDropdownInputRef". If we reset the "tag" state,
    // then the drop-down menu resets.
    //
    setTag('');
  }

  /**
   * Navigates user to dashboard page
   *
   */
  const navigateToDashboard = async function(event) {
    event.preventDefault();
    openDashboard(true);
    return;
  }

  const renderPage = (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ backgroundImage:`url(${background})` }}>
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
        </div>
        
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
                    <Typography component="h1" variant="h2" align="center" sx={{ mb: 3, textTransform: 'capitalize' }}>
                      Welcome {userInfo.username}!
                    </Typography>
                  );
                }}
              </UserInfo.Consumer>
              <Box textAlign='center'>
          <Button
            color="primary"
            type="submit"
            //fullWidth
            variant="outlined"
            onClick = {navigateToDashboard}
            sx={{ mt: 0, m0: 2, mr: 5, ml: 5,
              pr: 7, pl: 7, 
              border: 2,
              fontWeight: 600,
              fontSize: 16,
              backgroundColor: "white" }}>
            
            Go To Dashboard
          </Button>
        </Box>


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
                          <Typography component="h1" variant="h2" sx={{ 
                            mt: 3, mb: 5, mr: 5, ml: 5,
                            pr: 7, pl: 7, 
                             }}>
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
                              mt: 7, mb: 5, mr: 5, ml: 5,
                              width: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              border: 4,
                              boxShadow: 3,
                              borderRadius: 8,
                            }}
                          >

                            <Typography component="h1" variant="h3" sx={{
                              mt: 5, mb: 5, mr: 5, ml: 5,
                              }}>
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

                              {/** --- FIXME ---
                                   The "helperText" warning is beign caused
                                   by the FormControl helperText.

                                   Ask Team:
                                    Is it okay to remove this line:
                                    helperText={isTagInvalid && "Category Name is required"}

                                    The "Category Name is required" string will never appear,
                                    even when the line is in the code.
                               */}
                              <FormControl fullWidth
                              error={isTagInvalid}>
                                <InputLabel id="demo-simple-select-label">Select a Category</InputLabel>
                                <Select
                                  inputRef={tagDropdownInputRef}
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
                                inputRef={tagManualInputRef}
                                error={isTagInvalid}
                                helperText={isTagInvalid && "Please enter a category or select one from above!"}
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