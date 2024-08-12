import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home';
import { Auth } from './pages/auth/auth';
import { CreateRecipe } from './pages/create';
import { SavedRecipes } from './pages/saved';
import { Navbar } from './component/navbar';
import { Generate } from './pages/generate';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/saved" element={<SavedRecipes />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
