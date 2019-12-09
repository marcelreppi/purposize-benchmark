const ejs = require("ejs")

const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
  const { purpose } = req.query
  const result = await User.findAll({
    purpose,
  })
  res.json(result)
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  const { purpose } = req.query
  const user = await User.findOne({
    where: {
      id,
    },
    purpose,
  })
  res.json(user)
}

exports.renderUserProfile = async (req, res) => {
  const { id } = req.params
  const { purpose } = req.query

  const user = await User.findOne({
    where: {
      id,
    },
    purpose,
  })

  res.render("../views/profile", { user: user.dataValues })
}
