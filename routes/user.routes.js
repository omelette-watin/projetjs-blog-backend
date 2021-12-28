const express = require('express')
const userCtrl = require('../controllers/user.controller')
const auth = require('../middlewares/user.auth')

const router = express.Router()

router.get("/", userCtrl.findAllUsers)

router.get("/:id", userCtrl.findOneUserById)

router.put("/author/:id", [auth.canGiveRole], userCtrl.grantUserAuthorRole)

router.put("/admin/:id", [auth.canGiveRole], userCtrl.grantUserAdminRole)

router.delete("/:id", [auth.canDeleteThisUser], userCtrl.deleteUser)

module.exports = router