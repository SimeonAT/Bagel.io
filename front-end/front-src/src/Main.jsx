/* ---- SOURCES USED ----
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://reactjs.org/docs/handling-events.html
 * - https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js
 * - https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 * - https://reactjs.org/docs/hooks-state.html
 * - https://www.robinwieruch.de/react-event-handler/
 * - https://reactjs.org/docs/context.html
 * - https://stackoverflow.com/questions/60697733/react-context-not-updating
*/

import './styles.css';
import HeroView from './DisplayPages/HeroPageView';
import LoginPage from './DisplayPages/LoginPage';
import RegisterPage from './DisplayPages/RegisterPage';
import HomePage from './DisplayPages/HomePage';
import DashboardPage from './DisplayPages/DashboardPage';
import UserInfo from './UserContext';
// import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';

const BackendURL = "http://localhost:8000";
const LoginURL = BackendURL + "/logindatabase";

function Main() {
  /** Here's an idea we should try:
   *      Rather than sending an HTTP request right when we login,
   *      we can get the server to send user data in its HTTP response
   *      payload allowing the user to login.
   *
   *      All that data can be passed as props from the LoginPage,
   *      to Main, then passed down as props to the Home Page.
   */
  const [loginUsername, setUsername] = React.useState(undefined);
  const [loginPassword, setPassword] = React.useState(undefined);
  const [userInfo, setUserInfo] = React.useState(undefined);

  return (
    <UserInfo.Provider value = {{
      username: loginUsername,
      password: loginPassword,
      userInfo: userInfo,
      setUsername: setUsername,
      setPassword: setPassword,
      setUserInfo: setUserInfo,
     }}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={< HeroView />}></Route>
          <Route exact path='/login' element={
            <LoginPage />
          }></Route>
          <Route exact path='/register' element={
            <RegisterPage />
          }></Route>
          <Route exact path='/home' element={
            <HomePage userInfo = {userInfo} />
          }></Route>
          <Route exact path='/dashboard' element={
            <DashboardPage userInfo = {userInfo} />
          }></Route>
        </Routes>
      </BrowserRouter>
    </UserInfo.Provider>
  );
}

export default Main;
