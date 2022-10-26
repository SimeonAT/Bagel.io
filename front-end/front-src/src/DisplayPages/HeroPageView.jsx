/* ---- SOURCES USED ----
 * - https://reactjs.org/docs/components-and-props.html
 * - https://www.robinwieruch.de/react-pass-props-to-component/
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://github.com/facebook/create-react-app/issues/11174
 * - https://reactjs.org/docs/hooks-intro.html
 * - https://reactjs.org/docs/components-and-props.html
 * - https://reactjs.org/docs/state-and-lifecycle.html
 * 
 * - https://styled-components.com/docs/api#primary
 * - https://styled-components.com/
 * 
 * - https://v5.reactrouter.com/web/guides/quick-start
 * 
 * - https://www.w3schools.com/css/css_font.asp
 * - https://www.w3schools.com/css/css_inline-block.asp
 * - https://www.w3schools.com/colors/colors_picker.asp
 * - https://www.w3schools.com/colors/colors_names.asp
 * - https://www.w3schools.com/css/css_positioning.asp
 * - https://www.w3schools.com/cssref/pr_font_weight.asp
 * - https://www.w3schools.com/css/css_margin.asp
 * - https://www.w3schools.com/css/css_padding.asp
 * - https://www.w3schools.com/css/css_boxmodel.asp
*/
import React from "react";
import styled from "styled-components";
import '../styles.css';
import SignIn from "./LoginPage";
import Copyright from "./Copyright";
import {Box, Button, createTheme, ThemeProvider, CssBaseline} from '@mui/material';

import {Link} from "react-router-dom";
import { blueGrey } from "@mui/material/colors";

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

// const Button = styled.button`
//   font-size: 30px;
//   font-family: Ubuntu, Courier;

//   width: 200px;
//   height: 50px;
//   background-color: Lavender;
// `;

// FORTESTING
const TestButton = styled(Button)`
  width: 200px; 
  font-size: 20px;
  position: fixed;
  left: 0%;
  top: 0%;
`;

// const LoginButton = styled(Button)`
//   position: fixed;
//   left: 85%;
// `;

const RegisterButton = styled(Button)`
  width: 500px;
`;

const StyledFooter = styled.footer`
  margin-top: 5em;
`;

// FORTESTING
function fetchDB(setButtonText) {
  fetch('http://localhost:8000/testdb')
    .then((httpResponse) => {
      return httpResponse.json();
    })
    .then((responseBody) => {
      setButtonText(responseBody.displayStr);
    });
}

function HeroView(props) {
  const [buttonText, setButtonText] = React.useState('Click to Test Database')

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
          
          {/* FORTESTING */}
          {/* <TestButton onClick = {(event) => {fetchDB(setButtonText)}}>
            {buttonText}
          </TestButton> */}
            
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