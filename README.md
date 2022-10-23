# First get node:
https://nodejs.org/en/download/
---
node -v;
npm -v;
---

# Then get docker desktop:
https://www.docker.com/products/docker-desktop/
```
docker -v;
```

# Then in the "TIME-LOGGER---CSE-115A/" directory run this:
---
npm install;
cd back-end/;
npm install;
cd ../front-end/front-src/;
npm install;
---

# To start the database:
---
cd back-end/;
docker-compose up -d; <--might take a while
cd ../;
---

# TO RUN THE WEB APP (in the "TIME-LOGGER---CSE-115A/" directory):
---
npm start; <--might take a while
---

# Modules(dependencies) to npm install:
---
npm install pg;
npm install dotenv;
---

### Things to discuss with team
* how to store dates in database? I think we should use new Date().getTIme()
* code organization isues in backend
- "payload"
* what specifically will createTask() in HomePage.jsx do?
* what specifically should exports.scheduleTask send back?
* when changing the tasks, will change frontend then change backend seperatlely when adding new task or should we have a callback where the backend function sends the updated task list to the frontend to confirm that the frontend and backend match