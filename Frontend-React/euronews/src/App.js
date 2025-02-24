import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from './Articles';
import Politique from './Politique';
import Numerique from './Numerique';
import Sante from './Sante';
import Ecologie from './Ecologie';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/politique" element={<Politique />} />
        <Route path="/numerique" element={<Numerique />} />
        <Route path="/sante" element={<Sante />} />
        <Route path="/ecologie" element={<Ecologie />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
