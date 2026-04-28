import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GuessTheSequence from './pages/GuessTheSequence';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/guess-the-sequence" element={<GuessTheSequence />} />
    </Routes>
  );
}

export default App;
