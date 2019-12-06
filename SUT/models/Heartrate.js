const Sequelize = require("sequelize")
const sequelize = require("../sequelize")

const Heartrate = sequelize.define("heartrate", {
  value: {
    type: Sequelize.INTEGER,
    isPersonalData: true,
  },
  timestamp: {
    type: Sequelize.DATE,
  },
})

module.exports = Heartrate
