import { Task, TaskStatus } from './task'
import { TaskRepository, TaskRepositoryImpl } from './taskRepository'

export class TaskService {
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepositoryImpl()
  }
  public async findTask(taskId: number): Promise<Task> {
    return await this.taskRepository.findById(taskId)
  }

  public async createTask(taskParams: Partial<Task>): Promise<Task> {
    const newTask = new Task(taskParams)
    return await this.taskRepository.save(newTask)
  }

  public async updateTaskStatus(
    taskId: number,
    status: TaskStatus
  ): Promise<boolean> {
    const [affectedRows] = await this.taskRepository.updateTask(taskId, status)
    if (affectedRows !== 1) return false
    return true
  }
}
