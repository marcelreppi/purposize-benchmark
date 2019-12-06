const Sequelize = require("sequelize")
const sequelize = require("../sequelize")

const HeartrateLog = sequelize.define(
  "heartrateLog",
  {
    log: {
      type: Sequelize.TEXT, // JSON String of array containing all heartrates
      isPersonalData: true,
    },
    timestamp: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: "heartrate_logs",
  }
)

module.exports = HeartrateLog
