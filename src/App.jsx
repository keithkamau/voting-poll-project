import { useEffect, useState } from "react";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";

const API_BASE = "http://localhost:3000";

function App() {
  const [options, setOptions] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [newOptionText, setNewOptionText] = useState("");
  const [addOptionError, setAddOptionError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch options and voter status on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [optionsRes, voterRes] = await Promise.all([
          fetch(`${API_BASE}/options`),
          fetch(`${API_BASE}/voter`),
        ]);

        if (!optionsRes.ok || !voterRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const fetchedOptions = await optionsRes.json();
        const voterData = await voterRes.json();

        setOptions(fetchedOptions);
        setHasVoted(voterData.hasVoted);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalVotes = options.reduce((total, option) => total + option.votes, 0);

  if (loading) {
    return (
      <main className='min-h-screen bg-slate-950 px-4 py-6 text-slate-100 flex items-center justify-center sm:px-6 lg:px-8'>
        <p className='text-lg font-semibold'>Loading poll data...</p>
      </main>
    );
  }

  const handleOptionTextChange = (event) => {
    setNewOptionText(event.target.value);
    setAddOptionError("");
  };

  const handleAddOption = async (event) => {
    event.preventDefault();

    const trimmedText = newOptionText.trim();
    if (!trimmedText) return;

    const isDuplicate = options.some(
      (option) =>
        option.text.trim().toLowerCase() === trimmedText.toLowerCase(),
    );

    if (isDuplicate) {
      setAddOptionError("This option already exists.");
      return;
    }

    try {
      const newOption = {
        id: crypto.randomUUID(),
        text: trimmedText,
        votes: 0,
      };

      const response = await fetch(`${API_BASE}/options`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOption),
      });

      if (!response.ok) {
        throw new Error("Failed to add option");
      }

      setOptions((prev) => [...prev, newOption]);
      setNewOptionText("");
    } catch (error) {
      console.error("Error adding option:", error);
      setAddOptionError("Failed to add option. Please try again.");
    }
  };

  const handleVote = async (id) => {
    if (hasVoted) return;

    try {
      const optionToUpdate = options.find((opt) => opt.id === id);
      if (!optionToUpdate) return;

      const updatedOption = {
        ...optionToUpdate,
        votes: optionToUpdate.votes + 1,
      };

      const response = await fetch(`${API_BASE}/options/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOption),
      });

      if (!response.ok) {
        throw new Error("Failed to vote");
      }

      setOptions((prev) =>
        prev.map((opt) => (opt.id === id ? updatedOption : opt))
      );

      // Update voter status
      const voterResponse = await fetch(`${API_BASE}/voter`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hasVoted: true }),
      });

      if (!voterResponse.ok) {
        throw new Error("Failed to update voter status");
      }

      setHasVoted(true);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleReset = async () => {
    try {
      // Reset all options
      const resetPromises = options.map((option) =>
        fetch(`${API_BASE}/options/${option.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...option, votes: 0 }),
        })
      );

      await Promise.all(resetPromises);

      // Reset voter status
      const voterResponse = await fetch(`${API_BASE}/voter`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hasVoted: false }),
      });

      if (!voterResponse.ok) {
        throw new Error("Failed to reset voter status");
      }

      setOptions((prev) =>
        prev.map((option) => ({ ...option, votes: 0 }))
      );
      setHasVoted(false);
    } catch (error) {
      console.error("Error resetting votes:", error);
    }
  };

  return (
    <main className='min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8'>
      <section className='mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col justify-center'>
        <div className='overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-cyan-950/40'>
          <div className='grid lg:grid-cols-[0.9fr_1.1fr]'>
            <aside className='bg-gradient-to-br from-cyan-500 via-indigo-600 to-amber-400 p-6 text-white sm:p-8 lg:p-10'>
              <p className='text-sm font-semibold uppercase tracking-[0.25em] text-white/80'>
                Breakout Room One
              </p>
              <h1 className='mt-4 text-3xl font-black leading-tight sm:text-5xl'>
                Voting Poll App
              </h1>
              <p className='mt-4 max-w-sm text-base leading-7 text-white/90'>
                Add options, vote once, watch the totals update live, and keep
                everything saved through page refreshes.
              </p>

              <div className='mt-8 grid grid-cols-2 gap-3 sm:max-w-sm'>
                <div className='rounded-2xl bg-white/15 p-4 backdrop-blur'>
                  <p className='text-3xl font-black'>{options.length}</p>
                  <p className='text-sm text-white/80'>Options</p>
                </div>
                <div className='rounded-2xl bg-white/15 p-4 backdrop-blur'>
                  <p className='text-3xl font-black'>{totalVotes}</p>
                  <p className='text-sm text-white/80'>Votes</p>
                </div>
              </div>
            </aside>

            <div className='bg-slate-50 p-5 text-slate-900 sm:p-8 lg:p-10'>
              <PollForm
                optionText={newOptionText}
                onOptionTextChange={handleOptionTextChange}
                onSubmit={handleAddOption}
                errorMessage={addOptionError}
              />

              <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h2 className='text-xl font-bold text-slate-950'>
                    Current Polls
                  </h2>
                  <p className='text-sm text-slate-500'>
                    {hasVoted
                      ? "Thanks for voting. Buttons are locked for this browser."
                      : "Choose one option to cast your vote."}
                  </p>
                </div>
                <button
                  type='button'
                  onClick={handleReset}
                  className='rounded-lg bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200'
                >
                  Reset votes
                </button>
              </div>

              <PollList
                options={options}
                onVote={handleVote}
                hasVoted={hasVoted}
                totalVotes={totalVotes}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
