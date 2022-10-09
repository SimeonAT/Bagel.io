/* ---- SOURCES USED ----
 * - https://reactjs.org/docs/components-and-props.html
 * - https://www.robinwieruch.de/react-pass-props-to-component/
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 * - https://reactjs.org/docs/state-and-lifecycle.html
 * - https://github.com/facebook/create-react-app/issues/11174
 * - https://styled-components.com/
*/
import React from "react";
import styled from "styled-components";
import '../styles.css';

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

const Button = styled.button``;

function WelcomeView() {
  return (
    <div>
      <Button>Hello World!</Button>
    </div>
  );
}

function HeroView() { 
  let [userStatus, changeStatus] = React.useState(WELCOME);

  /* Change what is currently being shown on the webpage
     depending on the action that the user wants to take.
  */
  const changeView = function() {
    if (userStatus === WELCOME) {
      return (
      <WelcomeView />
      );
    }
    else if (userStatus === LOGIN) {
      return (null);
    } 
    else if (userStatus === REGISTER) {
      return (null);
    }
    
    return;
  }

  const loginHandler = async function() {
    changeStatus(LOGIN);

    let httpResponse = await fetch(LoginURL, {
      mode: "cors",
      method: "get"
    });

    let responseBody = await httpResponse.text();

    console.log(responseBody);
    return;
  }

  const registerHandler = async function() {
    changeStatus(REGISTER);

    let httpResponse = await fetch(RegisterURL, {
      mode: "cors",
      method: "get"
    });

    let responseBody = await httpResponse.text();

    console.log(responseBody);

    return;
  }

  return (
    <div>
      {changeView()}
    </div>
  );
}

export default HeroView;