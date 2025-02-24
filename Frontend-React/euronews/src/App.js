import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from './Articles';
import Politique from './Politique'; // Import de la page Politique
import Numerique from './Numerique'; // Import de la page Numerique
import Sante from './Sante'; // Import de la page Sante
import Ecologie from './Ecologie'; // Import de la page Ecologie

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/politique" element={<Politique />} />
        <Route path="/Numerique" element={<Numerique />} />
        <Route path="/Sante" element={<Sante />} />
        <Route path="/Ecologie" element={<Ecologie />} />
      </Routes>
    </Router>
  );
}

export default App;

