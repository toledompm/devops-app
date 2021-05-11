import * as assert from 'assert'

export enum TaskStatus {
  ACTIVE = 'active',
  DONE = 'done',
}

export class Task {
  public id: number
  public description: string
  public title: string
  public status: TaskStatus

  constructor(params: Partial<Task>) {
    assert.ok(params.id)
    this.id = params.id

    this.description = params?.description || ''
    this.title = params?.title || ''
    this.status = params?.status || TaskStatus.ACTIVE
  }

  public updateStatus(status: TaskStatus): void {
    this.status = status
  }

  public static find(tasks: Task[], id: number): Task {
    return tasks.find((task) => task.id === id)
  }
}
