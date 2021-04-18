import { App } from './app'

const { PORT } = process.env
App.listen(PORT, () => console.log('Server listening on port', PORT))
