import React from "react";
import styled from "styled-components";
import '../styles.css';
import Copyright from "./Copyright";
import {Box, Button, createTheme, ThemeProvider, CssBaseline} from '@mui/material';
import {Link} from "react-router-dom";

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

const WelcomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainLetter = styled.div`
  font-size: 300px;
  font-weight: bold;
  display: inline;
`;

const SubLetters = styled.div`
  font-size: 100px;
  display: inline;
`;

const LogoDiv = styled.div`
  width: 500px;
  text-align: center;
`;

const Tagline = styled.h5`
  font-size: 30px;
  margin: 0px;
  padding: 0px;
`;

const SellingPoint = styled(Tagline)`
  margin-top: 0.5em;
  font-size: 25px;
  font-weight: normal;
`;

const Prioritize = styled(SellingPoint)`
  margin-right: 7em;
`;

const Perfect = styled(SellingPoint)`
  margin-left: 7em;
`;

const StyledFooter = styled.footer`
  margin-top: 5em;
`;

function HeroView(props) {

  const renderForm = (
    <ThemeProvider theme={theme}>
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
                  border: 2,
                  fontWeight: 600,
                  fontSize: 16 }} >
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
    </ThemeProvider>
  );

  return (
    renderForm
  );
}

export default HeroView;