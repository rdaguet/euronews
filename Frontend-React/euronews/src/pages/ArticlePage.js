import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../css/ArticlePage.css";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    // Récupérer l'article par ID
    fetch(`http://127.0.0.1:3001/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      })
      .catch((error) => console.error("Erreur :", error));
  }, [id]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  if (!article) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="article-container">
      {/* HEADER */}
      <header>
        <div id="bouton">
          <div id="lang-buttons">
            <button className="button" onClick={() => handleLanguageChange("fr")}>
              Français
            </button>
            <p id="trait">|</p>
            <button className="button" onClick={() => handleLanguageChange("en")}>
              English
            </button>
          </div>
          <Link to="/">
            <img src="/images/euronews-logo.jpg" alt="logo euronews"></img>
          </Link>
        </div>
      </header>

      <div className="header-divider"></div>

      {/* TITRE */}
      <h1 id="ArticlePageh1">{language === "fr" ? article.title_fr : article.title_en}</h1>

      {/* TAGS */}
      <div className="tags-container">
        {article.tags.length > 0 ? (
          <ul className="tags-list">
            {article.tags.map((tag, index) => (
              <li key={index} className="tag-item">
                {tag}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun tag disponible</p>
        )}
      </div>

      {/* IMAGE */}
      {article.image && (
        <div className="image-container">
          <img src={article.image} alt={article.title_fr} className="article-image" />
        </div>
      )}

      {/* CONTENU */}
      <p id="ArticlePagep">
        {language === "fr" ? article.content_fr : article.content_en}
      </p>

      
    </div>
  );
};

export default ArticlePage;
