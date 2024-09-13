import express from 'express'
import {fetchReports,fetchReport,generateReportPdfById} from '../controller/reportsController.js'

const router = express.Router()

router.get('/', fetchReports)

router.get('/:id', fetchReport)

router.get('/reportPDF/:id', generateReportPdfById)

export default router