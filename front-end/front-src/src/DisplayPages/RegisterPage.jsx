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

   - https://reactjs.org/docs/context.html
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

import UserInfo from '../UserContext';

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

  //Checks errors.
  const [errors, setErrorMessages] = useState(
    { //set errors, empty by default
      u_name: "",       //"invalid username",
      u_name_taken: "", //"Sorry, that username is already taken!",
      u_password1: "",  //set password.
      u_password2: "",  //"Passwords must match!",
      u_email: ""       //"Invalid Email Address!"
    }
  );
  //PLEASE USE STATES WHEN SENDING.
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Below useStates are for username, email, password, and password confirmation
  const [usernameState, setUsernameState]  = useState(undefined);
  const [emailState, setEmailState] = useState(undefined);
  const [passwordOneState, setPasswordOneState] = useState(undefined);
  const [passwordTwoState, setPasswordTwoState] = useState(undefined);

  //Does basic input checking
  //Notably does not check if username/email is already in use, that only occurs
  //after the server call happens.
  //const [allInputsCorrect, setAllInputsCorrect] = useState(false);
  //let allInputsCorrect = true; //FIXME: Might be a better way to do this???


  const handleSubmit = async function(event, setUsername, setPassword,
    setUserInfo) {
    event.preventDefault();
    // //let { u_name, email, pass, pass2 } = document.forms[0]; //CHANGES TO STATES [user, email, pass1, pass2]
    let u_name = usernameState;
    let email = emailState;
    let pass = passwordOneState;
    let pass2 = passwordTwoState;
    
    let allInputsCorrect = true; //FIXME: Might be a better way to do this???
    
    //Check if trying to Register without any submissions.
    if(u_name === undefined) {
      errors["u_name"] = "Username Empty"; //Set Error
      allInputsCorrect = false; //Make sure that it doesn't do a server call
      //setAllInputsCorrect(false);
      setUsernameState(""); //change from undefined to empty string so that error message displays.
    }
    if(email === undefined) {
      errors["u_email"] = "Email Empty";
      allInputsCorrect = false;
      //setAllInputsCorrect(false);
      setEmailState("");
    }
    if(pass === undefined) {
      errors["u_password1"] = "Password Empty";
      allInputsCorrect = false;
      //setAllInputsCorrect(false);
      setPasswordOneState("");
    }
    if(pass2 === undefined) {
      errors["u_password2"] = "Please Re-confirm Password";
      allInputsCorrect = false;
      //setAllInputsCorrect(false);
      setPasswordTwoState("");
    }

    //Check all other errors.
    if(errors["u_name"].length !== 0 || errors.u_email.length !== 0 || errors["u_password1"].length !== 0 || errors["u_password2"].length !== 0) {
      allInputsCorrect = false;
    }

    //FIXME:
    //MINOR (not very important issue)
    //In back-end, tasks.js, if in for-loop if matching username is found first, then
    //Returns immediately without search for if email has already been used (because if breaks if it finds one or the other)
    //Vice-versa if email is found first, and not username.
    if(allInputsCorrect) { //if all inputs have been formatted correctly.
      //Set username and password to the backend server
      const httpResponse = await fetch(RegisterURL, {
        mode: "cors",
        method: "post",
        "Content-Type": "application/json",
        body: JSON.stringify({username: u_name, password: pass, email: email, password: pass})
      });

      const responseBody = await httpResponse.json();
      
      if (responseBody.loginAllowed === true) {
        setIsSubmitted(true);

        setUsername(u_name);
        setPassword(pass);
        setUserInfo(responseBody.payload);
      } else {
        //PRINT ERROR MESSAGE SENT FROM BACK END, needs double check?
        //Below two values are recieved from responseBody.loginAllowed === false
        //usernameUsed, emailUsed
        // below two lines worked before
        // errors["u_name"] = responseBody.usernameUsed;
        // errors["u_email"] = responseBody.emailUsed;

        // if(responseBody.usernameUsed.length === 0) { //send error message if username already in use
        //   errors["u_name"] = responseBody.usernameUsed;
        // }
        // if(responseBody.emailUsed.length === 0) { //send error message if email already in use
        //   errors["u_email"] = responseBody.emailUsed;
        // }
        
        if(responseBody.boolEmailUsed) {
          // setErrorMessages({
          //   ...errors,
          //   'u_email': responseBody.emailUsed
          // })
          errors["u_email"] = responseBody.emailUsed;
        }

        if(responseBody.boolUsernameUsed) {
          errors["u_name"] = responseBody.usernameUsed;
        }
        
        setErrorMessages({...errors}); //set errors
        //allInputsCorrect = false; //allinputsCorrect is false.
      }
    }
    //errors.u_name = 'not valid'
    //setErrorMessages({...errors}); //set the error messages after all checks.
  };
  
  //Renders error messages below corresponding input
  //Names must have correct corresponding value to "errors" in default func.
  //FIXME: Color and positioning, also some weird streching??? Front end pls fix.
  const renderErrorMessage = (name) =>
    // name === "" && 
    (
      <div className="error">{errors[name]}</div>
    );

  //?
  // function handleInputChange(event, name) {
  //   setErrorMessages.errors[name] = event.target.value;
  // }

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

          <UserInfo.Consumer>
            {(userInfo) => {
              return (
                <Box component="form" onSubmit={(event) => {
                  setUsernameState(usernameState); //CHECK HERE
                  handleSubmit(event, userInfo.setUsername,
                    userInfo.setPassword, userInfo.setUserInfo); //CHANGES TO (use)STATES [user, email, pass1, pass2]
                }} noValidate sx={{ mt: 1 }}>
                  <TextField //for the username
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="u_name"
                    defaultValue="" //set empty default value.
                    onChange={event => {
                      setUsernameState(event.target.value);
                      const u_name_empty = (event.target.value === "") ? true : false;
                      let u_name = event.target.value; // IMPORTANT: don't use the useState value since setState isn't sychronous.
                      errors["u_name"] = "";
                      if(u_name !== undefined) {
                        if(u_name.length < 5 || u_name.length > 32) {
                          errors["u_name"] = "Keep usernames between 5~32 characters";
                          //allInputsCorrect = false;
                        }
                        if(u_name_empty) { //if username empty
                          errors["u_name"] = "Username Empty";
                          //allInputsCorrect = false;
                        }
                      }
                    }}
                    error = {(errors["u_name"].length === 0 || usernameState === undefined) ? false : true}
                    //helperText = {(usernameState !== undefined) ? errors["u_name"] : ""}
                    helperText = {errors["u_name"]}
                  />
                  
                  <TextField //email
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    onChange={event => {
                      const email_empty = (event.target.value === "") ? true : false;
                      setEmailState(event.target.value);
                      let email = event.target.value;
                      //EMAIL
                      errors["u_email"] = "";
                      if(email !== undefined) {
                        if(email_empty) {
                          errors["u_email"] = "Email Empty";
                          //allInputsCorrect = false;
                        }
                      }
                    }}
                    error = {(errors.u_email.length === 0 || emailState === undefined) ? false : true}
                    helperText = {errors.u_email}
                  />
                  
                  <TextField //password
                    margin="normal"
                    required
                    fullWidth
                    name="pass"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={event => {
                      const pass_empty = (event.target.value === "") ? true : false;
                      setPasswordOneState(event.target.value);
                      let pass = event.target.value;
                      //PASSWORD
                      errors["u_password1"] = "";
                      if(pass !== undefined) {
                        if(pass.length < 5 || pass.length > 32) {
                          errors["u_password1"] = "Keep passwords between 5~32 characters";
                          //allInputsCorrect = false;
                          
                        }
                        if(pass_empty) {
                          errors["u_password1"] = "Password Empty";
                          //allInputsCorrect = false;
                          
                        }
                      }
                    }}
                    error = {(errors["u_password1"].length === 0 || passwordOneState === undefined) ? false : true}
                    helperText = {(passwordOneState !== undefined) ? errors["u_password1"] : ""}
                  />
                  
                  <TextField //password confirmation
                    margin="normal"
                    required
                    fullWidth
                    name="pass2"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="password2"
                    onChange={event => {
                      const pass2_empty = (event.target.value === "") ? true : false;
                      setPasswordTwoState(event.target.value);
                      let pass2 = event.target.value;
                      let pass  = passwordOneState;
                      //PASSWORD CONFIRMATION
                      errors["u_password2"] = "";
                      if(pass2 !== undefined) {
                        if(pass2_empty) {
                          errors["u_password2"] = "Please Re-confirm Password";
                          //allInputsCorrect = false;
                        }
                        //FIXME: Wonky string comparison, there may be better way to do this?
                        if(pass.normalize() !== pass2.normalize()) {
                          errors["u_password2"] = "Does not match the entered password";
                          //allInputsCorrect = false;
                        }
                      }
                    }}
                    error = {(errors["u_password2"].length === 0 || passwordTwoState === undefined) ? false : true}
                    helperText = {(passwordTwoState !== undefined) ? errors["u_password2"] : ""}
                  />
                  

                  <Box textAlign='center'>
                    <Button
                      color="primary"
                      type="submit"
                      variant="outlined"
                      sx={{
                        mt: 3, mb: 2,
                        pr: 7, pl: 7,
                        border: 2
                      }} >
                      Register
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
      <div className="title"></div>
      {isSubmitted ? (
        <Navigate to = "/Home" />
      ) : renderForm}
    </div>
  </div>
);
}
