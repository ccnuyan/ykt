##Indexes

db.records.createIndex({SysAppId:1})
db.records.createIndex({EventType:1})
db.records.createIndex({UserId:1})
db.records.createIndex({"EventContext.CourseId":1})
db.records.getIndexes()