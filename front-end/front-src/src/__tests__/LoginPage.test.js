import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HeroPageView from '../DisplayPages/HeroPageView';
import LoginPage from '../DisplayPages/LoginPage';
import RegisterPage from '../DisplayPages/RegisterPage';
import UserInfo from '../UserContext';
import * as React from 'react';
// import HomePage from '../DisplayPages/HomePage';
// import DashboardPage from '../DisplayPages/DashboardPage';

// const server = setupServer(
//     rest.get(URL, (req, res, ctx) => {
//       return res(ctx.json());
//     }),
// );

const login = async () => {
  const [loginUsername, setUsername] = React.useState(undefined);
  const [loginPassword, setPassword] = React.useState(undefined);
  const [userInfo, setUserInfo] = React.useState(undefined);
  render(
    <UserInfo.Provider value={{
      username: loginUsername,
      password: loginPassword,
      userInfo: userInfo,
      setUsername: setUsername,
      setPassword: setPassword,
      setUserInfo: setUserInfo,
    }}>
      <MemoryRouter>
        <Routes>
          <Route exact path='/' element={
            <HeroView />
          }></Route>
          <Route exact path='/login' element={
            <LoginPage />
          }></Route>
        </Routes>
      </MemoryRouter>
    </UserInfo.Provider>
  );
  await screen.findByText('Take back your time!');
  fireEvent.click(await screen.findByText('Login'));
  await screen.findByText('Sign in');
}

// const renderPages = async () => {
//   render(
//       <MemoryRouter>
//         <Routes>
//           <Route exact path='/' element={
//             <HeroPageView />
//           }></Route>
//         </Routes>
//       </MemoryRouter>
//   );
// }

test('Render HeroPageView, click Login', async () => {
  login();
  
});