const Sequelize = require("sequelize")
const sequelize = require("../sequelize")

const StepLog = sequelize.define(
  "stepLog",
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
    tableName: "step_logs",
  }
)

module.exports = StepLog
