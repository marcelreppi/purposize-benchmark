const Step = require("../models/Step")
const StepLog = require("../models/StepLog")
const User = require("../models/User")

exports.getAllSteps = async (req, res) => {
  const { purpose } = req.query
  const result = await Step.findAll({
    purpose: purpose,
  })
  res.json(result)
}

exports.getAllStepLogs = async (req, res) => {
  let { userId } = req.params
  const { purpose, n } = req.query

  if (userId === "random") {
    userId = Math.ceil(Math.random() * process.env.N_USERS)
  }

  const result = await StepLog.findAll({
    where: {
      userId,
    },
    purpose: purpose,
    limit: n,
  })
  res.json(result)
}

exports.getStepLog = async (req, res) => {
  let { userId } = req.params
  const { purpose } = req.query

  if (userId === "random") {
    userId = Math.ceil(Math.random() * process.env.N_USERS)
  }

  const result = await StepLog.findOne({
    where: {
      userId,
    },
    purpose: purpose,
  })
  res.json(JSON.parse(result.log))
}

exports.renderAllStepLogs = async (req, res) => {
  let { userId } = req.params
  const { purpose, n, view } = req.query

  if (userId === "random") {
    userId = Math.ceil(Math.random() * process.env.N_USERS)
  }

  const result = await StepLog.findAll({
    where: {
      userId,
    },
    include: [User],
    purpose: purpose,
    limit: n,
  })

  switch (view) {
    case "1":
      res.render("../views/steplogCollection1.ejs", {
        user: result[0].user,
        stepLogs: result,
      })
      break
    case "2":
      res.render("../views/steplogCollection2.ejs", {
        user: result[0].user,
        stepLogs: result.map(r => {
          r.log = JSON.parse(r.log)
          return r
        }),
      })
      break
    case "3":
      res.render("../views/steplogCollection3.ejs", {
        user: result[0].user,
        stepLogs: result.map(r => {
          const log = JSON.parse(r.log)
          log.forEach(logEntry => (logEntry.date = new Date(logEntry.date)))
          r.log = log
          return r
        }),
      })
      break
    default:
      res.render("../views/steplogCollection1.ejs", {
        user: result[0].user,
        stepLogs: result,
      })
      break
  }
}

exports.renderStepLog = async (req, res) => {
  let { userId } = req.params
  const { purpose } = req.query

  if (userId === "random") {
    userId = Math.ceil(Math.random() * process.env.N_USERS)
  }

  const result = await StepLog.findOne({
    where: {
      userId,
    },
    include: [User],
    purpose: purpose,
  })

  res.render("../views/steplog.ejs", {
    user: result.user,
    stepLog: JSON.parse(result.log),
  })
}
