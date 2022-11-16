// We should have a utils file for the front end, so we don't clog the display pages 



// Will need to comment properly later
export const validateDateFieldFormat = values => {
    console.log(values);
    const tokenizedDate = values.split(" ");
    console.log(tokenizedDate);
    
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
    console.log(tokenizedDate[1][2]);
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



      /**********************************************************************************************************************
    // This was handling for old task list. We can remove it when we do clean up, or maybe move it to a different class.
    // Seems a shame to just trash it. 
    ***********************************************************************************************************************
    const createTaskDisplayList = function (userInfoObject) {
      const userInfo = userInfoObject.userInfo;
      const tasksToDisplay = userInfo.tasks;
    
      for (let i = 0; i < tasksToDisplay.length; i++) {
        const label = tasksToDisplay[i].name;
        const complete = tasksToDisplay[i].complete;
        const taskid = tasksToDisplay[i].taskid;
        const checkedIn = tasksToDisplay[i].checkedIn;
        taskDisplayList.push(
          <FormControlLabel
            sx={{ ml: 7, mr: 7 }}
            control={complete ? <Checkbox defaultChecked /> : <Checkbox />}
            label={label}
            key={i}
            taskid={taskid}
            checkedin={checkedIn ? "true" : "false"}
          />
        );
      }

      return taskDisplayList;
    };

    /**
     * React will not re-render the task list if we add a new task.
     * We have to save the task list as a React state. Whenever
     * we want to update the task list, we need to make a copy of the
     * old task list, insert the new task, and set the task list state
     * as the old task list + the new task.
     /
    const newList = [...taskListToRender];
    // The new task will be at the end of the array.
    const newTaskIndex = newList.length;
    const newTaskLabel = taskNameRef.current.value;
    const newTaskComplete = false;
    const newTaskid = responseBody.taskid;
    const newTaskCheckedIn = responseBody.checkedIn
    newList.push(
      <FormControlLabel 
        sx={{ ml: 7, mr: 7 }}
        control={newTaskComplete ? <Checkbox defaultChecked /> : <Checkbox />} 
        label={newTaskLabel}
        key={newTaskIndex}
        taskid={newTaskid}
        checkedin={newTaskCheckedIn ? "true" : "false"}
      />
    );
    console.log(`newTask.taskid: ${JSON.stringify(responseBody.taskid)}`);
    updateList(newList);
    ***********************************************************************************************************************
    **********************************************************************************************************************/