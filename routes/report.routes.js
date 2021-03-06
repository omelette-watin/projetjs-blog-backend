const express = require("express")
const repCtrl = require("../controllers/report.controller")

const router = express.Router()

router.get("/", repCtrl.findAllReports)

router.post("/", repCtrl.createReport)

module.exports = router