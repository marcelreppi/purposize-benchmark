const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController")
const heartrateController = require("./controllers/heartrateController")
const stepController = require("./controllers/stepController")

router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)
router.get("/users/:id/render", userController.renderUserProfile)

router.get("/heartrates", heartrateController.getAllHeartrates)
router.get("/steps", stepController.getAllSteps)

router.get("/heartratelogs", heartrateController.getAllHeartrateLogs)
router.get("/heartratelogs/render", heartrateController.renderHeartrateLogs)

router.get("/users/:userId/steplogs", stepController.getAllStepLogs)
router.get("/users/:userId/steplogs/:steplogId", stepController.getStepLog)
router.get("/users/:userId/steplogs/:steplogId/render", stepController.renderStepLog)

router.get("/kill", () => process.exit())

module.exports = router
