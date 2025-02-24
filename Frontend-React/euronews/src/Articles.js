import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer Link
import './css/Articles.css';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('fr');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/articles')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
                setError('Une erreur est survenue lors de la récupération des articles.');
            });
    }, []); 

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    const nextArticle = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); 
    };

    const prevArticle = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3); 
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextArticle();
        }, 5000);

        return () => clearInterval(interval); 
    }, []);

    return (
        <div>
            <header>
                <div id='bouton'>
                    <div id='lang-buttons'>
                        <button className="button" onClick={() => handleLanguageChange('fr')}>Français</button>
                        <p id='trait'>|</p>
                        <button className="button" onClick={() => handleLanguageChange('en')}>English</button>
                    </div>
                    <Link to="/">
                        <img src="/images/euronews-logo.jpg" alt="logo euronews"></img>
                    </Link>
                </div>
            </header>
            

            <div id='menu'>
                <Link to="/politique">
                    <button className="buttonmenu">Politique▼</button>
                </Link>&nbsp;&nbsp;
                <Link to="/numerique">
                    <button className="buttonmenu">Numérique▼</button>
                </Link>&nbsp;&nbsp;
                <Link to="/sante">
                    <button className="buttonmenu">Santé▼</button>
                </Link>&nbsp;&nbsp;
                <Link to="/ecologie">
                    <button className="buttonmenu">Ecologie▼</button>
                </Link>&nbsp;&nbsp;
            </div>

            <div className="header-divider"></div>

            <h1 id='Articles'>À la une</h1>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div id='allarticles'>
                    <h1 id='troisnews'>Nos 3 plus anciennes news</h1>
                    {articles.length > 0 && (
                        <div className="carousel">
                            <button onClick={prevArticle}>&lt;</button>
                            <div className="carousel-content">
                                {articles.slice(0, 3).map((article, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                                        style={{ display: index === currentIndex ? 'block' : 'none' }}>
                                        <div className="carousel-container">
                                            <img id='imagecaroussel' src={article.image} alt={article.title}></img>
                                            <div className="text-container">
                                                <h2 id='titrecaroussel'>{language === 'fr' ? article.title_fr : article.title_en}</h2>
                                                <p id='textcaroussel'>{language === 'fr' ? article.description_fr : article.description_en}</p>
                                                <p id='tags'>{article.tags}</p>
                                                <Link to={`/article/${article.id}`}>
                                                    <button>Lire l'article</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={nextArticle}>&gt;</button>
                        </div>
                    )}
                    <br /><br /><br /><br />
                    <ul className="articles-container">
                        {articles.slice(3).reverse().map((article, index) => (
                            <li key={index} className={index === 0 ? 'first-article' : 'other-articles'}>
                                {index === 0 && <h3 id='importante'>Dernière minute</h3>}
                                <div id='article'>
                                    <h2>{language === 'fr' ? article.title_fr : article.title_en}</h2>
                                    <img src={article.image} alt={article.title}></img>
                                    <p>{language === 'fr' ? article.description_fr : article.description_en}</p>
                                    <p id='tags'>
                                    {article.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                    </p>
                                    <Link to={`/article/${article.id}`}>
                                        <button>Lire l'article</button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Articles;
