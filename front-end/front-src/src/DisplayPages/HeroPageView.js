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
*/
import React from "react";
import '../Styles.css';

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/login";

/* Enumerations that indicate what the user is
   currently doing on the site:

   WELCOME => user is viewing the welcome page
   REGISTER => user is creating an account
   LOGIN => user is entering their login information
*/
const WELCOME = 0;
const REGISTER = 1;
const LOGIN = 2;

function WelcomeView() {
  return (
    <div>
      <div className = "title-section">
        <div className="title-capital-letter-element">
          <div className="title-capital-letter-div">B</div>
        </div>
        <div className="secondary-title-element">
          <div className="title-lowercase-letter">agel</div>
          <div className="subtitle">take back your time</div> 
        </div>
      </div> 
      <div className = "list-section">
        <ul>• Plan</ul>
        <ul>• Prioritize</ul>
        <ul>• Perfect</ul>
      </div>
    </div>
  );
}

class HeroView extends React.Component { 
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.state = {userStatus: WELCOME};

    return;
  }

  /* Change what is currently being shown on the webpage
     depending on the action that the user wants to take.
  */
  changeView() {
    if (this.state.userStatus === WELCOME) {
      return (<WelcomeView />);
    }
    else if (this.state.userStatus === LOGIN) {
      return (null);
    } 
    else if (this.state.userStats === REGISTER) {
      return (null);
    }
    
    return;
  }

  async loginHandler() {
    this.setState({userStatus: LOGIN});

    let httpResponse = await fetch(LoginURL, {
      mode: "cors",
      method: "get"
    });

    let responseBody = await httpResponse.text();

    console.log(responseBody);
    return;
  }

  registerHandler() {
    this.setState({userStatus: REGISTER});
    return;
  }

  render() {
    return (
      <section className="hero-view-frame-element">

      <div className="hero-view-content">
        <div className="login-button-element">
          <button className="login-button" 
           onClick = {this.loginHandler}>Login</button>
        </div> 

        {this.changeView()}

        <div className="create-button-element">
          <button className="create-account-button"
           onClick = {this.registerHandler}>Make your account now!</button>
        </div>  
      </div>
    </section>
    );
  }
}

export default HeroView;