const User = require("./User")
const Heartrate = require("./Heartrate")
const HeartrateLog = require("./HeartrateLog")

HeartrateLog.belongsTo(User)
User.hasMany(HeartrateLog)  

module.exports = {
  User,
  Heartrate,
  HeartrateLog,
}
