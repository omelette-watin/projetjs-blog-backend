const express = require('express')
const userCtrl = require('../controllers/user.controller')

const router = express.Router()

router.get("/", userCtrl.findAllUsers)

router.get("/:id", userCtrl.findOneUserById)

router.put("/author/:id", userCtrl.grantUserAuthorRole)

router.put("/admin/:id", userCtrl.grantUserAdminRole)

router.delete("/:id", userCtrl.deleteUser)

module.exports = router