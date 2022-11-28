import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../DisplayPages/LoginPage';
import * as React from 'react';

const initSUT = async () => {
  render(
      <MemoryRouter>
        <Routes>
          <Route exact path='/' element={
            <LoginPage />
          }></Route>
        </Routes>
      </MemoryRouter>
  );
}

beforeEach(() => {
  initSUT();
});


describe("Verify Login Page UI elements are rendering properly", () => {

  test('Login Page Heading', async () => {
    await screen.findByText('Sign in');
  });
  
  test('Username Form Field', async () => {
    await screen.findByText('Username');
  });

  test('Password Form Field', async () => {
    await screen.findByText('Password');
  });

});

describe("Verify Buttons are rendering properly", () => {

  test('Sign In Button', async () => {
    await screen.getByTestId('signinButton');
  });

  test('Home Button', async () => {
    await screen.findByText('Home');
  });

});
