
### EasyTasker - Task Scheduler
TaskScheduler is a flexible and easy-to-use scheduling library designed to manage tasks based on either fixed intervals or cron-formatted schedules. This package is ideal for handling tasks in scenarios where you need rate-limited operations or time-aligned scheduling.

## Features
* Schedule tasks to run at configurable intervals.
* Align task execution to specific times using cron-formatted strings.
* Dynamically update intervals or cron schedules without restarting tasks.
* Lightweight and easy integration into Node.js projects.

## Installation
Install the package using npm:
```bash
npm install easy-tasker
```
## Usage
Here is how you can use **TaskScheduler** in your Node.js project:
```js
const TaskScheduler = require('easy-tasker');

const scheduler = new TaskScheduler();

// Schedule a task to run every 5 seconds, starting after a 1 second delay
scheduler.intervalSchedule(1000, 5000, () => {
    console.log('Task executed every 5 seconds');
});

// Schedule a task using a cron expression to run every minute
scheduler.timeAlignedSchedule('*/1 * * * *', () => {
    console.log('Task executed every minute');
});

// Update the interval of a running interval-based task
scheduler.setNewInterval(3000); // Set the interval to 3 seconds

// Update the cron expression for a time-aligned task
scheduler.setNewSchedule('*/5 * * * *'); // Run every 5 minutes

// Stop the scheduler
scheduler.stopScheduling(); // Stop any scheduled jobs
```
## API
# intervalSchedule(delay, interval, task)
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
# timeAlignedSchedule(cronString, task)
* cronString: A cron expression that specifies when the task should run.
* task: The function to execute at the specified time.

This method schedules a task to execute at a specific time using a cron expression.

**Example:**
```js
scheduler.timeAlignedSchedule('0 * * * *', () => {
    console.log('Task runs every hour on the hour');
});
```
# setNewInterval(interval)
* interval: The new interval in milliseconds.
This method updates the interval of a running interval-based task.

**Example:**
```js
scheduler.setNewInterval(3000);
```
# setNewSchedule(cronString)
* newCronString:  A new cron-formatted string to update the task schedule.
This method updates the cron expression for a time-aligned task.
**Example:**
```js
scheduler.setNewSchedule('*/5 * * * *');
```

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