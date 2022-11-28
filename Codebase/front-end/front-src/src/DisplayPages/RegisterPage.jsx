import * as React from 'react';
import { Button, CssBaseline, TextField, Link, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material';
import Copyright from "./Copyright";
import {Navigate} from "react-router-dom"
import UserInfo from '../UserContext';
import axios from 'axios';
import background from '../Images/Hero.jpeg';

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
  const [errors, setErrorMessages] = React.useState(
    { //set errors, empty by default
      u_name: "",       //"invalid username",
      u_name_taken: "", //"Sorry, that username is already taken!",
      u_password1: "",  //set password.
      u_password2: "",  //"Passwords must match!",
      u_email: ""       //"Invalid Email Address!"
    }
  );
  //PLEASE USE STATES WHEN SENDING.
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  //Below useStates are for username, email, password, and password confirmation
  const [usernameState, setUsernameState]  = React.useState(undefined);
  const [emailState, setEmailState] = React.useState(undefined);
  const [passwordOneState, setPasswordOneState] = React.useState(undefined);
  const [passwordTwoState, setPasswordTwoState] = React.useState(undefined);

  const handleSubmit = async function(event, setUsername, setPassword,
    setUserInfo) {
    event.preventDefault();
    let u_name = usernameState;
    let email = emailState;
    let pass = passwordOneState;
    let pass2 = passwordTwoState;
    
    let allInputsCorrect = true; 
    
    //Check if trying to Register without any submissions.
    if(u_name === undefined) {
      errors["u_name"] = "Username Empty"; //Set Error
      allInputsCorrect = false; //Make sure that it doesn't do a server call
      setUsernameState(""); //change from undefined to empty string so that error message displays.
    }
    if(email === undefined) {
      errors["u_email"] = "Email Empty";
      allInputsCorrect = false;
      setEmailState("");
    }
    if(pass === undefined) {
      errors["u_password1"] = "Password Empty";
      allInputsCorrect = false;
      setPasswordOneState("");
    }
    if(pass2 === undefined) {
      errors["u_password2"] = "Please Re-confirm Password";
      allInputsCorrect = false;
      setPasswordTwoState("");
    }

    //Check all other errors.
    if(errors["u_name"].length !== 0 || errors.u_email.length !== 0 || errors["u_password1"].length !== 0 || errors["u_password2"].length !== 0) {
      allInputsCorrect = false;
    }

    if(allInputsCorrect) { //if all inputs have been formatted correctly.
      //Set username and password to the backend server
      //JSONFIX
      const httpResponse = await axios.post('http://localhost:8000/register', { 
	      username: u_name, password: pass, email: email });
      const responseBody = httpResponse.data;

      if (responseBody.loginAllowed === true) {
        setIsSubmitted(true);

        setUsername(u_name);
        setPassword(pass);
        setUserInfo(responseBody.payload);
      } else {
        if(responseBody.boolEmailUsed) {
          errors["u_email"] = responseBody.emailUsed;
        }

        if(responseBody.boolUsernameUsed) {
          errors["u_name"] = responseBody.usernameUsed;
        }
        
        setErrorMessages({...errors}); //set errors
      }
    }
  };

  const renderForm = (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage:`url(${background})`, backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh'}}>
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
                          }
                          if(u_name_empty) { //if username empty
                            errors["u_name"] = "Username Empty";
                          }
                        }
                      }}
                      error = {(errors["u_name"].length === 0 || usernameState === undefined) ? false : true}
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
                        const email_too_long = (event.target.value.length > 32) ? true : false;
                        if (email_too_long === true) {
                          setEmailState("");
                          errors["u_email"] = "Email is too long";
                          return;
                        }

                        const email_empty = (event.target.value === "") ? true : false;
                        setEmailState(event.target.value);
                        let email = event.target.value;
                        //EMAIL
                        errors["u_email"] = "";
                        if (email !== undefined) {
                          if(email_empty) {
                            errors["u_email"] = "Email Empty";
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
                          }
                          if(pass_empty) {
                            errors["u_password1"] = "Password Empty";
                            
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
                          }
                          //FIXME: Wonky string comparison, there may be better way to do this?
                          if(pass.normalize() !== pass2.normalize()) {
                            errors["u_password2"] = "Does not match the entered password";
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
      </div>
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
