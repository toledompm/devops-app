import { Task, TaskStatus } from './task'

const tasks: Task[] = []

export class TaskService {
  public async findTask(taskId: number): Promise<Task> {
    return tasks.find((task) => task.id === taskId)
  }

  public async createTask(taskParams: Partial<Task>): Promise<Task> {
    const newTask = new Task(taskParams)
    tasks.push(newTask)
    return newTask
  }

  public async updateTaskStatus(
    taskId: number,
    status: TaskStatus
  ): Promise<Task | undefined> {
    const task = await this.findTask(taskId)
    if (!task) return

    task.status = status
    return task
  }
}
