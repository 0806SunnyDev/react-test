module.exports = {
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/test",
  SECRET_KEY: process.env.SECRET_KEY || "REACT_SKILL_TEST",
  APP_PORT: process.env.APP_PORT || 8000
}