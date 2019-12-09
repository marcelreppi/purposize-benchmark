const User = require("./User")
const Heartrate = require("./Heartrate")
const HeartrateLog = require("./HeartrateLog")
const Step = require("./Step")
const StepLog = require("./StepLog")

HeartrateLog.belongsTo(User)
User.hasMany(HeartrateLog)

StepLog.belongsTo(User)
User.hasMany(StepLog)

module.exports = {
  User,
  Heartrate,
  HeartrateLog,
  Step,
  StepLog,
}
