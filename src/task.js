const assert = require('assert')

class Task {
  constructor(params) {
    assert.ok(params.id)
    this.id = params.id

    this.description = params?.description || ''
    this.title = params?.title || ''
    this.status = 'ACTIVE'
  }

  updateStatus(status) {
    this.status = status
  }

  static find(tasks, id) {
    return tasks.find((task) => task.id === parseInt(id, 10))
  }
}

module.exports = Task
