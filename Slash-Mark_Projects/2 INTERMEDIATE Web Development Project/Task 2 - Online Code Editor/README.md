## Set Up the Project
- clone the repo
```bash
git clone 
```
- open the server folder inside the repo folder 
```bash
cd  code_executer
```

- install all dependencies
```bash
npm i
```
- pull node and gcc docker image
```bash
# pull latest node image
docker pull node
# pull latest gcc image
docker pull gcc

docker pull python
docker pull openjdk
docker pull rabbitmq

```
- run RabbitMq and bind it to port 5672 in a terminal instance
```bash
docker run \
-p 5672:5672 \
rabbitmq
```
- open another terminal instance and run the node server, from server folder
```bash
# go to server folder
cd server
# start the server
npm start
```
- open another terminal instance and serve the index.html, from client folder
```bash
# go from server folder to  client folder
cd ../client
# create a static server 
npx serve
```

> make sure `3000`, `3010`, `5672` are not bussyyyy!!

## load test
- install loadtest
```bash
npm i -g loadtest
```

- test the server
```bash
# send 1000 reqs with an concorency level 100
loadtest -n 1000 -c 100 http://localhost:3010
```


