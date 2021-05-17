import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize'
import { Task, TaskStatus } from './task'

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
})

const TaskModel = sequelize.define(
  'Task',
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
)

export interface TaskRepository {
  save(task: Task): Promise<any>
  findById(id: number): Promise<any>
  updateTask(id: number, status: TaskStatus): Promise<any>
}

export class TaskRepositoryImpl implements TaskRepository {
  private model: ModelCtor<Model<any, any>>

  constructor() {
    this.model = TaskModel
  }

  public async save(task: Task): Promise<any> {
    return this.model.build(task).save()
  }

  public async findById(id: number): Promise<any> {
    return this.model.findByPk(id)
  }

  public async updateTask(id: number, status: TaskStatus): Promise<any> {
    return this.model.update({ status }, { where: { id } })
  }
}
