const Step = require("../models/Step")
const StepLog = require("../models/StepLog")
const User = require("../models/User")

exports.getAllSteps = async (req, res) => {
  const { purpose } = req.query
  const result = await Step.findAll({
    attributes: ["value", "date"],
    purpose: purpose,
  })
  res.json(result)
}

exports.getAllStepLogs = async (req, res) => {
  const { userId, steplogId } = req.params
  const { purpose } = req.query
  const result = await StepLog.findAll({
    where: {
      userId,
    },
    purpose: purpose,
  })
  res.json(result)
}

exports.getStepLog = async (req, res) => {
  const { userId, steplogId } = req.params
  const { purpose } = req.query
  const result = await StepLog.findOne({
    where: {
      userId,
      id: steplogId,
    },
    purpose: purpose,
  })
  res.json(result)
}

exports.renderStepLog = async (req, res) => {
  const { userId, steplogId } = req.params
  const { purpose } = req.query
  const result = await StepLog.findOne({
    where: {
      id: steplogId,
    },
    include: [User],
    purpose: purpose,
  })

  res.render("../views/steplog.ejs", {
    user: result.user,
    stepLog: JSON.parse(result.log),
  })
}
