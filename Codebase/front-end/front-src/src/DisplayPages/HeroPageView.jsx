import React from "react";
import {WelcomeDiv, MainLetter, SubLetters, LogoDiv} from './Styles';
import {Tagline, SellingPoint, Prioritize, Perfect, StyledFooter} from './Styles';
import '../styles.css';
import Copyright from "./Copyright";
import {Box, Button, createTheme, ThemeProvider, CssBaseline} from '@mui/material';
import {Link} from "react-router-dom";
import background from '../Images/Hero.jpeg'

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

function HeroView(props) {

  const renderForm = (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage:`url(${background})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'}}>
        <CssBaseline />
        
        <div>
          <Link to = "/login" style={{ textDecoration: 'none' }}>
            <Box textAlign='right'>
                <Button
                  color="primary"
                  type="submit"
                  onClick = {props.loginHandler}
                  sx={{ mt: 3, mb: 2, mr: 5,
                    pr: 7, pl: 7, 
                    border: 5,
                    borderRadius: 3,
                    fontWeight: 500,
                    fontSize: 24,
                    backgroundColor: "white" }} >
                  Login
                </Button>
              </Box>
          </Link>

          <WelcomeDiv>
            <LogoDiv>
              <MainLetter>B</MainLetter>
              <SubLetters>agel.io</SubLetters>
              <Tagline>Take back your time!</Tagline>

              <Prioritize>Prioritize!</Prioritize>
              <SellingPoint>Plan!</SellingPoint>
              <Perfect>Perfect!</Perfect>

            </LogoDiv>
              
            <Link to = "/register" style={{ textDecoration: 'none' }}>
              <Box textAlign='right'>
                <Button
                  color="primary"
                  type="submit"
                  onClick = {props.loginHandler}
                  sx={{ mt: 8, mb: 2,
                    pr: 7, pl: 7, 
                    border: 2,
                    fontWeight: 600,
                    fontSize: 20 }} >
                  Create your account now!
                </Button>
              </Box>
            </Link>

            <StyledFooter>
              <Copyright />
            </StyledFooter>
          </WelcomeDiv>
        </div>
      </div>
    </ThemeProvider>
  );

  return (
    renderForm
  );
}

export default HeroView;