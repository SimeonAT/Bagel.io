require('dotenv').config();
const { server } = require('./index.js');

const PORT = 8000;

server.listen(PORT, () => {
    console.log("Server is working");
});
