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
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "./Copyright";

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";

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

export default function Register() {
  const [errorMessage, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    u_name: "invalid username",
    u_name_taken: "Sorry, that username is already taken!",
    passwords_must_match: "Passwords must match!",
    invalid_email: "Invalid Email Address!"
  };

  const handleSubmit = async function(event) {
    event.preventDefault();
    let { u_name, email, pass, pass2 } = document.forms[0];
    console.log(u_name.value);
    console.log(email.value);
    console.log(pass.value);
    console.log(pass2.value);

    // these will be used to implement field verifications
    const u_name_empty = (u_name.value === '') ? true : false;
    const email_empty = (email.value === '') ? true : false;
    const pass_empty = (pass.value === '') ? true : false;
    const pass2_empty = (pass2.value === '') ? true : false;


    //Set username and password to the backend server
    const httpResponse = await fetch(RegisterURL, {
      mode: "cors",
      method: "post",
      "Content-Type": "application/json",
      body: JSON.stringify({username: u_name.value, password: pass.value})
    });

    const responseBody = await httpResponse.json();
    console.log(responseBody);

    //This should be one of the validations we should implement at some point
    // if (pass.value !== pass2.value) {
    //   setErrorMessages({ name: "passwords_must_match", message: errors.passwords_must_match });
    // } 
    
    if (responseBody.loginAllowed === true) {
      setIsSubmitted(true);
    }
    else {
      setErrorMessages({ name: "u_name_taken", message: errors.u_name_taken });
    }
  };
  
  const renderErrorMessage = (name) =>
  name === errorMessage.name && (
    <div className="error">{errorMessage.message}</div>
  );

  const renderForm = (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          Create Your Account!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="u_name"
            //autoComplete="email"
            autoFocus
            
          />
          {renderErrorMessage("u_name_taken")}

          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
          />
          {renderErrorMessage("invalid_email")}

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

<TextField
            margin="normal"
            required
            fullWidth
            name="pass2"
            label="Confirm Password"
            type="password2"
            id="password2"
            autoComplete="password2"
          />
          {renderErrorMessage("passwords_must_match")}


          <Button
            color="primary"
            type="submit"
            fullWidth
            
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
);
return (
  <div className="Login">
    <div className="login-form">
      <div className="title"></div>
      {isSubmitted ? <div>Account successfully created!</div> : renderForm}
    </div>
  </div>
);
}
