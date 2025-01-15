<template>
    <div class="container">
      <h1 class="title">Image Search</h1>
      <div class="search-bar">
        <input
          v-model="searchTerm"
          @keyup.enter="fetchImages"
          type="text"
          placeholder="Search for images..."
          class="search-input"
        />
        <button @click="fetchImages" class="search-button">
          Search
        </button>
      </div>
      <div v-if="images.length > 0" class="image-grid">
        <div v-for="image in images" :key="image.url" class="image-card">
          <img :src="image.url" :alt="image.description" class="image" />
          <p class="description">{{ image.description }}</p>
          <a :href="image.parentPage" target="_blank" class="view-link">
            View Page
          </a>
        </div>
      </div>
      <div v-else-if="loading" class="loading">
        <p>Loading...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchTerm: '',
        images: [],
        loading: false,
        error: '',
      };
    },
    methods: {
      async fetchImages() {
        if (!this.searchTerm) {
          this.error = 'Please enter a search term';
          return;
        }
  
        this.loading = true;
        this.error = '';
        try {
          const response = await axios.get(`https://imagefullstackproject.onrender.com/api/query/${this.searchTerm}`);
          this.images = response.data.images;
        } catch (err) {
          console.error(err);
          this.error = 'Failed to fetch images';
        } finally {
          this.loading = false;
        }
      },

/*
      async fetchRecentSearches() {
  try {
    const response = await axios.get('http://localhost:5000/api/recent');
    console.log(response.data);
  } catch (err) {
    console.error('Failed to fetch', err);
  }
}
*/



    },
  };
  </script>
  
  <style scoped>

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
    font-family: Arial, sans-serif;
  }
 
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
  }
  

  .search-bar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .search-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
  
  .search-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  

  .image-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
 
  
  .image-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .description {
    padding: 8px;
  }
  
  .view-link {
    display: block;
    padding: 8px;
    color: #007bff;
    text-decoration: none;
  }
  
  .view-link:hover {
    text-decoration: underline;
  }
  
  .loading,
  .error {
    text-align: center;
    margin-top: 16px;
  }
  
  .error {
    color: red;
  }
  </style>
  