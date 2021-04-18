import { Task, TaskStatus } from '../src/task'

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
        expect(task.status).toEqual('active')
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
      myTask.updateStatus(TaskStatus.DONE)

      expect(myTask).toMatchObject({ status: TaskStatus.DONE })
    })
  })

  describe('#find', () => {
    describe('when the tasks already exist', () => {
      it('should return the task', () => {
        const tasks = []

        const params = {
          id: 1,
          description: 'Task A',
          title: 'Task A',
        }

        const myTask = new Task(params)
        tasks.push(myTask)

        expect(Task.find(tasks, myTask.id)).not.toBeNull()
      })
    })

    describe('when the task does not exist', () => {
      it('should return undefined', () => {
        expect(Task.find([], 1)).toBeUndefined()
      })
    })
  })
})
