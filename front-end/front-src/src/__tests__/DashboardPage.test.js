import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../DisplayPages/DashboardPage';
import UserInfo from '../UserContext';
import * as React from 'react';

const initSUT = async () => {
    const userInfo = { tasks: [] } ;
    render(
        <UserInfo.Provider value = {{username: 'user', userInfo: userInfo}}>
            <MemoryRouter>
                <Routes>
                    <Route exact path='/' element={
                        <DashboardPage userInfo = {userInfo} />
                    }></Route>
                </Routes>
            </MemoryRouter>
        </UserInfo.Provider>
    );
}

beforeEach(() => {
    initSUT();
});


describe("Verify DashboardPage UI elements are rendering properly", () => {

    test('Dashboard Page Heading', async () => {
        await screen.getByTestId('title');
    });
    
    test('Check in Column Heading', async () => {
        await screen.findByText('Check in your tasks!');
    });

    test('Bagels Column Heading', async () => {
        await screen.findByText('Your Productivity Bagels');
    });

    test('Today Bagel Heading', async () => {
        await screen.findByText('Hours Spent on Tasks Today');
    });

    test('This Month Bagel Heading', async () => {
        await screen.findByText('Hours Spent on Tasks This Month');
    });

});

describe("Verify Buttons are rendering properly", () => {

    test('Home Button', async () => {
        await screen.findByText('Home');
      });

});
