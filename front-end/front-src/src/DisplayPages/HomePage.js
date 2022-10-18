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

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";
const HomeURL = BackendURL + "/home";

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
  const username = props.username;
  const password = props.password;
  const userInfo = props.userInfo;

  let numTasks = 3;

  const createTask = async function(event) {
    event.preventDefault();
    numTasks +=1;
    window.location.reload(false);
  }

  const taskDisplayList = [];
  for (let i = 0; i < numTasks; i++) {
    const label = "Task " + i;
    const checked = i % 2 == 0 ? true : false;
    taskDisplayList.push(<FormControlLabel control={checked ? <Checkbox defaultChecked /> : <Checkbox />} label={label} />);
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
        {renderPage}
        {console.log(userInfo)}
    </div>
  </div>
);
}
