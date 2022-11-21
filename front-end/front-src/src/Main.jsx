import './styles.css';
import HeroView from './DisplayPages/HeroPageView';
import LoginPage from './DisplayPages/LoginPage';
import RegisterPage from './DisplayPages/RegisterPage';
import HomePage from './DisplayPages/HomePage';
import DashboardPage from './DisplayPages/DashboardPage';
import UserInfo from './UserContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';

function Main() {
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
          <Route exact path='/' element={
            <HeroView />
          }></Route>
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
