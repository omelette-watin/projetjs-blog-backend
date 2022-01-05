const express = require("express")
const repCtrl = require("./report.controller")

const router = express.Router()

router.get("/", repCtrl.findAllReports)

router.post("/", repCtrl.createReport)

module.exports = router