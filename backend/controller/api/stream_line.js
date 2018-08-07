import express from 'express';
import io, { emitPost, emitThread } from '../../services/socket';

const router = express.Router();


router.post('/streamline/thread', (req, res) => {
  // console.log(req.body);
  emitThread(req.body);
  res.sendStatus(200);
});

router.post('/streamline/post', (req, res) => {
  // console.log(req.body);
  emitPost(req.body);
  res.sendStatus(200);
});

export default router;