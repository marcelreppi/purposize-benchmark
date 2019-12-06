const Users = require("../models/User")

exports.getAllUsers = async (req, res) => {
  const { purpose } = req.query
  const result = await Users.findAll({
    purpose: purpose,
  })
  res.json(result)
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  const { purpose } = req.query
  const result = await Users.find({
    where: {
      id,
    },
    purpose: purpose,
  })
  res.json(result)
}

exports.renderUserProfile = async (req, res) => {
  const { id } = req.params
  const { purpose } = req.query

  res.end()
}
