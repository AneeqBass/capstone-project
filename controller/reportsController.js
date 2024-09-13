import { getReportsDb, getReportDb, generateReportPdfByIdDb } from '../model/reportsDB.js'

const fetchReports = async (req, res) => {
    res.json(await getReportsDb())
}

const fetchReport = async (req, res) => {
    res.json(await getReportDb(req.params.id))
}

const generateReportPdfById = async (req, res) => {
    await generateReportPdfByIdDb(req, res);
  };

export { fetchReports, fetchReport, generateReportPdfById }