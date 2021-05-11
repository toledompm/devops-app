import * as express from 'express'
import { Task } from './task'

const tasks = []
let taskIdCounter = 1

const app = express()

app.use(express.json())

app.get('/', (_, res) => res.json({ status: 'ok' }))

app.get('/task/:id', (req, res) => {
  const { id } = req.params
  if (!id) {
    res.sendStatus(400)
    return
  }

  try {
    const parsedId = parseInt(id, 10)
    const foundTask = Task.find(tasks, parsedId)

    if (!foundTask) {
      res.sendStatus(404)
      return
    }

    res.json(foundTask)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

app.post('/task/new', (req, res) => {
  const { body } = req
  if (!Object.keys(body).length) {
    res.sendStatus(400)
    return
  }

  try {
    const newTask = new Task({ id: taskIdCounter, ...body })
    taskIdCounter += 1
    tasks.push(newTask)
    res.status(201).json(newTask)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

app.put('/task/:id/update', (req, res) => {
  const { id } = req.params
  const { status } = req.body
  if (!id || !status) {
    res.sendStatus(400)
    return
  }

  try {
    const taskToUpdate = tasks.find((task) => task.id === parseInt(id, 10))
    if (!taskToUpdate) {
      res.sendStatus(404)
      return
    }

    taskToUpdate.updateStatus(status)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export const App = app
