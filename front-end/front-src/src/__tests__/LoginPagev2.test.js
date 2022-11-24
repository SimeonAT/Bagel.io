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
import Main from '../Main';
// import HomePage from '../DisplayPages/HomePage';
// import DashboardPage from '../DisplayPages/DashboardPage';

// const server = setupServer(
//     rest.get(URL, (req, res, ctx) => {
//       return res(ctx.json());
//     }),
// );

const login = async () => {
  render(
      <MemoryRouter>
        <Routes>
          {/* <Route exact path='/' element={
            <HeroPageView />
          }></Route> */}
          <Route exact path='/' element={
            <LoginPage />
          }></Route>
          {/* <Route exact path='/login' element={
            <LoginPage />
          }></Route> */}
        </Routes>
      </MemoryRouter>
  );
  
//   await screen.findByText('Take back your time!');
//   fireEvent.click(await screen.findByText('Login'));
//   await screen.findByText('Sign in');
//   await screen.findByText('Sign joe');
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

  await screen.findByText('Sign in');
  
  //await screen.findByText('Take back your time!');


//   await screen.findByText('Create your account now!');

//   fireEvent.click(await screen.findByText('Create your account now!'));
//   await screen.findByText('Create Your Account!');

//   await screen.findByText('Home');
//     fireEvent.click(await screen.findByText('Home'));
//   await screen.findByText('Take back your time!');



//   fireEvent.click(await screen.findByText('Login'));
//   await screen.findByText('Sign in');



//   await screen.findByText('Home');
//   fireEvent.click(await screen.findByText('Home'));
//   await screen.findByText('Take back your time!');




//   fireEvent.click(await screen.findByText('Home'));
//   await screen.findByText('Take back your time!');

//   await screen.findByText('Sign in');

});