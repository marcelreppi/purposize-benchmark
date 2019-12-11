const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController")
const heartrateController = require("./controllers/heartrateController")
const stepController = require("./controllers/stepController")

router.get("/users", userController.getAllUsers)

router.get("/users/:id", userController.getUserById)
router.get("/users/:id/render", userController.renderUserProfile)

// router.get("/heartrates", heartrateController.getAllHeartrates)
// router.get("/steps", stepController.getAllSteps)

// router.get("/heartratelogs", heartrateController.getAllHeartrateLogs)
// router.get("/heartratelogs/render", heartrateController.renderHeartrateLogs)

// router.get("/users/random/steplogs", stepController.getAllStepLogs)
// router.get("/users/random/steplogs/:steplogId", stepController.getStepLog)
// router.get("/users/random/steplogs/:steplogId/render", stepController.renderStepLog)

router.get("/users/:userId/steplogs/all", stepController.getAllStepLogs)
router.get("/users/:userId/steplogs/all/render", stepController.renderAllStepLogs)

router.get("/users/:userId/steplogs", stepController.getStepLog)
router.get("/users/:userId/steplogs/render", stepController.renderStepLog)

router.get("/kill", () => process.exit())

module.exports = router
