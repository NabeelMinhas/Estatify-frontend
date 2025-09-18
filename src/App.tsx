import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
