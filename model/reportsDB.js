import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import PDFDocument from "pdfkit";
import fs from "fs";

config();

const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

const getReportsDb = async () => {
  let [data] = await pool.query("SELECT * FROM reports");
  return data;
};

const getReportDb = async (id) => {
  let [[data]] = await pool.query("SELECT * FROM reports WHERE id = ?", [id]);
  return data;
};

const generatePDFStream = (report, res) => {
  const doc = new PDFDocument();

  // Set headers to force download the PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="report_${report.id}.pdf"`
  );

  // Pipe PDF document to response
  doc.pipe(res);

  // PDF Title
  doc.fontSize(18).text("Report Details", { align: "center" });
  doc.moveDown();

  // Report Data (customize as per your needs)
  doc.fontSize(14).text(`Report ID: ${report.id}`);
  doc.text(`Expenses: ${report.expenses}`);
  doc.text(`Income: ${report.income}`);
  doc.text(`Category Total: ${report.categoryTotal}`);
  doc.moveDown();

  doc.end();
};

// Function to fetch report and generate PDF for download
const generateReportPdfByIdDb = async (req, res) => {
  const id = req.params.id;
  const report = await getReportDb(id);

  if (!report) {
    return res.status(404).send("Report not found");
  }

  // Generate and send the PDF
  generatePDFStream(report, res);
};

export { getReportsDb, getReportDb, generateReportPdfByIdDb };
