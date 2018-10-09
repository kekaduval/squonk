const router = require('express').Router();
const userRoutes = require('./user');
const budgetRoutes = require('./budget');
const billRoutes = require('./bill');

// now its /api/budgeter
router.use('/user', userRoutes);
router.use('/budget', budgetRoutes);
router.use('/bill', billRoutes);

module.exports = router;
