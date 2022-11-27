import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../DisplayPages/HomePage';
import UserInfo from '../UserContext';
import * as React from 'react';

const initSUT = async () => {
    const userInfo = { tasks: [] } ;
    render(
        <UserInfo.Provider value = {{username: 'user', userInfo: userInfo}}>
            <MemoryRouter>
                <Routes>
                    <Route exact path='/' element={
                        <HomePage userInfo = {userInfo} />
                    }></Route>
                </Routes>
            </MemoryRouter>
        </UserInfo.Provider>
    );
}

beforeEach(() => {
    initSUT();
});


describe("Verify HomePage UI elements are rendering properly", () => {

    test('Today\'s Tasks Column Heading', async () => {
        await screen.findByText('Today\'s Tasks');
    });
    
    test('Add New Task Column Heading', async () => {
        await screen.findByText('Add New Task');
    });

});

describe("Verify Create Task Fields are rendering properly", () => {

    test('Task Name Field', async () => {
        await screen.findByText('Task Name');
    });

    test('Start Date/Time Field', async () => {
        await screen.getByLabelText('Start Date/Time *');
    });

    test('End Date/Time Field', async () => {
        await screen.getByLabelText('End Date/Time *');
    });

    test('Select a Category Dropdown', async () => {
        await screen.getByTestId('ArrowDropDownIcon');
    });

    test('Create your own Category Field', async () => {
        await screen.getByLabelText('Create your own Category');
    });

});

describe("Verify Buttons are rendering properly", () => {

    test('Add Task Button', async () => {
        await screen.findByText('Add Task');
    });

    test('Today button on Calendar', async () => {
        await screen.findByText('Today');
    });

    test('Go To Dashboard Button', async () => {
        await screen.findByText('Go To Dashboard');
    });

    test('Logout Button', async () => {
        await screen.findByText('Logout');
    });

});
