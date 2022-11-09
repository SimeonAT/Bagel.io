## First get node:
https://nodejs.org/en/download/
```
node -v;
npm -v;
```
---

## Then get docker desktop:
https://www.docker.com/products/docker-desktop/
```
docker -v;
```
---

## Then in the ```TIME-LOGGER---CSE-115A/``` directory run this:
```
npm run getdeps;
```
---

## To start the database:
```
cd back-end/;
docker-compose up -d; <--might take a while
cd ../;
```
---

## TO RUN THE WEB APP (in the "TIME-LOGGER---CSE-115A/" directory):
```
npm start; <--might take a while
```
---

## Things to discuss with team
* ~~how to store dates in database? I think we should use new Date().toISOString()~~
* ~~code organization isues in backend~~
    * ~~"payload"~~
* ~~what specifically will createTask() in HomePage.jsx do?~~
* ~~what specifically should exports.scheduleTask send back?~~
* ~~when changing the tasks, will change frontend then change backend seperatlely when adding new task or should we have a callback where the backend function sends the updated task list to the frontend to confirm that the frontend and backend match~~
* ~~User has to click back button twice to go back~~
* ~~in HomePage.jsx: make it so you cant type dates in date picker (must click dates) this endures that the date will be~~ formatted correctly~~
* ~~taskListToRender and updateList => taskListToRender and setTaskListToRender~~
* ~~suggestion for variables in general: try not to assign "baz = foo.bar", keep things as "foo.bar" when possible, that way its easier for those reading the code to pick it up easily~~
* ~~search codebas for "taskid={taskid}": can you add whatever ~~prop you want to react components??
* ~~when adding a new task: HomePage.jsx:76 runs twice~~
* in update task shouldnt we be able to update name of a task too?
* backend testing: unable to send request body when calling endpoint
* naming stuff: 
    * react component file name == name of component when its used, 
    * fetch endpoint directly instead of const variable






