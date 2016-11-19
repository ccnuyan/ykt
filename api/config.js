module.exports = {
  url : `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.APP}`,
  morgan:true,
  port:3000,
  networkport:4000
};