import express from 'express';
import axios from 'axios';
import Search from '../models/searchModel.js';
const router = express.Router();


router.get('/query/:term', async (req, res) => {
    const { term } = req.params;
    const { page = 1 } = req.query;
  
    try {
      // Log search in database
      const search = new Search({ term });
      await search.save();
  
      //Sending to ffc api
      const response = await axios.get(`https://image-search-abstraction-layer.freecodecamp.rocks/query/${term}?page=${page}`);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching images' });
    }
  });
  

  
  export default router;