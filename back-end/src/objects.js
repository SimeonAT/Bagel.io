exports.user = class user {
	constructor(username, password, email) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.tasks = [];// = tasks;
	}

	authenticate() {
		//authenticate
	}

	addTask(task) {
		(this.tasks).push(task);
	}

};

exports.Task = class Task {
	constructor(name, startDate, endDate, tag, complete) {
	  this.name = name;
	  this.startDate = startDate;
	  this.endDate = endDate;
	  this.tag = tag;
	  this.complete = complete;
	}
};

exports.mockDatabase = class mockDatabase {
	constructor() {
		this.users = {};
	}

	registerUser(userObj) {
		if(!(userObj.username in this.users)) { //if username doesn't exist
			//this.users[userObj.username].tasks = new taskList();
			//userObj.tasks = new exports.taskList();
			this.users[userObj.username] = userObj;
			//return this.users[userObj.username];
		} else {
			return null;
		}
		return this.users[userObj.username];
	}

	loginUser(userObj) {
		if (this.users[userObj.username] === undefined) {
			return null; //no users
		} else {
			if (userObj.password === this.users[userObj.username].password) {
				// return {loginAllowed: true,
				// 		payload: this.users[userObj.username]
				// 		};
				return this.users[userObj.username];
			} else {
				//return {loginAllowed: false}; //wrong password.
				return null;
			}
		}
	}
	
	getUser(username, password) {
		if (this.users[username] !== undefined) {
			return this.users[username]; //return user obj.
		} else {
			return null;
		}
	}

	getTasks(username) {
		if (this.users[username] === undefined) {
			//return {loginAllowed: false}; //no users
			//response.send({tasksList: [] });
			return null;
		} else {
			return this.users[username].tasks.taskScheduled;
			// if (userObj.password === this.users[userObj.username].password) {
			// 	return this.users[userObj.username].tasks;
			// } else {
			// 	return null;
			// }
		}
	}
};

// exports.taskList = class taskList {
	//foobar TIMESTAMP WITH TIME ZONE
	//member USER
	//task preset 
	//task scheduled
	// constructor() {
	// 	//this.userObj; //member
	// 	this.taskPresets = {}; //task presets
	// 	this.taskScheduled = {}; //task scheduled
	// }

	// setUser(username, password, email, tasks=[]) {
	// 	this.userObj = new user(username, password, email, tasks);
	// 	//check format of tasks before adding it to constructor???
	// }



	// addTask(date, task) {
	// 	this.taskScheduled[date] = task;
	// }

	// returnListScheduleTask() {
	// 	return this.taskScheduled; //returns all tasks scheduled.
	// }

	//IGNORE BELOW

	// addTaskPreset(name, startTime) { //arguments should include task stuff.
	// 	//please have startTime in ISO standard.
	// 	var newTask = new exports.task(name);
	// 	var taskID = new Date(startTime);
	// 	this.taskPresets[taskID] = newTask;
	// 	return taskID; //Unique ID
	// 	//return taskID
	// }

	// scheduleTask(startTime, endTime, taskID) { //have start and end times in ISO
	// 	//get the task preset and clone it
	// 	var clonedPreset = structuredClone(this.taskPresets[taskID]);
	// 	clonedPreset.setStartTime(startTime); //set start and end times
	// 	clonedPreset.setEndTime(endTime);
	// 	var taskID = new Date(startTime);
	// 	this.taskScheduled[taskID] = clonedPreset; //put it into scheduled tasks
	// 	return taskID; //taskID = startTime.
	// }

	// returnScheduleTask(taskID) {
	// 	if (!(taskID in this.taskScheduled)) {
	// 		return; //task does not exist in presets.
	// 	}
	// 	return this.taskScheduled[taskID]; //if exists, returns entire task object.
	// }

	// editScheduleTask(startTime, endTime, taskID) {
	// 	if (!(taskID in this.taskScheduled)) {
	// 		return false; //task does not exist in presets.
	// 	} 
	// 	this.taskScheduled[taskID].startTime = startTime;
	// 	this.taskScheduled[taskID].endTime = endTime;
	// 	return true; //edits added.
	// }

	// returnListScheduleTask() {
	// 	return this.taskScheduled; //returns all tasks scheduled.
	// }

	//set task complete or incomplete
	// setComplete(taskID, done) {
	// 	this.taskScheduled[taskID].completed = done;
	// }

	//get task complete or incomplete
	// getComplete(taskID) {
	// 	return this.taskScheduled[taskID].completed;
	// }
// }
