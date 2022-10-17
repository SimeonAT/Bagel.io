/* ---- SOURCES USED ----
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 * - https://reactjs.org/docs/hooks-state.html
 * - https://www.robinwieruch.de/react-event-handler/
*/

import './styles.css';
import HeroView from "./DisplayPages/HeroPageView";
import LoginPage from './DisplayPages/LoginPage';
import RegisterPage from './DisplayPages/RegisterPage';
import HomePage from './DisplayPages/HomePage';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function Main() {
  const [loginUsername, setUsername] = React.useState("");
  const [loginPassword, setPassword] = React.useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={< HeroView />}></Route>
        <Route exact path='/login' element={
          <LoginPage setUsername = {setUsername}
            setPassword = {setPassword}/>

        }></Route>
        <Route exact path='/register' element={
          <RegisterPage 
           setUsername = {setUsername}
           setPassword = {setPassword}
          />
        }></Route>
        <Route exact path='/home' element={
          <HomePage 
            username = {loginUsername}
            password = {loginPassword}
          />  
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
