module.exports = {
  HOST: "localhost",
  USER: "user",
  PASSWORD: "123",
  DB: "signals",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};