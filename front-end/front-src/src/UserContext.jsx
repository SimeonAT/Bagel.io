import React from 'react';
/**
 * --- SOURCES UTILIZED ----
 * - https://reactjs.org/docs/context.html
 */

/**
 * The React Context that <Main /> will utilize to ensure that
 * its children will always have the most up to date version
 * of the user's username, password, and userInfo.
 *
 * The "Dashboard" doesn't update when the task list is updated.
 * This is because it has the user info as props, not state.
 *
 * This Context will be used by Main to easily pass the username,
 * password, and UserInfo as state to the Dashboard and HomePage.
 */
const UserInfo = React.createContext(undefined);

export default UserInfo;
