import { useEffect, useState } from "react";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";

const STORAGE_KEYS = {
  options: "voting_poll_options",
  hasVoted: "voting_poll_has_voted",
};

const createDefaultOptions = () => [
  { id: crypto.randomUUID(), text: "William Ruto", votes: 0 },
  { id: crypto.randomUUID(), text: "Fred Matiang'i", votes: 0 },
  { id: crypto.randomUUID(), text: "Kalonzo Musyoka", votes: 0 },
];

const readStoredValue = (key, fallback) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
};

const hasOldDefaultOptions = (options) => {
  const oldDefaultNames = ["React", "Vue", "Svelte"];

  return (
    Array.isArray(options) &&
    options.length === oldDefaultNames.length &&
    options.every((option) => oldDefaultNames.includes(option.text))
  );
};

function App() {
  const [options, setOptions] = useState(() => {
    const savedOptions = readStoredValue(
      STORAGE_KEYS.options,
      createDefaultOptions(),
    );

    return hasOldDefaultOptions(savedOptions)
      ? createDefaultOptions()
      : savedOptions;
  });
  const [hasVoted, setHasVoted] = useState(() =>
    readStoredValue(STORAGE_KEYS.hasVoted, false),
  );
  const [newOptionText, setNewOptionText] = useState("");
  const [addOptionError, setAddOptionError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.options, JSON.stringify(options));
    localStorage.setItem(STORAGE_KEYS.hasVoted, JSON.stringify(hasVoted));
  }, [options, hasVoted]);

  const totalVotes = options.reduce((total, option) => total + option.votes, 0);

  const handleOptionTextChange = (event) => {
    setNewOptionText(event.target.value);
    setAddOptionError("");
  };

  const handleAddOption = (event) => {
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

    setOptions((currentOptions) => [
      ...currentOptions,
      { id: crypto.randomUUID(), text: trimmedText, votes: 0 },
    ]);
    setNewOptionText("");
  };

  const handleVote = (id) => {
    if (hasVoted) return;

    setOptions((currentOptions) =>
      currentOptions.map((option) =>
        option.id === id ? { ...option, votes: option.votes + 1 } : option,
      ),
    );
    setHasVoted(true);
  };

  const handleReset = () => {
    setOptions((currentOptions) =>
      currentOptions.map((option) => ({ ...option, votes: 0 })),
    );
    setHasVoted(false);
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
                    Poll Results
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
