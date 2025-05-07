const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Validation middleware
const validateVote = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('Name can only contain letters and spaces'),
  body('voting_choice')
    .isBoolean()
    .withMessage('Voting choice must be a boolean'),
  body('casted_at')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date > now) {
        throw new Error('Date cannot be in the future');
      }
      return true;
    }),
];

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

// POST vote
app.post('/vote', validateVote, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, voting_choice, casted_at } = req.body;
    const vote = await prisma.vote.create({
      data: {
        name,
        voting_choice,
        casted_at: new Date(casted_at),
      },
    });
    res.status(201).json(vote);
  } catch (error) {
    next(error);
  }
});

// GET all votes
app.get('/data', async (req, res, next) => {
  try {
    const votes = await prisma.vote.findMany({ 
      orderBy: { casted_at: 'desc' },
      select: {
        id: true,
        name: true,
        voting_choice: true,
        casted_at: true
      }
    });
    res.json(votes);
  } catch (error) {
    next(error);
  }
});

// GET Line Chart data
app.get('/counts', async (req, res, next) => {
  try {
    const data = await prisma.vote.groupBy({
      by: ['casted_at'],
      _count: {
        _all: true
      },
      orderBy: {
        casted_at: 'asc'
      }
    });

    const formattedData = data.map(item => ({
      casted_at: item.casted_at.toISOString().split('T')[0],
      yes_count: item._count._all,
      no_count: 0 // We'll update this in the next step
    }));

    // Get no votes separately
    const noVotes = await prisma.vote.groupBy({
      by: ['casted_at'],
      where: {
        voting_choice: false
      },
      _count: {
        _all: true
      },
      orderBy: {
        casted_at: 'asc'
      }
    });

    // Update no counts in formattedData
    noVotes.forEach(item => {
      const date = item.casted_at.toISOString().split('T')[0];
      const existingItem = formattedData.find(d => d.casted_at === date);
      if (existingItem) {
        existingItem.no_count = item._count._all;
        existingItem.yes_count -= item._count._all; // Subtract no votes from total to get yes votes
      }
    });

    res.json(formattedData);
  } catch (error) {
    next(error);
  }
});

// GET Bar Graph data
app.get('/results', async (req, res, next) => {
  try {
    const yesCount = await prisma.vote.count({
      where: {
        voting_choice: true
      }
    });

    const noCount = await prisma.vote.count({
      where: {
        voting_choice: false
      }
    });

    res.json({
      yes_count: yesCount,
      no_count: noCount
    });
  } catch (error) {
    next(error);
  }
});

// Apply error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
