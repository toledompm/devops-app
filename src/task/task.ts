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
    Object.assign(this, { status: TaskStatus.ACTIVE }, params)
  }
}
