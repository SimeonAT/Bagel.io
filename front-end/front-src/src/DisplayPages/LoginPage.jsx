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
   - https://v5.reactrouter.com/web/guides/quick-start/2nd-example-nested-routing
   - https://v5.reactrouter.com/web/api/Redirect
   - https://v5.reactrouter.com/web/example/auth-workflow
   - https://bobbyhadz.com/blog/react-export-redirect-was-not-found-in-react-router-dom
   - https://reactrouter.com/en/main/components/navigate
   - https://reactjs.org/docs/components-and-props.html

   - https://mui.com/material-ui/react-box/
   - https://mui.com/material-ui/api/form-control/
*/
import { useState } from "react";
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "./Copyright";
import Home from './HomePage';
import { Navigate } from "react-router-dom";

import UserInfo from '../UserContext';

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";

const theme = createTheme({
  palette: {
    primary: {
      light: '#d1ccdc',
      main: '#263238',
      dark: '#424c55',
      contrastText: '#fff',
    },
  },
});

export default function SignIn(props) {
  const [errorMessage, setErrorMessages] = useState({});
  const [loginAllowed, setLoginAllowed] = useState(false);

  const errors = {
    userName: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async function (event, setUsername,
    setPassword, setUserInfo) {
    event.preventDefault();
    let { userName, pass } = document.forms[0];

    // Set username and password to the backend server
    const httpResponse = await fetch(LoginURL, {
      mode: "cors",
      method: "post",
      "Content-Type": "application/json",
      body: JSON.stringify({ username: userName.value, password: pass.value })
    });

    const responseBody = await httpResponse.json();

    if (responseBody.loginAllowed === true) {
      setLoginAllowed(true);
      setUsername(userName.value);
      setPassword(pass.value);
      setUserInfo(responseBody.payload);
    }
    else {
      setErrorMessages({ name: "pass", message: errors.pass });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessage.name && (
      <div className="error">{errorMessage.message}</div>
    );

  const renderForm = (
    <ThemeProvider theme={theme}>
      <Link href='/' style={{ textDecoration: 'none' }}>
        <Box textAlign='left'>
          <Button
            color="primary"
            type="submit"
            sx={{
              mt: 3, mb: 2, mr: 5, ml: 5,
              pr: 7, pl: 7,
              border: 2,
              fontWeight: 600,
              fontSize: 16
            }} >
            Home
          </Button>
        </Box>
      </Link>

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <UserInfo.Consumer>
            {(userInfo) => {
              return (
                <Box component="form" onSubmit={(event) => {
                  handleSubmit(event, userInfo.setUsername,
                    userInfo.setPassword, userInfo.setUserInfo);
                }} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="userName"
                    autoFocus
                  />
                  {renderErrorMessage("userName")}

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="pass"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {renderErrorMessage("pass")}

                  <Box textAlign='center'>
                    <Button
                      color="primary"
                      type="submit"
                      variant="outlined"
                      sx={{
                        mt: 3, mb: 2,
                        pr: 7, pl: 7,
                        border: 2,
                      }}>
                      Sign In
                    </Button>
                  </Box>

                </Box>
              );
            }}
          </UserInfo.Consumer>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );

  return (
    <div className="Login">
      <div className="login-form">
        {loginAllowed ? (<Navigate to="/home" />) : renderForm}
      </div>
    </div>
  );
}
