import { Task, TaskStatus } from '../src/task/task'
import { TaskService } from '../src/task/taskService'

const taskRepositoryMock = {
  save: jest.fn(),
  findById: jest.fn(),
  updateTask: jest.fn(),
}

jest.mock('../src/task/taskRepository', () => {
  return {
    TaskRepositoryImpl: jest.fn().mockImplementation(() => taskRepositoryMock),
  }
})

describe('taskService', () => {
  const taskService = new TaskService()

  const mockTaskParams = {
    description: 'Install the windows',
    title: 'Destroy your pc',
    status: TaskStatus.ACTIVE,
  }
  const mockId = 1

  const mockTask = {
    ...mockTaskParams,
    id: mockId,
  }

  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('#findTask', () => {
    let response: Task

    beforeEach(async () => {
      taskRepositoryMock.findById.mockReturnValue(mockTask)
      response = await taskService.findTask(mockId)
    })

    it('should match the return value from repository', () => {
      expect(response).toBe(mockTask)
    })

    it('should have called taskRepository', () => {
      expect(taskRepositoryMock.findById).toHaveBeenCalledWith(mockId)
    })
  })

  describe('#createTask', () => {
    let response: Task

    beforeEach(async () => {
      taskRepositoryMock.save.mockReturnValue(mockTask)
      response = await taskService.createTask(mockTaskParams)
    })

    it('should match the return value from repository', () => {
      expect(response).toBe(mockTask)
    })

    it('should have called taskRepository', () => {
      expect(taskRepositoryMock.save).toHaveBeenCalledWith(mockTaskParams)
    })
  })

  describe('#updateTask', () => {
    let response: boolean

    beforeEach(async () => {
      taskRepositoryMock.updateTask.mockReturnValue([1])
      response = await taskService.updateTaskStatus(mockId, TaskStatus.DONE)
    })

    it('should match the return value from repository', () => {
      expect(response).toBe(true)
    })

    it('should have called taskRepository', () => {
      expect(taskRepositoryMock.updateTask).toHaveBeenCalledWith(
        mockId,
        TaskStatus.DONE
      )
    })
  })
})
