const Heartrates = require("../models/Heartrate")
const HeartrateLogs = require("../models/HeartrateLog")

exports.getAllHeartrates = async (req, res) => {
  const { purpose } = req.query
  const result = await Heartrates.findAll({
    purpose: purpose,
  })
  res.json(result)
}

exports.renderHeartrates = async (req, res) => {
  const { purpose } = req.query
  const result = await HeartrateLogs.findAll({
    purpose: purpose,
  })
  res.json(result)
}
