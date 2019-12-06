// Import environment variables
require("dotenv").config()

// Load dependencies
const purposize = require("purposize")

const sequelize = require("./sequelize")
const createData = require("./createData")

const startServer = async () => {
  if (process.env.GENERATE_DATA === "true") {
    // Clear the DB
    console.log("Clearing the DB...")
    await sequelize.getQueryInterface().dropAllTables()
    await sequelize.sync()
  }

  // Load up all models and sync them to the db
  require("./models")
  await sequelize.sync()

  // Load purpose hierarchy
  if (process.env.USE_PURPOSIZE === "true") {
    await purposize.loadPurposes("./purposes.yml")
  }

  if (process.env.GENERATE_DATA === "true") {
    // Create fake data
    console.log("Generating fake data...")
    await createData()
  }

  // Start up the server
  const app = require("./app")
  const port = process.env.PORT || 8000
  const server = app.listen(port, () => {
    console.log("Server is running at localhost:" + port)
  })
}

startServer()
