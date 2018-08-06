import express from 'express';
import chalk from 'chalk';
import io from '../../services/socket';
const router = express.Router();

const LOG_ROOT = `${chalk.black.bgGreen(' API - ')}${chalk.black.bgGreen('StreamLine ')}`;


router.post('/streamline/thread', (req, res) => {
  console.log(req.body);
  // io().emit('thread:update', req.body);
  res.sendStatus(200);
});

router.post('/streamline/post', (req, res) => {
  console.log(req.body);
  // io().emit('post:update', req.body);
  res.sendStatus(200);
});

export default router;