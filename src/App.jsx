import { useState, useEffect } from "react";
import "./App.css";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";

function App() {
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("poll_data");
    return saved ? JSON.parse(saved) : [];
  });

  const [hasVoted, setHasVoted] = useState(() => {
    const saved = localStorage.getItem("has_Voted");
    return saved ? JSON.parse(saved) : false;
  });

  // persists the data whenever state changes
  useEffect(() => {
    localStorage.setItem("poll_data", JSON.stringify(options));
    localStorage.setItem("has_Voted", JSON.stringify(hasVoted));
  }, [options, hasVoted]);

  const handleAddOption = (text) => {
    // validation to prevent empty options
    if (!text.trim()) return; 
    const newOption = { id: Date.now(), text, votes: 0 };
    setOptions([...options, newOption]);
  };
  
  const handleVote = (id) => {
    if (hasVoted) return;
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    ));
    setHasVoted(true);
  };

  const handleReset = () => {
    setOptions([]);
    setHasVoted(false);
    localStorage.removeItem("poll_data");
    localStorage.removeItem("has_Voted");
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Voting Poll</h1>

      {/* Logic passed to Emmanuel Munene */}
      <PollForm onAdd={handleAddOption} />

      {/* Logic passed to Favour Kendi */}
      <PollList options={options} onVote={handleVote} hasVoted={hasVoted} />

      <div className="flex justify-center">
        <button 
          onClick={handleReset} 
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Reset Poll
        </button>
      </div>
    </div>
  );
}

export default App;