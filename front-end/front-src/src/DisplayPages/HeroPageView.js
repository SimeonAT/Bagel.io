/* ---- SOURCES USED ----
 * - https://reactjs.org/docs/components-and-props.html
 * - https://www.robinwieruch.de/react-pass-props-to-component/
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
*/
import React from "react";
import '../Styles.css';

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/login";

class HeroView extends React.Component { 

  async clickHandler() {
    let httpResponse = await fetch(LoginURL + "/login", {
      mode: "cors",
      method: "get"
    });

    console.log(httpResponse);
  }

  render() {
    return (
      <section className="hero-view-frame-element">

      <div className="hero-view-content">
        <div className="login-button-element">
          <button className="login-button">Login</button>
        </div> 
        <div className = "title-section">
          <div className="title-capital-letter-element">
            <text className="title-capital-letter-text">B</text>
          </div>
          <div className="secondary-title-element">
            <text className="title-lowercase-letter">agel</text>
            <text className="subtitle">take back your time</text> 
          </div>
        </div> 
        <div className = "list-section">
          <ul>• Plan</ul>
          <ul>• Prioritize</ul>
          <ul>• Perfect</ul>
        </div> 
        <div className="create-button-element">
          <button className="create-account-button">Make your account now!</button>
        </div> 
      
      </div>

    </section>
    );
  }
}

export default HeroView;