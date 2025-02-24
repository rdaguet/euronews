import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/api/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  return (
    <div>
      <h1>Liste des articles</h1>
      {articles.length === 0 ? (
        <p>Aucun article disponible</p>
      ) : (
        articles.map((article) => (
          <div key={article.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
            <h2>
              <Link to={`/article/${article.id}`}>{article.title_fr}</Link>
            </h2>
            {article.image && <img src={article.image} alt={article.title_fr} style={{ width: "150px" }} />}
            <p>{article.description_fr}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ArticlesList;
