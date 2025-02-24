const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/articles', async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/json/');
    console.log(response.data); 
    const articles = response.data;

    // Vérifiez si chaque article à une image 
    const updatedArticles = articles.map(article => {
      const imageUrl = article.image ? `${article.image}` : null;
      return {
        ...article,
        image: imageUrl
      };
    });

    // Vérifiez si chaque image est accessible
    for (const article of updatedArticles) {
      if (article.image) {
        try {
          await axios.get(article.image);
          console.log(`Image accessible: ${article.image}`);
        } catch (error) {
          console.error(`Image n'est pas accésible: ${article.image}`, error.message);
        }
      }
    }

    res.json(updatedArticles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des articles');
  }
});

app.listen(port, () => {
  console.log(`Server Node.js listening at http://localhost:${port}`);
});
