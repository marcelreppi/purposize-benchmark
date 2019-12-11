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
  let { id } = req.params
  const { purpose } = req.query

  if (id === "random") {
    id = Math.ceil(Math.random() * process.env.N_USERS)
  }

  const user = await User.findOne({
    where: {
      id,
    },
    purpose,
  })
  res.json(user)
}

exports.renderUserProfile = async (req, res) => {
  let { id } = req.params
  const { purpose } = req.query

  if (id === "random") {
    id = Math.ceil(Math.random() * process.env.N_USERS)
  }

  const user = await User.findOne({
    where: {
      id,
    },
    purpose,
  })

  res.render("../views/profile", { user: user.dataValues })
}
