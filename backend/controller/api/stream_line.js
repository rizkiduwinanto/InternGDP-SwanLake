import express from 'express';
import io, { emitPost, emitThread } from '../../services/socket';

const router = express.Router();


router.post('/streamline/thread', (req, res) => {
  emitThread(req.body);
  res.sendStatus(200);
});

router.post('/streamline/post', (req, res) => {
  emitPost(req.body);
  res.sendStatus(200);
});

export default router;