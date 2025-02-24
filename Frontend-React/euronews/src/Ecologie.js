import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Ecologie.css';

const Politique = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('fr');

    useEffect(() => {
        axios.get('http://localhost:3001/api/articles')
            .then(response => {
                // Filtrer les articles avec le tag "écologie"
                const filteredArticles = response.data.filter(article => article.tags && article.tags.includes("écologie"));
                setArticles(filteredArticles);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
                setError('Une erreur est survenue lors de la récupération des articles.');
            });
    }, []);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

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
                    </Link>                </div>
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
                {/* <button className="buttonmenu">Numérique▼</button>&nbsp;&nbsp; */}
                {/* <button className="buttonmenu">Santé▼</button>&nbsp;&nbsp; */}
                {/* <button className="buttonmenu">Ecologie▼</button> */}
            </div>
            <div className="header-divider"></div>


            <div className="bannerecologie">
                <h1>ECOLOGIE</h1>
            </div>

            <h1 id='Articles'>Ecologie</h1>
            <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div id='allarticles'>
                    <ul className="articles-container">
                        {articles.length > 0 ? (
                            [...articles].reverse().map((article, index) => (
                                <li key={index} className={index === 0 ? 'first-article' : 'other-articles'}>
                                    {index === 0 && <h3 id='importante'>Dernière minute</h3>} 
                                    <div id='article'>
                                        <h2>{language === 'fr' ? article.title_fr : article.title_en}</h2>
                                        <img src={article.image} alt={article.title}></img>
                                        <p>{language === 'fr' ? article.description_fr : article.description_en}</p>
                                        <p id='tags'>{article.tags}</p>
                                        <Link to={`/article/${article.id}`}>
                                            <button>Lire l'article</button>
                                        </Link>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>Aucun article sur l'écologie disponible.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Politique;
