const fs = require('fs');
const {Pool} = require('pg');

require('dotenv').config();
process.env.POSTGRES_DB='test';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const runSQL = async (file) => {
    const content = fs.readFileSync(file, 'utf8');
    const statements = content.split(/\r?\n/);
    for (const statement of statements) {
        await pool.query(statement);
    }
};

const resetDB = async () => {
    await runSQL('sql/schema.sql');
    await runSQL('sql/data.sql');
    await runSQL('sql/indexes.sql');
};

const supertest = require('supertest');
const http = require('http');

// const db = require('./dbSetup');
const { server } = require('../index.js');

let testingServer;

beforeAll(() => {
    testingServer = http.createServer(server);
    testingServer.listen();
    request = supertest(testingServer);
    resetDB();
    return;
});

afterAll((done) => {
    testingServer.close(done);
});

test('GET request invalid endpoint', async () => {
    await request.get('/notanendpoint')
        .expect(404);
});

test('POST setuptesting', async () => {
    await request.post('/setuptesting')
        .set({ 'mode': 'cors', 'Content-Type': 'application/json' })
        .send({hi1: 'hello1'})
        .then((response) => {
            console.log(response.body);
        });
});

test('POST fetchTags', async () => {
    await request.post('/fetchTags')
        .set({ 'mode': 'cors', 'Content-Type': 'application/json' })
        .send({username: 'collin'})
        .then((response) => {
            console.log(response.body);
        });
});





