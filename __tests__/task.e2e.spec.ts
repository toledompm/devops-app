import * as request from 'supertest'
import { App } from '../src/app'
import { Task, TaskStatus } from '../src/task'

describe('Task', () => {
  describe('POST /task/new', () => {
    describe('when body is valid', () => {
      it('should return CREATED status', async () => {
        const response = await request(App)
          .post('/task/new')
          .set('Content-type', 'application/json')
          .send({ description: 'desc', title: 'title' })

        expect(response.status).toEqual(201)
        expect(response.body.id).not.toBeNull()
        expect(response.body.description).toEqual('desc')
        expect(response.body.title).toEqual('title')
      })
    })

    describe('when body is not valid or content type is not JSON application', () => {
      it('should return BAD REQUEST status', async () => {
        const response = await request(App).post('/task/new').send({})

        expect(response.status).toEqual(400)
      })
    })
  })

  describe('GET /task/:id', () => {
    describe('when the tasks already exist', () => {
      it('should return OK status and the task body', async () => {
        const taskData = {
          id: 1,
          description: 'desc',
          title: 'title',
          status: TaskStatus.ACTIVE,
        }

        const task = new Task(taskData)

        Task.find = jest.fn().mockReturnValue(task)

        const response = await request(App).get('/task/1')

        expect(response.status).toEqual(200)
        expect(response.body).toMatchObject(taskData)
      })
    })

    describe('when the tasks not exist', () => {
      it('should return NOT FOUND status', async () => {
        const taskSpy = jest.spyOn(Task, 'find')

        taskSpy.mockReturnValue(undefined)

        const response = await request(App).get('/task/1')

        expect(response.status).toEqual(404)
      })
    })
  })
})
