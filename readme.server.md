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

```
docker rmi -f ykt:1.0
docker rm -f api-stats
docker build -t ykt:1.0 .
docker run -d --env-file ./env.list --name api-stats -p 3000:3000 ykt:1.0 npm run start-api
```

```
docker rmi -f ykt:1.0
docker rm -f computetask
docker build -t ykt:1.0 .
docker run -d --env-file ./env.list --name computetask ykt:1.0 npm run start-computetask
```

```
docker rmi -f ykt:1.0
docker rm -f api-hit
docker build -t ykt:1.0 .
docker run -d --env-file ./env.list --name api-hit -p 4000:4000 ykt:1.0 npm run start-network
```

```
docker rmi -f ykt-task:1.0
docker rm -f copytask
docker build -f Dockerfile.Task -t ykt-task:1.0 .
docker run -d --env-file ./env.list --name copytask -v ~/mongotemp:/data/mongodb ykt-task:1.0 npm run start-copyeveryday
```

# nginx 
```
server{
    location /api/stats{
        proxy_pass http://localhost:3000/;
    }
    location /api/hit{
        proxy_pass http://localhost:4000/;
    }
}
```

