docker mongodb [https://hub.docker.com/r/library/mongo](https://hub.docker.com/r/library/mongo)

built-in roles [https://docs.mongodb.org/manual/reference/built-in-roles/](https://docs.mongodb.org/manual/reference/built-in-roles/)

# start a server
```
docker run -p 27017:27017 -d --name mongodb mongo --auth
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
db.createUser({user:'dbadmin',pwd:'adminpass',roles:['userAdminAnyDatabase','dbAdminAnyDatabase']})

db.auth('dbadmin','adminpass')

//create user
//dev test 的用户名与密码应该一致
use $APP_DEV
db.createUser({user:'user',pwd:'pass',roles:['dbAdmin','readWrite']})

use $APP_TEST
db.createUser({user:'user',pwd:'pass',roles:['dbAdmin','readWrite']})

db.auth('user','pass')
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
