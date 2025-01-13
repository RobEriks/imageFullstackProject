import express from 'express';
import axios from 'axios';
import Search from '../models/searchModel.js';
const router = express.Router();


router.get('/example', (req, res) => {
  res.send('Hello from imageRoutes!');
});

export default router;
