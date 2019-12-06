const Sequelize = require("sequelize")
const sequelize = require("../sequelize")

const HeartrateLog = sequelize.define("heartrate_log", {
  log: {
    type: Sequelize.TEXT, // JSON String of array containing all heartrates
    isPersonalData: true,
  },
  timestamp: {
    type: Sequelize.DATE,
  },
})

module.exports = HeartrateLog
