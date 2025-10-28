const express = require('express');
const pool = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all document submissions (officer/admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { status } = req.query;
    let query = `
      SELECT ds.*, u.full_name as submitter_name, u.email as submitter_email
      FROM document_submissions ds
      JOIN users u ON ds.user_id = u.id
    `;
    const params = [];
    let paramCount = 0;

    if (status && status !== 'all') {
      paramCount++;
      query += ` WHERE ds.status = $${paramCount}`;
      params.push(status);
    }

    query += ' ORDER BY ds.submitted_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get document submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get document submissions by user ID
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user can access this data
    if (req.user.role === 'citizen' && req.user.userId !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await pool.query(
      'SELECT * FROM document_submissions WHERE user_id = $1 ORDER BY submitted_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get user document submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get document submission by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT ds.*, u.full_name as submitter_name, u.email as submitter_email FROM document_submissions ds JOIN users u ON ds.user_id = u.id WHERE ds.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document submission not found' });
    }

    const submission = result.rows[0];

    // Check if user can access this submission
    if (req.user.role === 'citizen' && submission.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Get document submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new document submission
router.post('/', auth, async (req, res) => {
  try {
    const {
      documentType,
      documentTypeName,
      files,
      personalInfo
    } = req.body;

    const result = await pool.query(
      `INSERT INTO document_submissions (user_id, document_type, document_type_name, files, personal_info, status, progress)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [req.user.userId, documentType, documentTypeName, JSON.stringify(files), JSON.stringify(personalInfo), 'pending', 0]
    );

    res.status(201).json({
      message: 'Document submission created successfully',
      submission: result.rows[0]
    });
  } catch (error) {
    console.error('Create document submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update document submission status (officer/admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { id } = req.params;
    const { status, reviewNotes, progress } = req.body;

    const result = await pool.query(
      `UPDATE document_submissions 
       SET status = $1, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = $2, review_notes = $3, progress = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [status, req.user.userId, reviewNotes, progress || 0, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document submission not found' });
    }

    res.json({
      message: 'Document submission status updated successfully',
      submission: result.rows[0]
    });
  } catch (error) {
    console.error('Update document submission status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get document submission statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const totalSubmissions = await pool.query('SELECT COUNT(*) as count FROM document_submissions');
    const pendingSubmissions = await pool.query('SELECT COUNT(*) as count FROM document_submissions WHERE status = $1', ['pending']);
    const approvedSubmissions = await pool.query('SELECT COUNT(*) as count FROM document_submissions WHERE status = $1', ['approved']);
    const rejectedSubmissions = await pool.query('SELECT COUNT(*) as count FROM document_submissions WHERE status = $1', ['rejected']);

    res.json({
      total: parseInt(totalSubmissions.rows[0].count),
      pending: parseInt(pendingSubmissions.rows[0].count),
      approved: parseInt(approvedSubmissions.rows[0].count),
      rejected: parseInt(rejectedSubmissions.rows[0].count)
    });
  } catch (error) {
    console.error('Get document submission stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

