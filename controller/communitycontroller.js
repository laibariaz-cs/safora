// importing models
const Comment = require('../models/comment');
const Rating = require('../models/rating');
const Report = require('../models/report');

// API for adding a comment to a report
const addComment = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { userId, text } = req.body;

        if (!userId || !text) {
            return res.status(400).json({
                success: false,
                message: 'Please provide userId and text for the comment'
            });
        }

        const comment = await Comment.create({
            reportId,
            userId,
            text
        });

        res.status(201).json({
            success: true,
            message: 'Comment added successfully!',
            data: comment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};

// API for fetching all comments of a specific report
const getCommentsByReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const comments = await Comment.find({ reportId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Comments fetched successfully!',
            count: comments.length,
            data: comments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};

// API for rating a report (Helpful or Not Helpful)
const rateReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { userId, isHelpful } = req.body; // isHelpful should be a boolean true/false

        if (!userId || isHelpful === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide userId and isHelpful boolean value'
            });
        }

        // Check if user already rated this report
        const existingRating = await Rating.findOne({ reportId, userId });
        
        let rating;
        if (existingRating) {
            // Update the existing rating
            existingRating.isHelpful = isHelpful;
            rating = await existingRating.save();
        } else {
            // Create a new rating
            rating = await Rating.create({
                reportId,
                userId,
                isHelpful
            });
        }

        res.status(200).json({
            success: true,
            message: 'Report rated successfully!',
            data: rating
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};

// API for fetching active safety alerts (Reports that are Active)
const getActiveAlerts = async (req, res) => {
    try {
        // Fetching reports that are marked as 'Active' and maybe filter by type
        const alerts = await Report.find({ status: 'Active' }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Active alerts fetched successfully!',
            count: alerts.length,
            data: alerts
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
module.exports = { addComment, getCommentsByReport, rateReport, getActiveAlerts };
