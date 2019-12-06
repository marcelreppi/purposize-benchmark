const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController")
const heartrateController = require("./controllers/heartrateController")

router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)
router.get("/users/:id/render", userController.renderUserProfile)

router.get("/heartrates", heartrateController.getAllHeartrates)
router.get("/heartrates/render", heartrateController.renderHeartrates)

module.exports = router
