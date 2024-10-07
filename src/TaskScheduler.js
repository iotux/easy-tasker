const schedule = require('node-schedule');

class TaskScheduler {
  constructor(taskId, taskFunction) {
    this.taskId = taskId;
    this.taskFunction = taskFunction;
    this.scheduledJob = null;
    this.intervalJob = null;
    this.currentInterval = null;  // Store the interval for later use
    this.currentCronSchedule = null;  // Store the cron schedule for later use
  }

  /**
   * Interval-based scheduling with delay
   * @param {number} delaySeconds - Initial delay before first execution
   * @param {number} intervalSeconds - Interval between executions
   * @param {any} args - Arguments to pass to the task function
   */
  intervalSchedule(delaySeconds, intervalSeconds, ...args) {
    if (!this.intervalJob) {
      console.log(`Scheduling task with delay of ${delaySeconds} seconds and interval of ${intervalSeconds} seconds.`);
      console.log(`Arguments passed: ${JSON.stringify(args)}`);

      this.currentInterval = intervalSeconds;  // Store the current interval

      // Initial delay for 'delaySeconds'
      setTimeout(() => {
        console.log(`Executing task for the first time with arguments: ${JSON.stringify(args)}`);
        this.taskFunction(...args);  // First execution with arguments

        // Set up recurring job at 'intervalSeconds' interval
        this.intervalJob = setInterval(() => {
          console.log(`Executing task with interval, arguments: ${JSON.stringify(args)}`);
          this.taskFunction(...args);  // Pass arguments for each execution
        }, intervalSeconds * 1000);
      }, delaySeconds * 1000);
    }
  }

  /**
   * Time-aligned scheduling using a cron-formatted string
   * @param {string} cronSchedule - Cron-formatted string
   * @param {any} args - Arguments to pass to the task function
   */
  timeAlignedSchedule(cronSchedule, ...args) {
    if (!this.scheduledJob) {
      this.currentCronSchedule = cronSchedule;  // Store the current cron schedule
      console.log(`Scheduling task with cron expression: ${cronSchedule}.`);
      console.log(`Arguments passed: ${JSON.stringify(args)}`);

      this.scheduledJob = schedule.scheduleJob(cronSchedule, () => {
        console.log(`Executing task with cron schedule, arguments: ${JSON.stringify(args)}`);
        this.taskFunction(...args);  // Pass arguments to the task function
      });
    }
  }

  /**
   * Dynamically change the interval for the interval-based scheduling
   * @param {number} newIntervalSeconds - New interval in seconds
   */
  setNewInterval(newIntervalSeconds) {
    if (this.intervalJob) {
      clearInterval(this.intervalJob);  // Stop the existing interval-based job
      console.log(`Changing interval to ${newIntervalSeconds} seconds.`);
      this.intervalJob = setInterval(() => {
        console.log(`Executing task with new interval.`);
        this.taskFunction();
      }, newIntervalSeconds * 1000);
      this.currentInterval = newIntervalSeconds;
    }
  }

  /**
   * Dynamically change the cron schedule for time-aligned scheduling
   * @param {string} newCronSchedule - New cron-formatted string
   * @param {any} args - Arguments to pass to the task function
   */
  setNewSchedule(newCronSchedule, ...args) {
    if (this.scheduledJob) {
      this.scheduledJob.cancel();  // Stop the existing cron-based job
      console.log(`Changing cron schedule to: ${newCronSchedule}.`);
      this.scheduledJob = schedule.scheduleJob(newCronSchedule, () => {
        console.log(`Executing task with new cron schedule, arguments: ${JSON.stringify(args)}`);
        this.taskFunction(...args);  // Pass arguments for each execution
      });
      this.currentCronSchedule = newCronSchedule;
    }
  }

  /**
   * Stop any scheduled jobs
   */
  stopScheduling() {
    if (this.intervalJob) {
      clearInterval(this.intervalJob);  // Stop interval-based job
      this.intervalJob = null;
      console.log(`Interval-based scheduling for task ${this.taskId} has been stopped.`);
    }
    if (this.scheduledJob) {
      this.scheduledJob.cancel();  // Stop time-aligned job
      this.scheduledJob = null;
      console.log(`Cron-based scheduling for task ${this.taskId} has been stopped.`);
    }
  }
}


module.exports = TaskScheduler;
