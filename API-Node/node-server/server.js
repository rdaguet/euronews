const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Pour accepter des requêtes avec du JSON

// Route pour récupérer tous les articles
app.get('/api/articles', async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/json/'); // Django API
    const articles = response.data;

    console.log('Articles récupérés:', articles); // Vérifie les données reçues

    // Mise à jour des articles pour inclure les tags
    const updatedArticles = articles.map(article => ({
      id: article.id,
      title_fr: article.title_fr,
      title_en: article.title_en,
      image: article.image ? `${article.image}` : null,
      description_fr: article.description_fr,
      description_en: article.description_en,
      content_fr: article.content_fr || "Texte non disponible",
      content_en: article.content_en || "Texte non disponible",
      created_at: article.created_at,
      tags: article.tags || [] // Ajout des tags
    }));

    res.json(updatedArticles); // Envoi des articles au client
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des articles');
  }
});

// Route pour récupérer un seul article en fonction de son id
app.get('/api/articles/:id', async (req, res) => {
  try {
    console.log("ID article:", req.params.id);

    const response = await axios.get(`http://127.0.0.1:8000/json/${req.params.id}/`); // Django API
    const article = response.data;

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    const updatedArticle = {
      id: article.id,
      title_fr: article.title_fr,
      title_en: article.title_en,
      image: article.image ? `${article.image}` : null,
      description_fr: article.description_fr,
      description_en: article.description_en,
      content_fr: article.content_fr || "Texte non disponible",
      content_en: article.content_en || "Texte non disponible",
      created_at: article.created_at,
      tags: article.tags || [] // Ajout des tags
    };

    res.json(updatedArticle); // Envoi de l'article unique
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération de l\'article');
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server Node.js listening at http://localhost:${port}`);
});
