/* ---- SOURCES USED ----
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://reactjs.org/docs/handling-events.html
*/

import logo from './logo.svg';
import './App.css';

function App() {

  const talkToServer = function() {
    console.log("Button Clicked!");
  }

  return (
    <div>
      <p>Press the button to get the server to do something.</p>

      <button onClick = {talkToServer}>
        Press Me!
      </button>
    </div>
  );
}

export default App;
