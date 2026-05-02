// routes/reportsroutes.js
const express = require('express');
const router = express.Router();

const { addReport, getAllReports, getReportById, updateReport, deleteReport } = require('../controller/reportcontroller');
const { addComment, getCommentsByReport, rateReport, getActiveAlerts } = require('../controller/communitycontroller');

// Alerts Route (Placed before /:id to prevent conflict)
router.get('/alerts', getActiveAlerts);

// Report Routes
router.post('/', addReport);
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

// Community Interaction Routes
router.post('/:reportId/comments', addComment);
router.get('/:reportId/comments', getCommentsByReport);
router.post('/:reportId/rate', rateReport);

module.exports = router;