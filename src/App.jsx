import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import CollegeFoodWheel from './components/CollegeFoodWheel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wheel" element={<CollegeFoodWheel />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
