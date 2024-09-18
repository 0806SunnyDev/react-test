module.exports = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test",
  SECRET_KEY: process.env.SECRET_KEY || "REACT_SKILL_TEST",
  APP_PORT: process.env.APP_PORT || 8000
}