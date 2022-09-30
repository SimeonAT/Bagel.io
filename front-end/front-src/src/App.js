/* ---- SOURCES USED ----
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code
 *   -in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 * - https://reactjs.org/docs/hooks-state.html
*/
import React from "react";
import logo from './logo.svg';
import './App.css';

const BACKEND_URL = "http://localhost:8000";

function App() {
  const [server_response, set_server_response] = React.useState("");

  const talk_to_server = async function() {
    let http_response = await fetch(BACKEND_URL, {
      method: "get",
      mode: "cors"
    });
    console.log(http_response);

    let response_body = await http_response.text();
    set_server_response(response_body);
    return;
  }

  const show_response = function() {
    if (server_response.length > 0) { 
      return (<p>{server_response}</p>);
    }
    else { return (null); }
  }

  return (
    <div>
      <p>Press the button to get the server to do something.</p>

      <button onClick = {talk_to_server}>
        Press Me!
      </button>

      {show_response()}
    </div>
  );
}

export default App;
