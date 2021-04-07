const Task = require('../src/task')

describe('Task', () => {
  describe('#constructor', () => {
    describe('when all params are valids', () => {
      it('should returns success', () => {
        const params = {
          id: 1,
          description: 'Install the windows',
          title: 'Destroy your pc',
        }

        const task = new Task(params)

        expect(task.id).toEqual(1)
        expect(task.description).toEqual(params.description)
        expect(task.title).toEqual(params.title)
        expect(task.status).toEqual('ACTIVE')
      })
    })

    describe('when the id is invalid', () => {
      it('should throws an error', () => {
        const params = {
          id: null,
        }

        expect(() => new Task(params)).toThrowError()
      })
    })
  })

  describe('#updateStatus', () => {
    it('should updates the task status', () => {
      const params = {
        id: 1,
        description: 'Task A',
        title: 'Task A',
      }

      const myTask = new Task(params)

      expect(
        ((task) => {
          task.updateStatus('DONE')
          return task
        })(myTask)
      ).toMatchObject({ status: 'DONE' })
    })
  })
})
