const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTicket, getMyTickets } = require('../controllers/supportController');

router.get('/tickets', authMiddleware, getMyTickets);
router.post('/tickets', authMiddleware, createTicket);

module.exports = router;