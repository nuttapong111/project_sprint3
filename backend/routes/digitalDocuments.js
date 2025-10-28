const express = require('express');
const pool = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get digital documents for current user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const result = await pool.query(
      'SELECT * FROM digital_documents WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get digital documents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get digital documents by user ID (for admin/officer)
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user can access this data
    if (req.user.role === 'citizen' && req.user.userId !== parseInt(userId)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await pool.query(
      'SELECT * FROM digital_documents WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get user digital documents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get digital document by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM digital_documents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Digital document not found' });
    }

    const document = result.rows[0];

    // Check if user can access this document
    if (req.user.role === 'citizen' && document.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(document);
  } catch (error) {
    console.error('Get digital document error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new digital document (officer/admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const {
      userId,
      documentType,
      documentName,
      documentNumber,
      issueDate,
      expiryDate,
      status,
      issuedBy,
      officerNotes,
      fileUrl
    } = req.body;

    const result = await pool.query(
      `INSERT INTO digital_documents (user_id, document_type, document_name, document_number, issue_date, expiry_date, status, issued_by, officer_notes, file_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [userId, documentType, documentName, documentNumber, issueDate, expiryDate, status || 'active', issuedBy, officerNotes, fileUrl]
    );

    res.status(201).json({
      message: 'Digital document created successfully',
      document: result.rows[0]
    });
  } catch (error) {
    console.error('Create digital document error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update digital document status
router.patch('/:id', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { id } = req.params;
    const updates = req.body;

    // Build dynamic update query
    const setParts = [];
    const values = [];
    let paramCount = 0;

    Object.keys(updates).forEach(key => {
      paramCount++;
      setParts.push(`${key} = $${paramCount}`);
      values.push(updates[key]);
    });

    paramCount++;
    setParts.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE digital_documents SET ${setParts.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Digital document not found' });
    }

    res.json({
      message: 'Digital document updated successfully',
      document: result.rows[0]
    });
  } catch (error) {
    console.error('Update digital document error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete digital document
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM digital_documents WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Digital document not found' });
    }

    res.json({
      message: 'Digital document deleted successfully'
    });
  } catch (error) {
    console.error('Delete digital document error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

