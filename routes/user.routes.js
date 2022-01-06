const express = require('express')
const userCtrl = require('../controllers/user.controller')
const auth = require('../middlewares/user.auth')

const router = express.Router()

router.get("/", userCtrl.findAllUsers)

router.get("/count", userCtrl.countAllUsers)

router.get("/readers", userCtrl.findAllReaders)

router.get("/authors", userCtrl.findAllAuthors)

router.get("/admins", userCtrl.findAllAdmins)

router.get("/:id", userCtrl.findOneUserById)

router.put("/:id", [auth.canUpdateThisUser], userCtrl.updateUser)

router.put("/author/:id", [auth.canChangeRights], userCtrl.grantUserAuthorRole)

router.put("/admin/:id", [auth.canChangeRights], userCtrl.grantUserAdminRole)

router.put("/deactivate/:id", [auth.canChangeRights], userCtrl.deactivateUser)

router.put("/activate/:id", [auth.canChangeRights], userCtrl.activateUser)

router.delete("/:id", [auth.canDeleteThisUser], userCtrl.deleteUser)

module.exports = router