const Report = require('../models/Report')
const {now} = require("mongoose")

exports.findAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
        return res.json(reports)
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}

exports.createReport = async (req, res) => {
    const { grade, message } = req.body

    try {
        const newReport = message
            ? new Report({
                grade,
                message,
                publicationDate: now()
            })
            : new Report({
                grade,
                publicationDate: now()
          })

        const reportSaved = await newReport.save()
        return res.json({
            message: "Report successfully posted"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Something went wrong, please try later"
        })
    }
}