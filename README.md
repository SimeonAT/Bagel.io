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