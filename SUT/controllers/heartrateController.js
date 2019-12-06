const Heartrate = require("../models/Heartrate")
const HeartrateLog = require("../models/HeartrateLog")

exports.getAllHeartrates = async (req, res) => {
  const { purpose } = req.query
  const result = await Heartrate.findAll({
    purpose: purpose,
  })
  res.json(result)
}

exports.renderHeartrates = async (req, res) => {
  const { purpose } = req.query
  const result = await HeartrateLog.findAll({
    purpose: purpose,
  })
  res.json(result)
}
