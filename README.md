📰 <strong>Euronews – Plateforme d’actualités interactive</strong> <br/>📦 Description
Euronews est une application web qui permet d'afficher et de filtrer des articles d'actualité en temps réel. Django gère la création et le stockage des articles, Node.js les traite via une API, et React les affiche de manière dynamique avec un système de filtres par tags.

***
🎛️ <strong>Fonctionnalités</strong><br/>
✅ Gestion des articles : Création, stockage et récupération des articles via une API. <br/>
🔍 Filtrage avancé : Possibilité de filtrer les articles par tags (écologie, politique, sport, etc.).<br/>
🌐 Interface réactive : Affichage dynamique et fluide des articles avec React.<br/>
📡 Mise à jour en temps réel : Les articles s'actualisent automatiquement grâce à l’API.<br/>

***
📂 Structure du projet<br/>
![2025-02-24_23h40_15](https://github.com/user-attachments/assets/ef622346-ccc9-4060-8c88-64a38a44a339)


***
🛠 Installation
Cloner le projet :<br/>
`git clone https://github.com/ton-profil/Euronews.git
`<br/>
`cd Euronews
`

Installer les dépendances :<br/>
`npm install           # Installation des dépendances du frontend  
`<br/>
`pip install -r requirements.txt  # Installation des dépendances Django  
`
<br/><br/>Démarrer les serveurs :<br/>
`npm start             # Démarrer le serveur React`<br/>
`python manage.py runserver  # Lancer le backend Django`<br/>
`node server.js        # Lancer l’API Node.js  `<br/>

<br/>L'application sera accessible sur http://localhost:3000 pour le frontend et http://localhost:8000 pour l’API.

***
🛠 Technologies utilisées<br/>
⚡ Django : Gestion de la base de données et API des articles.<br/>
🚀 Node.js : Traitement des articles et gestion de l'API.<br/>
🎨 React.js : Affichage interactif et dynamique des articles.<br/>
