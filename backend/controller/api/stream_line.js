import express from 'express';
import io, { emitPost, emitThread } from '../../services/socket';

const router = express.Router();


router.post('/streamline/thread', (req, res) => {
  // console.log(req.body);
  console.log(`Emitting Thread : ${req.body._id}`)
  emitThread(req.body);
  res.sendStatus(200);
});

router.post('/streamline/post', (req, res) => {
  // console.log(req.body);
  console.log(`Emitting Post : ${req.body._id}`)
  if (!req.body._id) {
    console.log(req.body);
  }
  emitPost(req.body);
  res.sendStatus(200);
});

export default router;