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

const simeonTags = {
  tagList: [
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

// Tests start here -----------------------------------------------

test('GET request invalid endpoint', async () => {
  await request.get('/notanendpoint')
    .expect(404);
});

test('POST register: all fields correct', async () => {
  await request.post('/register')
    .send({username:"flembert", email:"flembert@gmail.com", password:"flembert101"})
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(registerFlembert);
    })
});

test('POST register: all fields blank', async () => {
  await request.post('/register')
    .send({username:"", email:"", password:""})
    .expect(422);
});

test('POST register: password blank', async () => {
  await request.post('/register')
    .send({username:"flembert", email:"flembert@gmail.com", password:""})
    .expect(422);
});

test('POST register: email blank', async () => {
  await request.post('/register')
    .send({username:"flembert", email:"", password:"flembert101"})
    .expect(422);
});

test('POST register: username blank', async () => {
  await request.post('/register')
    .send({username:"", email:"flembert@gmail.com", password:"flembert101"})
    .expect(422);
});

test('POST register: username already exists', async () => {
  await request.post('/register')
    .send({username:"flembert", email:"flembert@gmail.com", password:"flembert101"})
    .expect(403);
});

test('POST logindatabase: all fields correct', async () => {
  await request.post('/logindatabase')
    .send({username:"collin", password:"testpass1"})
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(loginCollin);
    })
});

test('POST logindatabase: password blank', async () => {
  await request.post('/logindatabase')
    .send({username:"collin", email:"collin@ucsc.edu", password:""})
    .expect(422);
});

test('POST logindatabase: username blank', async () => {
  await request.post('/logindatabase')
    .send({username:"", password:"testpass1"})
    .expect(422);
});

test('POST logindatabase: password incorrect', async () => {
  await request.post('/logindatabase')
    .send({username:"collin", password:"wrongpass"})
    .expect(403);
});

test('POST logindatabase: user does not exist', async () => {
  await request.post('/logindatabase')
    .send({username:"graham", password:"testpass1"})
    .expect(403);
});

test('POST getTasks: username exists', async () => {
  await request.post('/getTasks')
    .send({username:"collin"})
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(getTasksCollin);
    })
});

test('POST getTasks: username does not exist', async () => {
  await request.post('/getTasks')
    .send({username:"graham"})
    .expect(404);
});

test('POST getTasks: username blank', async () => {
  await request.post('/getTasks')
    .send({username:""})
    .expect(422);
});

test('POST scheduleTask: all fields correct', async () => {
  await request.post('/scheduletask')
    .send({username:"collin", taskName:"knit", startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies"})
    .expect(200)
    .then((response) => {
      collinNewTask["taskid"] = response.body.taskid;
      expect(response.body).toEqual(collinNewTask);
    })
});

test('POST scheduleTask: all fields blank', async () => {
  await request.post('/scheduletask')
    .send({username:"", taskName:"", startDate:"", endDate:"", tag:""})
    .expect(500);
});

test('POST updateTask: all fields correct', async () => {
  await request.post('/updateTask')
    .send({ taskId:collinNewTask.taskid, checkedIn: false, startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies", complete:false })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({ success: true });
    })
});

test('POST updateTask: all fields blank', async () => {
  await request.post('/updateTask')
    .send({taskId:"", checkedIn: undefined, startDate:"", endDate:"", tag:"", complete: undefined})
    .expect(422);
});

test('POST updateTask: complete field blank', async () => {
  await request.post('/updateTask')
    .send({taskId:collinNewTask.taskid, checkedIn: false, startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies"})
    .expect(422);
});

test('POST fetchTags: username has custom tags', async () => {
  await request.post('/fetchTags')
    .send({ username: 'collin' })
    .expect(200)
    .then((response) => {
      // console.log(response.body);
      expect(response.body).toEqual(collinTags);
    })
});

test('POST fetchTags: username has no custom tags', async () => {
  await request.post('/fetchTags')
    .send({ username: 'simeon' })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(simeonTags);
    })
});

test('POST fetchTags: username blank', async () => {
  await request.post('/fetchTags')
    .send({ username: '' })
    .expect(422);
});





