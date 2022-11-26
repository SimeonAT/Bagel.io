import { MenuItem } from '@mui/material';
import axios from 'axios';
// Utils file for the front end, so we don't clog the display pages 

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND*SECONDS_IN_MINUTE;

/**
 * Calculates totals per category
 *
 * @param calculatingOnlyToday : boolean flag to indicate if we only want today's tasks or whole month
 * @return totalsList : 2d array in the form : [ [tagName, tagTime] , [tagName2, tag2Time] ]
 */
export const calculateTotalCompletedByTag = async function(username, calculatingOnlyToday) {
  let taskList = await getTasksFromServer(username);

  if (calculatingOnlyToday) {
    //fliter for only today's tasks
    taskList = getTodayTasksFromList(taskList);
  } else {
    //fliter for only this months's tasks
    taskList = getThisMonthTasksFromList(taskList);
  }

  const totalsList = []
  for (let i = 0; i < taskList.length; i++){
    const needToAddTaskTime = (taskList[i].complete === true && taskList[i].checkedIn === true);

    if (needToAddTaskTime) {
      const tag = taskList[i].tag;
      const tagAlreadyPresent = isTagInTotalList(totalsList, tag);
      if (tagAlreadyPresent) {
        //add sum
        const taskTime = calculateTaskTime(taskList[i]);
        let tagIndex = 0;
        for (let j = 0; j < totalsList.length; j++) {
          if (totalsList[j][0] === tag) {
            tagIndex = j;
          }
        }
        const oldTotal = totalsList[tagIndex][1];
        const newTotal = oldTotal + taskTime;
        totalsList[tagIndex][1] = newTotal;
      } else {
        //instantiate and add sum
        const taskTime = calculateTaskTime(taskList[i]);
        totalsList.push([tag, taskTime]);
      }
    }
  }
  return totalsList;
}

/**
 * Checks to see if the category is already in the 2d array
 *
 * @param totalsList : the 2d array with totals
 * @param tag : the category we are looking for in the array
 * @return boolean : true if found, false otherwise
 */
const isTagInTotalList = function(totalsList, tag){
  if(totalsList.length === 0) {
    return false;
  }
  for (let i = 0; i < totalsList.length; i++){
    if (totalsList[i][0] === tag) {
      return true;
    }
  }
  return false;
}

/**
 * Calculates how long this task took
 *
 * @param task : task object from which to extract start and end dates
 * @return taskLengthInHours : length of task in hours as an integer
 */
const calculateTaskTime = function(task){
  const startTime = new Date(task.startDate);
  const endTime = new Date(task.endDate);
  const taskLengthInHours = (endTime.getTime() - startTime.getTime()) / MILLISECONDS_IN_MINUTE;
  return taskLengthInHours;
}

/**
 * Fetches task list from server
 *
 * @param username : username of current user 
 * @return taskList : list of all tasks for current user
 */
 export const getTasksFromServer = async function(username) {
  //JSONFIX
  const httpResponse = await axios.post('http://localhost:8000/getTasks', { 
    username: username
  });
  const responseBody = httpResponse.data;

  let taskList = responseBody.taskList;
  return taskList;
}

/**
 * Filters task list for only today's tasks
 *
 * @param fullTaskList : list of all tasks for current user
 * @return todayTaskList : list of all tasks only for today for current user
 */
export const getTodayTasksFromList = function(fullTaskList) {
  const now = new Date();
  const todayTaskList = [];
  for (let i = 0; i < fullTaskList.length; i++){
    const taskDate = new Date(fullTaskList[i].startDate);
    if (now.getDay() === taskDate.getDay()) { 
      todayTaskList.push(fullTaskList[i]);
    }
  }

  return todayTaskList;
}

/**
 * Filters task list for only this month's tasks
 *
 * @param fullTaskList : list of all tasks for current user
 * @return thisMonthTaskList : list of all tasks only for this month for current user
 */
 export const getThisMonthTasksFromList = function(fullTaskList) {
  const now = new Date();
  const thisMonthTaskList = [];
  for (let i = 0; i < fullTaskList.length; i++){
    const taskDate = new Date(fullTaskList[i].startDate);
    if (now.getMonth() === taskDate.getMonth()) { 
      thisMonthTaskList.push(fullTaskList[i]);
    }
  }

  return thisMonthTaskList;
}

/**
 * Calculates to see if tasks overlap
 *
 * @param taskStartISO : start date of new task
 * @param userInfo : info of current user, used to call server functions
 * @return boolean : true if overlapping, false otherwise
 */
export const newTaskOverlapsExistingTask = async function(taskStartISO, userInfo) {
  const currentTaskStartTime = new Date(taskStartISO).getTime();
  const existingTaskList = await getTasksFromServer(userInfo.username);
  const existingTodayTasks = getTodayTasksFromList(existingTaskList);
  for (let i = 0; i < existingTodayTasks.length; i++){
    const existingTaskStartTime = new Date(existingTodayTasks[i].startDate).getTime();
    const existingTaskEndTime = new Date(existingTodayTasks[i].endDate).getTime();
    if (startTimeOverlapsExisting(currentTaskStartTime, existingTaskStartTime, existingTaskEndTime)) {
      return true;
    }
  }
  return false;
}

/**
 * Actual time check part of newTaskOverlapsExistingTask()
 *
 * @param currentTaskStartTime : new task start time
 * @param existingTaskStartTime : old task start time
 * @param existingTaskEndTime : old task end time
 * @return boolean : true if overlapping, false otherwise
 */
const startTimeOverlapsExisting = function(currentTaskStartTime, existingTaskStartTime, existingTaskEndTime){
  if (currentTaskStartTime >= existingTaskStartTime && currentTaskStartTime <= existingTaskEndTime) {
    return true;
  } else {
    return false;
  }
}

/**
 * Error checking for date field to make sure format is valid
 *
 * @param values : input from the field under test
 * @return boolean : true if valid, false otherwise
 */
export const validateDateFieldFormat = values => {
    const tokenizedDate = values.split(" ");
    
    if (tokenizedDate.length !== 3) {
      return false;
    }

    // validate the date part
    if (tokenizedDate[0].length !== 10) {
      return false;
    }
    for (let i = 0; i < tokenizedDate[0].length; i++){
      if (i === 2 || i === 5) {
        if (tokenizedDate[0][i] !== '/'){
          return false;
        }
      } else {
        if (!(tokenizedDate[0][i] >= 0 && tokenizedDate[0][i] <= 9)) {
          return false;
        }
      }
    }

    // validate the time part
    for (let i = 0; i < tokenizedDate[1].length; i++) {
      if (i === 2) {
        if (tokenizedDate[1][i] !== ':') {
          return false;
        }
      } else {
        if (!(tokenizedDate[1][i] >= 0 && tokenizedDate[1][i] <= 9)) {
          return false;
        }
      }
    }

    // validate the AM/PM part
    if (tokenizedDate[2].toLowerCase() !== 'am' && tokenizedDate[2].toLowerCase() !== 'pm') {
      return false;
    }

    return true;
  }


/**
 * Deprecated function for setting up dynamic list of categories for drop down
 *
 * @param userInfoProp : user info to call server for proper user
 * @param fetchTagsURL : server end point
 * @return dropDownCategoryOptions : custom array of MenuItem elements for UI
 */
export const setUpCategoriesForDropdown = async function(userInfoProp, fetchTagsURL) {
  let dropDownCategoryOptions = [];
  let username = undefined;
  if (userInfoProp !== undefined) {
    username = userInfoProp.username;
  }

  const httpResponse = await fetch(fetchTagsURL, {
    mode: "cors",
    method: "post",
    "Content-Type": "application/json",
    body: JSON.stringify({username: username})
  });
  let responseBody = await httpResponse.json();
  let tagList = responseBody.tagList;

  for (let i = 0; i < tagList.length; i++) {
    dropDownCategoryOptions.push(<MenuItem value={tagList[i]}>{tagList[i]}</MenuItem>)
  }
  return dropDownCategoryOptions;
}

