const supertest = require('supertest');
const http = require('http');

// const dbUtils = require('./dbUtils')
const { server } = require('../index.js');

let testingServer;

const collinTags = {
  tagList: [
    'cooking',
    'Work',
    'Study',
    'Exercise',
    'Chores',
    'Socialization',
    'Hobbies',
    'Rest',
    'Nourishment',
    'Relaxation'
  ]
};

const registerFlembert = {
  "loginAllowed": true,
  "payload": {
    "email": "flembert@gmail.com",
    "password": "flembert101",
    "tasks": [],
    "username": "flembert",
  },
}

const collinTasks = [
  {
    name: 'Make Dinner',
    startDate: '2021-11-03T02:44:18Z',
    endDate: '2021-11-03T08:44:18Z',
    tag: 'cooking',
    complete: false,
    checkedIn: false,
    taskid: 'cb81de43-87f6-482e-b109-7b46e76b830e'
  }
]

const loginCollin = {
  loginAllowed: true,
  payload: {
    username: 'collin',
    password: 'testpass1',
    email: 'collin@ucsc.edu',
    tasks: collinTasks
  }
}

const getTasksCollin = {
  taskList: collinTasks
}

const collinNewTask = {
  complete: false,
  checkedIn: false,
  endDate: '2021-11-06T02:44:18Z',
  name: 'knit',
  startDate: '2021-11-05T02:44:18Z',
  username: 'collin',
  tag: 'hobbies'
}

beforeAll(() => {
  testingServer = http.createServer(server);
  testingServer.listen();
  request = supertest(testingServer);
  // dbUtils.resetDB();
  return;
});

afterAll((done) => {
  testingServer.close(done);
});

test('GET request invalid endpoint', async () => {
  // console.log('gothere2')
  // console.log(await dbUtils.testQuery());
  await request.get('/notanendpoint')
    .expect(404);
});

test('POST setuptesting', async () => {
  await request.post('/setuptesting')
    .send({ hi1: 'hello1' })
    .then((response) => {
      console.log(response.body);
    });
});

test('POST register', async () => {
  await request.post('/register')
    .send({username:"flembert", email:"flembert@gmail.com", password:"flembert101"})
    .then((response) => {
      console.log(response.body);
      expect(response.body).toEqual(registerFlembert);
    })
});

test('POST logindatabase', async () => {
  await request.post('/logindatabase')
    .send({username:"collin", email:"collin@ucsc.edu", password:"testpass1"})
    .then((response) => {
      // console.log(response.body);
      // console.log(response.body.payload.tasks);
      expect(response.body).toEqual(loginCollin);
    })
});

test('POST getTasks', async () => {
  await request.post('/getTasks')
    .send({username:"collin"})
    .then((response) => {
      console.log(response.body);
      expect(response.body).toEqual(getTasksCollin);
    })
});

test('POST scheduleTask', async () => {
  await request.post('/scheduletask')
    .send({username:"collin", taskName:"knit", startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies"})
    .then((response) => {
      console.log(response.body);
      collinNewTask["taskid"] = response.body.taskid;
      expect(response.body).toEqual(collinNewTask);
    })
});

test('POST updateTask', async () => {
  await request.post('/updateTask')
    .send({taskId:collinNewTask.taskid, taskName:"read", startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies", complete:false })
    .then((response) => {
      console.log(response.body);
      expect(response.body).toEqual({ success: true });
    })
});

test('POST fetchTags', async () => {
  await request.post('/fetchTags')
    .send({ username: 'collin' })
    .then((response) => {
      console.log(response.body);
      expect(response.body).toEqual(collinTags);
    })
});





