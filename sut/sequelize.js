const Sequelize = require("sequelize")
const purposize = require("purposize")

const sequelize = new Sequelize("purposize-benchmark", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false, // Prevent sequelize from logging all SQL queries
})

if (process.env.USE_PURPOSIZE === "true") {
  console.log("Using purposize")
  purposize.init(sequelize, {
    logging: false,
  })
} else {
  console.log("Not using purposize")
}

module.exports = sequelize
