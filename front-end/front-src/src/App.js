/* ---- SOURCES USED ----
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code
 *   -in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
*/

import logo from './logo.svg';
import './App.css';

const BACKEND_URL = "";

function App() {

  const talk_to_server = async function() {
    let http_response = await fetch(BACKEND_URL, {
      mode: "cors"
    });

    let response_body = await http_response.data();

    console.log(response_body);
    return;
  }

  return (
    <div>
      <p>Press the button to get the server to do something.</p>

      <button onClick = {talk_to_server}>
        Press Me!
      </button>
    </div>
  );
}

export default App;
