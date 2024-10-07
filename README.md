
# EasyTasker - Task Scheduler
**easy-tasker** is a flexible task scheduler for Node.js that supports both interval-based and cron-based scheduling. It allows you to dynamically update the arguments, intervals, and cron schedules during runtime, making it ideal for automating recurring tasks.

## Features
* Interval-based scheduling: Schedule tasks to run at a fixed interval with an optional initial delay.
* Cron-based scheduling: Schedule tasks using cron-formatted expressions for time-aligned execution.
* Dynamic updates: Change the task arguments, intervals, or cron schedules during runtime.
* Optional logging: Enable or disable logging for debugging and development without cluttering production logs.ts.

## Installation
Install the package using npm:
```bash
npm install easy-tasker
```
## Usage
### Interval-based Scheduling

```js
const TaskScheduler = require('easy-tasker');

// Define the task function
function runTask(status, message) {
  console.log(`${status}: ${message}`);
}

// Create a scheduler
const scheduler = new TaskScheduler(runTask, { logging: true, taskId: 'task-001' });

// Schedule an interval-based task
scheduler.intervalSchedule(2, 5, 'Running', 'Initial status');

// Pause the schedule after 10 seconds
setTimeout(() => {
  scheduler.pauseSchedule();
}, 10000);

// Resume the schedule after 15 seconds
setTimeout(() => {
  scheduler.resumeSchedule();
}, 15000);

// Stop the task after 25 seconds
setTimeout(() => {
  scheduler.stopScheduling();
}, 25000);
```
### Cron-based Scheduling
```js
const TaskScheduler = require('easy-tasker');

// Define a task function
function runTask(status, message) {
  console.log(`${status}: ${message}`);
}

// Create a task scheduler with logging disabled
const scheduler = new TaskScheduler(runTask, { logging: false });

// Schedule the task to run every minute using a cron expression
scheduler.timeAlignedSchedule('*/1 * * * *', 'Running', 'Cron-based scheduling');
```
## API
### intervalSchedule(delay, interval, task)
* delay: Time in milliseconds before the task first starts.
* interval: Time in milliseconds for the task to run repeatedly.
* task: The function to execute at each interval.

This method schedules a task to execute after an initial delay and repeatedly at the specified interval.

**Example:**
```js
scheduler.intervalSchedule(2000, 10000, () => {
    console.log('Task runs every 10 seconds after a 2-second delay');
});
```
### timeAlignedSchedule(cronString, task)
* cronString: A cron expression that specifies when the task should run.
* task: The function to execute at the specified time.

This method schedules a task to execute at a specific time using a cron expression.

**Example:**
```js
scheduler.timeAlignedSchedule('0 * * * *', () => {
    console.log('Task runs every hour on the hour');
});
```
### updateArgs(...newArgs)
* newArgs: New arguments to be passed to the task function for future executions.

### setNewInterval(interval)
* interval: The new interval in milliseconds.
This method updates the interval of a running interval-based task.

**Example:**
```js
scheduler.setNewInterval(3000);
```
### setNewSchedule(cronString)
* newCronString:  A new cron-formatted string to update the task schedule.
This method updates the cron expression for a time-aligned task.
**Example:**
```js
scheduler.setNewSchedule('*/5 * * * *');
```
### stopScheduling()
Stops any scheduled jobs, whether interval-based or cron-based. This method will clear the interval or cancel the cron job, effectively stopping the task from executing further.

### pauseSchedule()
Pauses the scheduled task. The task will not execute until resumeSchedule() is called.

### resumeSchedule()
Resumes a paused task, allowing it to continue executing according to its interval or cron schedule.

## Options
The TaskScheduler constructor accepts an optional options object to configure the following:

* taskId: A string identifier for the task, used for logging (optional).
* logging: A boolean that enables or disables logging (default: false).

## Project Structure
```bash
TaskScheduler/
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── src/
│   └── TaskScheduler.js
└── test/
    └── TaskScheduler.test.js
```
* src/TaskScheduler.js: Contains the main logic for scheduling tasks.
* test/TaskScheduler.test.js: Unit tests for the scheduler.
* package.json: NPM configuration file.
* .gitignore: Specifies files and directories to be excluded from version control.
* README.md: This file, providing an overview of the project.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions
Feel free to open issues or submit pull requests to improve the functionality or add new features. Contributions are welcome!

## Tests
To run the test suite, use the following command:
```bash
npm test
```
Make sure you have mocha and chai installed as dev dependencies to ensure smooth test execution.

## Notes
* Ensure that your cron expressions are valid and conform to the typical 5-field format used by node-schedule.
* Tasks can be dynamically updated using the provided methods without the need to restart your application.
