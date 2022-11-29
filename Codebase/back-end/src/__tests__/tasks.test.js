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

describe('POST register: valid input', () => {
  test('All fields correct', async () => {
    await request.post('/register')
    .send({username:"flembert", email:"flembert@gmail.com", password:"flembert101"})
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual(registerFlembert);
    })
  });

  test('Username already exists', async () => {
    await request.post('/register')
      .send({username:"flembert", email:"flembert@gmail.com", password:"flembert101"})
      .expect(403);
  });
});

describe('POST register: invalid input', () => {
  test('All fields blank', async () => {
    await request.post('/register')
      .send({username:"", email:"", password:""})
      .expect(422);
  });

  test('Password blank', async () => {
    await request.post('/register')
      .send({username:"flembert", email:"flembert@gmail.com", password:""})
      .expect(422);
  });

  test('Email blank', async () => {
    await request.post('/register')
      .send({username:"flembert", email:"", password:"flembert101"})
      .expect(422);
  });

  test('Username blank', async () => {
    await request.post('/register')
      .send({username:"", email:"flembert@gmail.com", password:"flembert101"})
      .expect(422);
  });
});

describe('POST loginDatabase: valid input', () => {
  test('All fields correct', async () => {
    await request.post('/logindatabase')
      .send({username:"collin", password:"testpass1"})
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(loginCollin);
    })
  });

  test('Password incorrect', async () => {
    await request.post('/logindatabase')
      .send({username:"collin", password:"wrongpass"})
      .expect(403);
  });
  
  test('User does not exist', async () => {
    await request.post('/logindatabase')
      .send({username:"graham", password:"testpass1"})
      .expect(403);
  });

});

describe('POST loginDatabase: invalid input', () => {
  test('Password blank', async () => {
    await request.post('/logindatabase')
      .send({username:"collin", email:"collin@ucsc.edu", password:""})
      .expect(422);
  });

  test('Username blank', async () => {
    await request.post('/logindatabase')
      .send({username:"", password:"testpass1"})
      .expect(422);
  });
});

describe('POST getTasks: valid input', () => {
  test('Username exists', async () => {
    await request.post('/getTasks')
      .send({username:"collin"})
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(getTasksCollin);
      })
  });
});

describe('POST getTasks: invalid input', () => {
  test('Username blank', async () => {
    await request.post('/getTasks')
      .send({username:""})
      .expect(422);
  });
});

describe('POST scheduleTask: valid input', () => {
  test('All fields correct', async () => {
    await request.post('/scheduletask')
      .send({username:"collin", taskName:"knit", startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies"})
      .expect(200)
      .then((response) => {
        collinNewTask["taskid"] = response.body.taskid;
        expect(response.body).toEqual(collinNewTask);
      })
  });
});

describe('POST scheduleTask: invalid input', () => {
  test('All fields blank', async () => {
    await request.post('/scheduletask')
      .send({username:"", taskName:"", startDate:"", endDate:"", tag:""})
      .expect(500);
  });
});

describe('POST updateTask: valid input', () => {
  test('All fields correct', async () => {
    await request.post('/updateTask')
      .send({ taskId:collinNewTask.taskid, checkedIn: false, startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies", complete:false })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ success: true });
      })
  });
});

describe('POST updateTask: invalid input', () => {
  test('All fields blank', async () => {
    await request.post('/updateTask')
      .send({taskId:"", checkedIn: undefined, startDate:"", endDate:"", tag:"", complete: undefined})
      .expect(422);
  });

  test('Complete field blank', async () => {
    await request.post('/updateTask')
      .send({taskId:collinNewTask.taskid, checkedIn: false, startDate:"2021-11-05T02:44:18Z", endDate:"2021-11-06T02:44:18Z", tag:"hobbies"})
      .expect(422);
  });
});

describe('POST fetchTags: valid input', () => {
  test('Username has custom tags', async () => {
    await request.post('/fetchTags')
      .send({ username: 'collin' })
      .expect(200)
      .then((response) => {
        // console.log(response.body);
        expect(response.body).toEqual(collinTags);
      })
  });

  test('Username has no custom tags', async () => {
    await request.post('/fetchTags')
      .send({ username: 'simeon' })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(simeonTags);
      })
  });
});

describe('POST fetchTags: invalid input', () => {
  test('Username blank', async () => {
    await request.post('/fetchTags')
      .send({ username: '' })
      .expect(422);
  });
});




