/* ---- SOURCES USED ----
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 * - https://reactjs.org/docs/hooks-state.html
*/

import './Styles.css';
import HeroView from "./DisplayPages/HeroPageView";
import LoginPage from './DisplayPages/LoginPage';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={< HeroView />}></Route>
        <Route exact path='/login' element={< LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
