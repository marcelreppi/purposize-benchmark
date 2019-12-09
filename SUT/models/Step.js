const Sequelize = require("sequelize")
const sequelize = require("../sequelize")

const Step = sequelize.define("step", {
  value: {
    type: Sequelize.INTEGER,
    isPersonalData: true,
  },
  date: {
    type: Sequelize.DATE,
  },
})

module.exports = Step
