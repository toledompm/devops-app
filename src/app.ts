import * as express from 'express'
import { TaskService } from './task/taskService'

const taskService = new TaskService()

const app = express()

app.use(express.json())

app.get('/', (_, res) => res.json({ status: 'ok' }))

app.get('/task/:id', async (req, res) => {
  const { id } = req.params
  if (!id) return res.sendStatus(400)

  try {
    const parsedId = parseInt(id, 10)
    const foundTask = await taskService.findTask(parsedId)

    if (!foundTask) return res.sendStatus(404)

    res.json(foundTask)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

app.post('/task/new', async (req, res) => {
  const { body } = req
  if (!Object.keys(body).length) return res.sendStatus(400)

  try {
    const newTask = await taskService.createTask(body)
    res.status(201).json(newTask)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

app.put('/task/:id/update', async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!id || !status) return res.sendStatus(400)

  try {
    const parsedId = parseInt(id, 10)
    const updateResult = await taskService.updateTaskStatus(parsedId, status)

    if (!updateResult) return res.sendStatus(404)

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export const App = app
