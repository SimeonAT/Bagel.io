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

   - https://stackoverflow.com/questions/35098324/react-form-component-onsubmit-handler-not-working
   - https://stackoverflow.com/questions/51521237/onsubmit-is-not-working-in-react-js
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
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";
const HomeURL = BackendURL + "/home";
const scheduleTaskURL = BackendURL + "/scheduleTask";
const GetTasks = BackendURL + "/getTasks";

const theme = createTheme( {
  palette: {
    primary: {
      light: '#d1ccdc',
      main: '##886f68',
      dark: '#424c55',
      contrastText: '#fff',
    },
  },
  });

export default function Home(props) {
  console.log(props);

  const username = props.username;
  const password = props.password;
  const userInfo = props.userInfo;

  let tasksToDisplay = undefined;
  let taskDisplayList = [];

  if (userInfo !== undefined) {
    tasksToDisplay = props.userInfo.tasks;
  
    for (let i = 0; i < tasksToDisplay.length; i++) {
      const label = tasksToDisplay[i].name;
      const complete = tasksToDisplay[i].complete;
      taskDisplayList.push(
        <FormControlLabel 
          sx={{ ml: 7, mr: 7 }}
          control={complete ? <Checkbox defaultChecked /> : <Checkbox />} 
          label={label}
          key = {i}
           />
      );
    }
  }

  const [startValue, setStartValue] = React.useState(
    dayjs()
  );

  const handleStartChange = (newValue) => {
    setStartValue(newValue);
  };

  const [endValue, setEndValue] = React.useState(
    dayjs(dayjs()+1)
  );

  const handleEndChange = (newValue) => {
    setEndValue(newValue);
  };
  
  const taskNameRef = useRef('');
  const taskStartRef = useRef('');
  const taskEndRef = useRef('');
  const categoryRef = useRef('');


  const createTask = async function(event) {
    event.preventDefault();

    //Set username and password to the backend server
    const httpResponse = await fetch(scheduleTaskURL, {
      mode: "cors",
      method: "post",
      "Content-Type": "application/json",
      body: JSON.stringify({
        username: username,
        taskName: taskNameRef.current.value,
        startDate: taskStartRef.current.value,
        endDate: taskEndRef.current.value,
        tag: categoryRef.current.value
      })
    });

    const responseBody = await httpResponse.json();
    console.log(responseBody);

  };


  const renderPage = (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main">
          <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >

              <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                Welcome {username}! 
              </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                          id="taskName"
                          label="Task Name"
                          name="taskName"
                          autoFocus
                        />

                        <TextField
                          inputRef={categoryRef}
                          margin="normal"
                          required
                          fullWidth
                          name="category"
                          label="Category"
                          id="category"
                          sx={{ mb: 3 }}
                        />
                        
                        <Stack spacing={3}>
                          <DateTimePicker
                            renderInput={(params) => <TextField {...params} 
                            inputRef={taskStartRef}
                            />}
                            margin="normal"
                            required
                            fullWidth
                            name="startDate"
                            label="Start Date/Time"
                            id="startDate"
                            value={startValue}
                            onChange={handleStartChange}
                          />

                          <DateTimePicker
                            renderInput={(params) => <TextField {...params} 
                            inputRef={taskEndRef}
                            />}
                            margin="normal"
                            required
                            fullWidth
                            name="endDate"
                            label="End Date/Time"
                            id="endDate"
                            value={endValue}
                            onChange={handleEndChange}
                          />
                        </Stack>

                        <Button
                          color="primary"
                          type="submit"
                          fullWidth
                          variant="outlined"
                          onClick={createTask}
                          sx={{ mt: 3, mb: 2 }}
                          >
                          Add Task
                        </Button>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box label="see-task-list-column"
                      sx={{
                        width: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                     >
                      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                        Today's Tasks
                      </Typography>

                      <FormGroup sx={{ width:1 }}>
                        {taskDisplayList}
                      </FormGroup>

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
  <div className="HomePage">
    <div className="taskView">
        {username === undefined ? <Navigate to = "/login" /> :
         renderPage}
    </div>
  </div>
);
}
