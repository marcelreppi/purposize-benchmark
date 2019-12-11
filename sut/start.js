// Import environment variables
require("dotenv").config()

// Load dependencies
const purposize = require("purposize")

const sequelize = require("./sequelize")

const startServer = async () => {
  // Load up all models and sync them to the db
  require("./models")
  await sequelize.sync()

  // Load purpose hierarchy
  if (process.env.USE_PURPOSIZE === "true") {
    // await purposize.loadPurposes("./purposes.yml")
  }

  // Start up the server
  const app = require("./app")
  const port = process.env.PORT || 8000
  const server = app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port)
  })
}

startServer()
