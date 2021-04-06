# TODO APP

NodeJS api to manage tasks.

## Setup

`npm install`

## Run it

`PORT=<some-port> npm start`

## Routes

#### New Task

```bash
# body:
#  {
#    description: text,
#    title: text,
#    status: ACTIVE || DONE
#  }
POST @localhost:PORT/task/new
```

#### Find task by ID

```bash
GET @localhost:PORT/task/:id
```

#### Update status by ID

```bash
# body:
#  {
#    status: ACTIVE || DONE
#  }
PUT @localhost:PORT/task/:id/update
```
