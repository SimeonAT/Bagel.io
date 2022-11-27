import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '../DisplayPages/RegisterPage';
import * as React from 'react';

const initSUT = async () => {
  render(
      <MemoryRouter>
        <Routes>
          <Route exact path='/' element={
            <RegisterPage />
          }></Route>
        </Routes>
      </MemoryRouter>
  );
}

beforeEach(() => {
  initSUT();
});


describe("Verify Register Page UI elements are rendering properly", () => {

  test('Page Heading', async () => {
    await screen.findByText('Create Your Account!');
  });
  
  test('Username Form Field', async () => {
    await screen.findByText('Username');
  });

  test('Email Form Field', async () => {
    await screen.findByText('Email');
  });

  test('Password Form Field', async () => {
    await screen.findByText('Password');
  });

  test('Confirm Password Form Field', async () => {
    await screen.findByText('Confirm Password');
  });

});

describe("Verify Buttons are rendering properly", () => {

  test('Register Button', async () => {
    await screen.findByText('Register');
  });

  test('Home Button', async () => {
    await screen.findByText('Home');
  });

});
