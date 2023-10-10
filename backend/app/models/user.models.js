module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING(100),
      required: true
    },
    email: {
      type: Sequelize.STRING(50),
      required: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING(),
      required: true
    }
  });
  return User;
}