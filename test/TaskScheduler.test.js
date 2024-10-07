const chai = require('chai');
const expect = chai.expect;
const TaskScheduler = require('../src/TaskScheduler');

describe('TaskScheduler', () => {
  it('should schedule a task using intervalSchedule()', () => {
    const scheduler = new TaskScheduler();
    // Test logic for intervalSchedule
    expect(scheduler).to.have.property('intervalSchedule');
  });
});
