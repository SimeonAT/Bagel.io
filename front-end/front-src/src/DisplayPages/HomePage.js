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

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";
const HomeURL = BackendURL + "/home";
const scheduleTaskURL = BackendURL + "/scheduletask";
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
          control={complete ? <Checkbox defaultChecked /> : <Checkbox />} 
          label={label} />
      );
    }
  }
  
  const createTask = async function(event) {
    console.log("Hello world!");
    event.preventDefault();
    window.location.reload(false);

    const tasksPayload = await fetch(scheduleTaskURL, {
      method: "post",
      mode: "cors",
      "Content-Type": "application/json",
      body: JSON.stringify({
        username: username
      })
    });

    tasksPayload = JSON.parse(tasksPayload);
  }

  const renderPage = (
    <ThemeProvider theme={theme}>
    <Container component="main">
      <CssBaseline />
      
      <TableRow label="title-row"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography component="h1" variant="h4" align="center">
          Welcome {username}! 
        </Typography>
      </TableRow>

      <TableRow label="task-row"
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left'
        }}
      >
        <Box label="create-task-column"
          sx={{
            marginTop: 8,
            marginRight: 12,
            marginLeft: 12,
            width: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add New Task
          </Typography>

          <Box component="form" onSubmit={createTask} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="taskName"
              label="Task Name"
              name="taskName"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Date"
              id="taskDate"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="startTime"
              label="Start Time"
              id="startTime"
              autoComplete="current-password"
            />

            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Task
            </Button>

          </Box>
        </Box>

        <Box label="see-task-list-column"
          sx={{
            marginTop: 8,
            marginLeft: 12,
            marginRight: 12,
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
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
            <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
          </FormGroup>

        </Box>
      </TableRow>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
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
