/* ---- SOURCES USED ----
 * - https://reactjs.org/docs/components-and-props.html
 * - https://www.robinwieruch.de/react-pass-props-to-component/
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 * - https://github.com/facebook/create-react-app/issues/11174
 * - https://reactjs.org/docs/hooks-intro.html
 * - https://reactjs.org/docs/components-and-props.html
 * - https://reactjs.org/docs/state-and-lifecycle.html
 * 
 * - https://styled-components.com/docs/api#primary
 * - https://styled-components.com/
 * 
 * - https://www.w3schools.com/css/css_font.asp
 * - https://www.w3schools.com/css/css_inline-block.asp
 * - https://www.w3schools.com/colors/colors_picker.asp
 * - https://www.w3schools.com/colors/colors_names.asp
 * - https://www.w3schools.com/css/css_positioning.asp
 * - https://www.w3schools.com/cssref/pr_font_weight.asp
*/
import React from "react";
import styled from "styled-components";
import '../styles.css';
import SignIn from "./LoginPage";
import Copyright from "./Copyright";

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/login";
const RegisterURL = BackendURL + "/register";

/* Enumerations that indicate what the user is
   currently doing on the site:

   WELCOME => user is viewing the welcome page
   REGISTER => user is creating an account
   LOGIN => user is entering their login information
*/
const WELCOME = 0;
const REGISTER = 1;
const LOGIN = 2;

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

const Button = styled.button`
  font-size: 30px;
  font-family: Ubuntu, Courier;

  width: 200px;
  height: 50px;
  background-color: Lavender;
`;

const LoginButton = styled(Button)`
  position: fixed;
  left: 85%;
`;

const RegisterButton = styled(Button)`
  width: 500px;
`;

const StyledFooter = styled.footer`
  margin-top: 5em;
`;

function WelcomeView(props) {
  return (
    <div>
      <LoginButton onClick = {props.loginHandler}>
        Login
      </LoginButton>

      <WelcomeDiv>
        <LogoDiv>
          <MainLetter>B</MainLetter>
          <SubLetters>agel.io</SubLetters>
          <Tagline>Take back your time!</Tagline>

          <Prioritize>Prioritize!</Prioritize>
          <SellingPoint>Plan!</SellingPoint>
          <Perfect>Perfect!</Perfect>

        </LogoDiv>
          
        <RegisterButton onClick = {props.registerHandler}>
          Make your account now!
        </RegisterButton>

        <StyledFooter>
          <Copyright />
        </StyledFooter>
      </WelcomeDiv>
    </div>
  );
}

function HeroView() { 
  let [userStatus, changeStatus] = React.useState(WELCOME);

  const loginHandler = async function() {
    changeStatus(LOGIN);
    return;
  }

  const registerHandler = async function() {
    changeStatus(REGISTER);
    return;
  }

  /* Change what is currently being shown on the webpage
     depending on the action that the user wants to take.
  */
  const changeView = function() {
    if (userStatus === WELCOME) {
      return (
        <div>
          <WelcomeView loginHandler = {loginHandler} 
            registerHandler = {registerHandler} />
        </div>
      );
    }
    else if (userStatus === LOGIN) {
      return (
        <SignIn />
      );
    } 
    else if (userStatus === REGISTER) {
      return (
        <div>
          <h3>404 Not Found</h3>
          <p>
            Registration page still under construction.
          </p>
        </div>
      );
    }
      
      return;
    }

  return (
    <div>
      {changeView()}
    </div>
  );
}

export default HeroView;