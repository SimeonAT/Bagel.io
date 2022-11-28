import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HeroPageView from '../DisplayPages/HeroPageView';

const initSUT = async () => {
  render(
      <MemoryRouter>
        <Routes>
          <Route exact path='/' element={
            <HeroPageView />
          }></Route>
        </Routes>
      </MemoryRouter>
  );
}

beforeEach(() => {
  initSUT();
});

describe("Verify Hero Page UI elements are rendering properly", () => {

  test('App Title Display', async () => {
    await screen.findByText('Bagel.io');
  });
  
  test('Sub Heading', async () => {
    await screen.findByText('Take back your time!');
  });

  test('Sub-sub heading 1', async () => {
    await screen.findByText('Prioritize!');
  });

  test('Sub-sub heading 2', async () => {
    await screen.findByText('Plan!');
  });

  test('Sub-sub heading 3', async () => {
    await screen.findByText('Perfect!');
  });

});

describe("Verify Buttons are rendering properly", () => {

  test('Create Account button', async () => {
    await screen.findByText('Create your account now!');
  });

  test('Login Button', async () => {
    await screen.findByText('Login');
  });

});


