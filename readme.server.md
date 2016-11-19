docker mongodb [https://hub.docker.com/r/library/mongo](https://hub.docker.com/r/library/mongo)

built-in roles [https://docs.mongodb.org/manual/reference/built-in-roles/](https://docs.mongodb.org/manual/reference/built-in-roles/)

# start a server
```
docker run -p 30000:27017 -d --name mongodb-auth -v ~/mongodata:/data/db daocloud.io/library/mongo:3.2.0 --auth
docker run -p 30000:27017 -d --name mongodb -v ~/mongodata:/data/db daocloud.io/library/mongo:3.2.0
```

# connect to it

```
docker exec -it mongodb-auth mongo admin
docker exec -it mongodb mongo admin
```

## create userAdmin
```
//create admin
use admin
db.createUser({user:'ccnuyan',pwd:'$PASS',roles:['userAdminAnyDatabase','dbAdminAnyDatabase']})

db.auth('ccnuyan','$pass')

//create user
use $APP
db.createUser({user:'$APP',pwd:'$PASS',roles:['dbAdmin','readWrite']})
```

# backup
[https://docs.mongodb.org/manual/reference/program/mongoredump/](https://docs.mongodb.org/manual/reference/program/mongoredump/)
```
mongodump --host $MONGO_HOST -u $MONGO_ADMIN_USER -p $MONGO_ADMIN_PASS --out ./backup/db
```

# restore
[https://docs.mongodb.org/manual/reference/program/mongorestore/](https://docs.mongodb.org/manual/reference/program/mongorestore/)
```
mongorestore --host $MONGO_HOST -u $MONGO_ADMIN_USER -p $MONGO_ADMIN_PASS --drop ./backup/db
```

# import & export
```
`mongoimport --host ${url} -u ${username} -p ${password} --db ${app} --collection records --file ${i}.json`
`mongoexport  --host ${url} -u ${username} -p ${password}  --db 2016Actions --collection ${i} --out ${i}.json`
```

# services
docker rmi -f ykt:0.0.1
docker build -t ykt:0.0.1 .

docker run -it --env-file ./env.list --name api ykt:0.01 npm run start-api
docker run -it --env-file ./env.list --name copytask ykt:0.01 npm run start-copyeveryday
docker run -it --env-file ./env.list --name computetask ykt:0.01 npm run start-computetask

