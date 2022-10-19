

class user {
	constructor() {
		this.username;
		this.password;
		this.tasks = [];
	}

	authenticate() {
		//authenticate
	}

	addTask(task) {
		this.tasks.push(task);
	}

};

class task {	
	constructor() {
		this.name;
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
