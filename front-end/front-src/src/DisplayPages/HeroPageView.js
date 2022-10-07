/* ---- SOURCES USED ----
 * - https://reactjs.org/docs/components-and-props.html
 * - https://www.robinwieruch.de/react-pass-props-to-component/
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
*/
import React from "react";
import '../Styles.css';

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/login";

class HeroView extends React.Component { 
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);

    return;
  }

  async clickHandler() {
    let httpResponse = await fetch(LoginURL, {
      mode: "cors",
      method: "get"
    });

    let responseBody = await httpResponse.text();

    console.log(responseBody);
    return;
  }

  render() {
    return (
      <section className="hero-view-frame-element">

      <div className="hero-view-content">
        <div className="login-button-element">
          <button className="login-button" onClick = {this.clickHandler}>Login</button>
        </div> 
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
        <div className="create-button-element">
          <button className="create-account-button">Make your account now!</button>
        </div> 
      
      </div>

    </section>
    );
  }
}

export default HeroView;