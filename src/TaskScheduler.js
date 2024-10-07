const schedule = require('node-schedule');

class TaskScheduler {
  constructor(taskFunction, options = {}) {
    this.taskFunction = taskFunction;
    this.scheduledJob = null;
    this.intervalJob = null;
    this.args = []; // Store arguments for dynamic updates
    this.currentInterval = null;  // Store the interval for later use
    this.currentCronSchedule = null;  // Store the cron schedule for later use
    this.isPaused = false;  // Track whether the task is paused
    this.loggingEnabled = options.logging || false;  // Enable or disable logging
    this.taskId = options.taskId || null;  // Task ID for logging (optional)
  }

  log(message) {
    if (this.loggingEnabled) {
      if (this.taskId) {
        console.log(`[Task: ${this.taskId}] ${message}`);
      } else {
        console.log(message);
      }
    }
  }

  intervalSchedule(delaySeconds, intervalSeconds, ...args) {
    if (!this.intervalJob) {
      this.args = args;  // Set the initial arguments
      this.currentInterval = intervalSeconds;

      this.log(`Scheduling task with delay of ${delaySeconds} seconds and interval of ${intervalSeconds} seconds.`);
      this.log(`Arguments passed: ${JSON.stringify(this.args)}`);

      setTimeout(() => {
        if (!this.isPaused) {
          this.log(`Executing task for the first time with arguments: ${JSON.stringify(this.args)}`);
          this.taskFunction(...this.args);
        }

        this.intervalJob = setInterval(() => {
          if (!this.isPaused) {
            this.log(`Executing task with interval, arguments: ${JSON.stringify(this.args)}`);
            this.taskFunction(...this.args);
          }
        }, intervalSeconds * 1000);
      }, delaySeconds * 1000);
    }
  }

  timeAlignedSchedule(cronSchedule, ...args) {
    if (!this.scheduledJob) {
      this.args = args;
      this.currentCronSchedule = cronSchedule;

      this.log(`Scheduling task with cron expression: ${cronSchedule}.`);
      this.log(`Arguments passed: ${JSON.stringify(this.args)}`);

      this.scheduledJob = schedule.scheduleJob(cronSchedule, () => {
        if (!this.isPaused) {
          this.log(`Executing task with cron schedule, arguments: ${JSON.stringify(this.args)}`);
          this.taskFunction(...this.args);
        }
      });
    }
  }

  pauseSchedule() {
    this.isPaused = true;
    this.log(`Task has been paused.`);
  }

  resumeSchedule() {
    if (this.isPaused) {
      this.isPaused = false;
      this.log(`Task has been resumed.`);
    }
  }

  updateArgs(...newArgs) {
    this.args = newArgs; // Update arguments
    this.log(`Arguments updated to: ${JSON.stringify(this.args)}`);
  }

  setNewInterval(newIntervalSeconds) {
    if (this.intervalJob) {
      clearInterval(this.intervalJob);
      this.log(`Changing interval to ${newIntervalSeconds} seconds.`);

      this.intervalJob = setInterval(() => {
        if (!this.isPaused) {
          this.log(`Executing task with updated interval, arguments: ${JSON.stringify(this.args)}`);
          this.taskFunction(...this.args);
        }
      }, newIntervalSeconds * 1000);

      this.currentInterval = newIntervalSeconds;
    }
  }

  setNewSchedule(newCronSchedule) {
    if (this.scheduledJob) {
      this.scheduledJob.cancel();
      this.log(`Changing cron schedule to: ${newCronSchedule}.`);

      this.scheduledJob = schedule.scheduleJob(newCronSchedule, () => {
        if (!this.isPaused) {
          this.log(`Executing task with new cron schedule, arguments: ${JSON.stringify(this.args)}`);
          this.taskFunction(...this.args);
        }
      });

      this.currentCronSchedule = newCronSchedule;
    }
  }

  stopScheduling() {
    if (this.intervalJob) {
      clearInterval(this.intervalJob);
      this.intervalJob = null;
      this.log(`Interval-based scheduling has been stopped.`);
    }
    if (this.scheduledJob) {
      this.scheduledJob.cancel();
      this.scheduledJob = null;
      this.log(`Cron-based scheduling has been stopped.`);
    }
  }
}

module.exports = TaskScheduler;
