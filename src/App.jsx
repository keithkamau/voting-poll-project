import React from "react";
// import { useState, useEffect } from "react";
import "./App.css";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";

function App() {
  const [options, setOptions] = useState(() => {
    const savedOptions ? JSON.parse(saved) : [];
  });

  const [hasVoted, setHasVoted] = useState(() => {
    const saved = localStorage.getItem("has_Voted");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("poll_data", JSON.stringify(options));
    localStorage.setItem("has_Voted", JSON.stringify(hasVoted));
  }, [options, hasVoted]);

  const handleAddOption = (text) => {
    const newOption = { id: Date.now(), text, votes: 0 };
    setOptions([...options, newOption]);
  };
  
  const handleVote = (id) => {
    if (hasVoted) return;
    setOptions(options.map(opt => opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt));
    setHasVoted(true);
  };

  const handleReset = () => {
    setOptions([]);
    setHasVoted(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Voting Poll</h1>

      <PollForm onAdd={handleAddOption} />

      <PollList options={options} onVote={handleVote} hasVoted={hasVoted} />

      <button onClick={handleReset} className="mt-4 bg-red-500 text-white px-4 py-2 rounded" 
      >
        Reset Poll
      </button>
    </div>
  );
}

export default App;
