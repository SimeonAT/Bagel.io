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
			this.users[userObj.username] = userObj;
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
				return this.users[userObj.username];
			} else {
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
			return null;
		} else {
			return this.users[username].tasks.taskScheduled;
		}
	}
};