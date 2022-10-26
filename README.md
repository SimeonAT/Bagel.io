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
* how to store dates in database? I think we should use new Date().getTIme() [DONE]
* code organization isues in backend [DONE]
- "payload"
* what specifically will createTask() in HomePage.jsx do? [DONE]
* what specifically should exports.scheduleTask send back? [DONE]
* when changing the tasks, will change frontend then change backend seperatlely when adding new task or should we have a callback where the backend function sends the updated task list to the frontend to confirm that the frontend and backend match [DONE]
* User has to click back button twice to go back [TODO]
* in HomePage.jsx: make it so you cant type dates in date picker (must click dates) this endures that the date will be formatted correctly [TODO]
* taskListToRender and updateList => taskListToRender and setTaskListToRender [TODO]
* suggestion for variables in general: try not to assign "baz = foo.bar", keep things as "foo.bar" when possible, that way its easier for those reading the code to pick it up easily [TODO]
* search codebas for "taskid={taskid}": can you add whatever prop you want to react components?? [TODO]
* when adding a new task: HomePage.jsx:76 runs twice [TODO]