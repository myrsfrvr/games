import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GuessTheSequence from './pages/GuessTheSequence';
import MemoryCardsMenu from './pages/memory-game/MemoryCardsMenu';
import MemoryCardsGame from './pages/memory-game/MemoryCardsGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/guess-the-sequence" element={<GuessTheSequence />} />
      <Route path="/memory-cards" element={<MemoryCardsMenu />} />
      <Route path="/memory-cards/game" element={<MemoryCardsGame />} />
    </Routes>
  );
}

export default App;
