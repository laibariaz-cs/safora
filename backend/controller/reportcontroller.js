
// importing the report model/schema
const Report = require('../models/report');

// API for adding a report
const addReport = async (req, res) => {
    try {
        // getting data from body
        const { title, description, location, type } = req.body;

        // validation
        if (!title || !description || !location || !type) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // create report
        const report = await Report.create({
            title,
            description,
            location,
            type
        });

        res.status(201).json({
            success: true,
            message: 'Report created successfully!',
            data: report
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};


// API for fetching all reports
const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'All reports fetched successfully!',
            count: reports.length,
            data: reports
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};


// API for deleting a report
const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Report deleted successfully!',
            deleteId: req.params.id
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// API for fetching a single report by ID
const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Report fetched successfully!',
            data: report
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};


// API for updating an existing report
const updateReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            req.body, // The fields to update (title, description, etc)
            { new: true, runValidators: true } // Return updated document and run model validation
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Report updated successfully!',
            data: report
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};


// exporting all functions
module.exports = { addReport, getAllReports, getReportById, updateReport, deleteReport };

