class task {
  constructor() {
    this.name;
    this.startTime;
    this.endTime;
    this.duration;
    this.date;
    this.tag;
  }

  setDate() {
    const currentDate = new Date();
    // year, month, day, hours, minutes, seconds, in UTC time.
    this.date = currentDate.getUTCFullYear() + '-';
			    currentDate.getUTCMonth() + '-';
			    currentDate.getUTCDate() + '-';
			    currentDate.getUTCHours() + '-';
			    currentDate.getUTCMinutes() + '-';
			    currentDate.getUTCSeconds();
  }

  setStartTime() {
    const temp = new Date();
    const startDate = temp.getTime();
    this.startTime = startDate; // returns miliseconds since January 1st, 1970, 00:00:00 UTC.
  }

  markEndTime(hours, minutes) { // this is for manually setting how long the task took.
    this.endTime = hours * 3600000 + minutes * 60000;// + seconds * 1000; saves in milliseconds.
    this.duration = this.endTime - this.startTime; // setting end time also sets duration.
  }

  setEndTime() { // for start-stop timer.
    const temp = new Date();
    const endDate = temp.getTime();
    this.endTime = endDate;
    this.duration = this.endTime - this.startTime;
  }
};
