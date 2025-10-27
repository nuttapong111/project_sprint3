const express = require('express');
const pool = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all reports (officer/admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { status } = req.query;
    let query = `
      SELECT dr.*, u.full_name as submitter_name, u.email as submitter_email
      FROM daily_reports dr
      JOIN users u ON dr.user_id = u.id
    `;
    const params = [];
    let paramCount = 0;

    if (status && status !== 'all') {
      paramCount++;
      query += ` WHERE dr.status = $${paramCount}`;
      params.push(status);
    }

    query += ' ORDER BY dr.submitted_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get reports by user ID
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user can access this data
    if (req.user.role === 'citizen' && req.user.userId !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await pool.query(
      'SELECT * FROM daily_reports WHERE user_id = $1 ORDER BY submitted_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get report by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT dr.*, u.full_name as submitter_name, u.email as submitter_email FROM daily_reports dr JOIN users u ON dr.user_id = u.id WHERE dr.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = result.rows[0];

    // Check if user can access this report
    if (req.user.role === 'citizen' && report.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new report
router.post('/', auth, async (req, res) => {
  try {
    const {
      reportType,
      userAnswers,
      personalInfo,
      attachments
    } = req.body;

    const result = await pool.query(
      `INSERT INTO daily_reports (user_id, report_type, user_answers, personal_info, attachments, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.userId, reportType, JSON.stringify(userAnswers), JSON.stringify(personalInfo), JSON.stringify(attachments), 'pending']
    );

    res.status(201).json({
      message: 'Report created successfully',
      report: result.rows[0]
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update report status (officer/admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    const result = await pool.query(
      `UPDATE daily_reports 
       SET status = $1, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = $2, review_notes = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [status, req.user.userId, reviewNotes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json({
      message: 'Report status updated successfully',
      report: result.rows[0]
    });
  } catch (error) {
    console.error('Update report status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get report statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const totalReports = await pool.query('SELECT COUNT(*) as count FROM daily_reports');
    const pendingReports = await pool.query('SELECT COUNT(*) as count FROM daily_reports WHERE status = $1', ['pending']);
    const approvedReports = await pool.query('SELECT COUNT(*) as count FROM daily_reports WHERE status = $1', ['approved']);
    const rejectedReports = await pool.query('SELECT COUNT(*) as count FROM daily_reports WHERE status = $1', ['rejected']);

    res.json({
      total: parseInt(totalReports.rows[0].count),
      pending: parseInt(pendingReports.rows[0].count),
      approved: parseInt(approvedReports.rows[0].count),
      rejected: parseInt(rejectedReports.rows[0].count)
    });
  } catch (error) {
    console.error('Get report stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

