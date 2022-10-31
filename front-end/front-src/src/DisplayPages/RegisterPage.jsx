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
import {Navigate} from "react-router-dom"

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";
const RegisterURL = BackendURL + "/register";

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

export default function Register(props) {

  const errors = { //set errors, empty by default
    u_name: "",       //"invalid username",
    u_name_taken: "", //"Sorry, that username is already taken!",
    u_password1: "",  //set password.
    u_password2: "",  //"Passwords must match!",
    u_email: ""       //"Invalid Email Address!"
  };
  // const [errorMessage, setErrorMessages] = useState({});
  const [errorMessage, setErrorMessages] = useState({errors});
  const [isSubmitted, setIsSubmitted] = useState(false);
  //const [password, setPassword] = useState("")

  const handleSubmit = async function(event) {
    event.preventDefault();
    let { u_name, email, pass, pass2 } = document.forms[0];
    console.log("Username:", u_name.value);
    console.log("Email:", email.value);
    console.log("Password: ",pass.value);
    console.log("Confirm Password:",pass2.value);

    // FIXME: veryfy pass === pass2
    // FIXME: Snake case when it should be camel case?
    // these will be used to implement field verifications
    const u_name_empty = (u_name.value === "") ? true : false;
    const email_empty = (email.value === "") ? true : false;
    const pass_empty = (pass.value === "") ? true : false;
    const pass2_empty = (pass2.value === "") ? true : false;

    // console.log("u_name.value: ",u_name.value,":");
    // console.log("u_name.value: ","Hello",":");

    //Check basic verification
    //User name limit 5~32 chars
    //Password matches confirmed password.
    

    let allInputsCorrect = true; //FIXME: Might be a better way to do this?

    //FIXME: Bunch of if statements to check each possible error, maybe better way to do this?
    //USERNAME
    if(u_name.value.length < 5 || u_name.value.length > 32) {
      errors["u_name"] = "Keep usernames between 5~32 characters";
      allInputsCorrect = false;
    }
    if(u_name_empty) { //if username empty
      errors["u_name"] = "Username Empty";
      allInputsCorrect = false;
    }

    //EMAIL
    if(email_empty) {
      errors["u_email"] = "Email Empty";
      allInputsCorrect = false;
    }
    
    //PASSWORD
    if(pass.value.length < 5 || pass.value.length > 32) {
      errors["u_password1"] = "Keep passwords between 5~32 characters";
      allInputsCorrect = false;
    }
    if(pass_empty) {
      errors["u_password1"] = "Password Empty";
      allInputsCorrect = false;
    }

    //PASSWORD CONFIRMATION
    if(pass2_empty) {
      errors["u_password2"] = "Please Re-confirm Password";
      allInputsCorrect = false;
    }
    //FIXME: Wonky string comparison, there may be better way to do this?
    if(pass.value.normalize() !== pass2.value.normalize()) {
      errors["u_password2"] = "Does not match the entered password";
      allInputsCorrect = false;
    }

    if(allInputsCorrect) { //if all inputs have been formatted correctly.
      //Set username and password to the backend server
      const httpResponse = await fetch(RegisterURL, {
        mode: "cors",
        method: "post",
        "Content-Type": "application/json",
        body: JSON.stringify({username: u_name.value, password: pass.value, email: email.value, password: pass.value})
      });

      const responseBody = await httpResponse.json();
      console.log(responseBody);
      
      if (responseBody.loginAllowed === true) {
        setIsSubmitted(true);

        props.setUsername(u_name.value);
        props.setPassword(pass.value);
      } else {
        //PRINT ERROR MESSAGE SENT FROM BACK END, needs double check?
        //Below two values are recieved from responseBody.loginAllowed === false
        //usernameUsed, emailUsed
        console.log("Register failed");
        errors["u_name"] = responseBody.usernameUsed;
        errors["u_email"] = responseBody.emailUsed;
        // if(responseBody.usernameUsed.length === 0) { //send error message if username already in use
        //   console.log("Username already in use");
        //   errors["u_name"] = responseBody.usernameUsed;
        // }
        // if(responseBody.emailUsed.length === 0) { //send error message if email already in use
        //   console.log("Email already in use");
        //   errors["u_email"] = responseBody.emailUsed;
        // }
        allInputsCorrect = false;
      }
    }

    setErrorMessages(errors); //set the error messages after all checks.
  };
  
  //Renders error messages below corresponding input
  //Names must have correct corresponding value to "errors" in default func.
  //FIXME: Color and positioning, also some weird streching??? Front end pls fix.
  const renderErrorMessage = (name) =>
    //console.log("Name: ", name)
    // name === "" && 
    (
      <div className="error">{errorMessage[name]}</div>
    );

  const renderForm = (
    <ThemeProvider theme={theme}>

      <Link href = '/' style={{ textDecoration: 'none' }}>
        <Box textAlign='left'>
            <Button 
              color="primary"
              type="submit"
              onClick = {props.loginHandler}
              sx={{ mt: 3, mb: 2, mr: 5, ml: 5,
                pr: 7, pl: 7, 
                border: 2,
                fontWeight: 600,
                fontSize: 16 }} >
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
          }}
          >

          <Typography component="h1" variant="h5">
            Create Your Account!
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField //for the username
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="u_name"
              defaultValue="" //set empty default value.
              //autoComplete="email"
              autoFocus
            />
            {renderErrorMessage("u_name")}

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
            {renderErrorMessage("u_email")}

            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // onChange={event => {
              //   console.log(event.target.value);
              // }}
              // onChange={event => {
              //   setPassword(event.target.value)
              // }}
              // value={password}
            />
            {renderErrorMessage("u_password1")}

            <TextField
              margin="normal"
              required
              fullWidth
              name="pass2"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="password2"
            />
            {renderErrorMessage("u_password2")}

            <Box textAlign='center'>
              <Button
                color="primary"
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2,
                  pr: 7, pl: 7, 
                  border: 2 }} >
                Register
              </Button>
            </Box>

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
      {isSubmitted ? (
        <Navigate to = "/Home" />
      ) : renderForm}
    </div>
  </div>
);
}
