

export class user {
	constructor(username, password, email, tasks) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.tasks = tasks;
	}

	authenticate() {
		//authenticate
	}

	addTask(task) {
		this.tasks.push(task);
	}

};

export class task {	
	constructor(name) {
		this.name = name;
		this.startTime;
		this.endTime;
		this.duration;
		this.date;
		this.tag;
		this.completed;
	}

	setStartTime(time) { //please use ISO string format
		this.date = new Date(time); //creates Date object for when task start.
		this.startTime = this.date.getTime();
	}

	setEndTime(time) { //this is for manually setting how long the task took.
		var end = new Date(time);
		this.endTime = end.getTime();
		this.duration = this.endTime - this.startTime;
	}
};

export class taskList() {
	//foobar TIMESTAMP WITH TIME ZONE
	//member USER
	//task preset 
	//task scheduled
	constructor() {
		this.userObj; //member
		this.taskPresets = {}; //task presets
		this.taskScheduled = {}; //task scheduled
	}

	setUser(username, password, email, tasks=[]) {
		this.userObj = new user(username, password, email, tasks);
		//check format of tasks before adding it to constructor???
	}

	addTaskPreset(name, startTime) { //arguments should include task stuff.
		//please have startTime in ISO standard.
		var newTask = new task(name);
		var taskID = new Date(startTime);
		this.taskPresets[taskID] = newTask;
		return taskID; //Unique ID
		//return taskID
	}

	scheduleTask(startTime, endTime, taskID) { //have start and end times in ISO
		//get the task preset and clone it
		var clonedPreset = structuredClone(this.taskPresets[taskID]);
		clonedPreset.setStartTime(startTime); //set start and end times
		clonedPreset.setEndTime(endTime);
		var taskID = new Date(startTime);
		this.taskScheduled[taskID] = clonedPreset; //put it into scheduled tasks
		return taskID; //taskID = startTime.
	}

	returnScheduleTask(taskID) {
		if (!(taskID in this.taskScheduled)) {
			return; //task does not exist in presets.
		}
		return this.taskScheduled[taskID]; //if exists, returns entire task object.
	}

	editScheduleTask(startTime, endTime, taskID) {
		if (!(taskID in this.taskScheduled)) {
			return false; //task does not exist in presets.
		} 
		this.taskScheduled[taskID].startTime = startTime;
		this.taskScheduled[taskID].endTime = endTime;
		return true; //edits added.
	}

	returnListScheduleTask() {
		return this.taskScheduled; //returns all tasks scheduled.
	}

	//set task complete or incomplete
	setComplete(taskID, done) {
		this.taskScheduled[taskID].completed = done;
	}

	//get task complete or incomplete
	getComplete(taskID) {
		return this.taskScheduled[taskID].completed;
	}
}
