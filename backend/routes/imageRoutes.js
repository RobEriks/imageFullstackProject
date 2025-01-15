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

  // Recent search
router.get('/recent', async (req, res) => {
  try {
    const recentSearches = await Search.find().sort({ date: -1 }).limit(10);
    res.json(recentSearches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error with recent' });
  }
});

  

  
  export default router;