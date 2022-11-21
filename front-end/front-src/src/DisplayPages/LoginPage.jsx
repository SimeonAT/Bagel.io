import * as React from 'react';
import { Button, CssBaseline, TextField, Link, Box, Container, Typography, createTheme, ThemeProvider } from '@mui/material';
import Copyright from "./Copyright";
import { Navigate } from "react-router-dom";
import UserInfo from '../UserContext';
import axios from 'axios';

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
  const [errorMessage, setErrorMessages] = React.useState({});
  const [loginAllowed, setLoginAllowed] = React.useState(false);

  const errors = {
    userName: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async function (event, setUsername,
    setPassword, setUserInfo) {
    event.preventDefault();
    let { userName, pass } = document.forms[0];

    //JSONFIX
    const httpResponse = await axios.post('http://localhost:8000/logindatabase', { 
	    username: userName.value, password: pass.value
    });
    const responseBody = httpResponse.data;

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
