import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";
import { useAuth } from "./contexts/authContexts/authContext";
import { doSignOut } from "./firebase/auth";
import {
  createOption,
  createUserVote,
  deleteUserVote,
  getOptions,
  getUserVote,
  getUserVotes,
  updateOption,
} from "./services/pollApi";

const applyVoteCounts = (options, votes) => {
  const voteCounts = votes.reduce((counts, vote) => {
    counts[vote.optionId] = (counts[vote.optionId] ?? 0) + 1;
    return counts;
  }, {});

  return options.map((option) => ({
    ...option,
    votes: voteCounts[option.id] ?? 0,
  }));
};

function App() {
  const { currentuser } = useAuth();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [userVote, setUserVote] = useState(null);
  const [newOptionText, setNewOptionText] = useState("");
  const [addOptionError, setAddOptionError] = useState("");
  const [pageError, setPageError] = useState("");
  const [isLoadingPoll, setIsLoadingPoll] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const loadPoll = async () => {
      setIsLoadingPoll(true);
      setUserVote(null);

      try {
        const [savedOptions, savedUserVotes, savedUserVote] = await Promise.all([
          getOptions(),
          getUserVotes(),
          getUserVote(currentuser.uid),
        ]);

        setOptions(applyVoteCounts(savedOptions, savedUserVotes));
        setUserVote(savedUserVote);
        setPageError("");
      } catch {
        setPageError(
          "Could not load poll data. Make sure JSON Server is running on port 3001.",
        );
      } finally {
        setIsLoadingPoll(false);
      }
    };

    loadPoll();
  }, [currentuser.uid]);

  const totalVotes = options.reduce((total, option) => total + option.votes, 0);
  const hasVoted = Boolean(userVote);

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
      const newOption = await createOption({
        id: crypto.randomUUID(),
        text: trimmedText,
        votes: 0,
      });

      setOptions((currentOptions) => [...currentOptions, newOption]);
      setNewOptionText("");
      setPageError("");
    } catch {
      setAddOptionError("Could not save this option. Is JSON Server running?");
    }
  };

  const handleVote = async (id) => {
    if (hasVoted || isVoting) return;

    const selectedOption = options.find((option) => option.id === id);
    if (!selectedOption) return;

    setIsVoting(true);

    try {
      const existingVote = await getUserVote(currentuser.uid);

      if (existingVote) {
        setUserVote(existingVote);
        return;
      }

      const savedVote = await createUserVote({
        userId: currentuser.uid,
        userEmail: currentuser.email,
        optionId: id,
      });
      const savedUserVotes = await getUserVotes();
      const nextOptions = applyVoteCounts(options, savedUserVotes);

      await Promise.all(
        nextOptions.map((option) => updateOption(option.id, option)),
      );
      setOptions((currentOptions) =>
        currentOptions.map((option) =>
          nextOptions.find((nextOption) => nextOption.id === option.id) ??
          option,
        ),
      );
      setUserVote(savedVote);
      setPageError("");
    } catch {
      setPageError("Could not save your vote. Check JSON Server and try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const handleSignOut = async () => {
    await doSignOut();
    navigate("/login");
  };

  const handleReset = async () => {
    if (hasVoted) return;

    try {
      const votes = await getUserVotes();

      await Promise.all([
        ...votes.map((vote) => deleteUserVote(vote.id)),
        ...options.map((option) => updateOption(option.id, { ...option, votes: 0 })),
      ]);

      setOptions((currentOptions) =>
        currentOptions.map((option) => ({ ...option, votes: 0 })),
      );
      setUserVote(null);
      setPageError("");
    } catch {
      setPageError("Could not reset the poll. Check JSON Server and try again.");
    }
  };

  const handleRefreshCounts = async () => {
    try {
      const [savedOptions, savedUserVotes] = await Promise.all([
        getOptions(),
        getUserVotes(),
      ]);
      const syncedOptions = applyVoteCounts(savedOptions, savedUserVotes);

      await Promise.all(
        syncedOptions.map((option) => updateOption(option.id, option)),
      );
      setOptions(syncedOptions);
      setPageError("");
    } catch {
      setPageError("Could not refresh vote counts. Check JSON Server.");
    }
  };

  if (isLoadingPoll) {
    return (
      <main className='min-h-screen bg-slate-950 flex items-center justify-center'>
        <div className='text-slate-100 text-xl font-semibold animate-pulse'>
          Loading poll...
        </div>
      </main>
    );
  }

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
              <p className='mt-4 text-sm font-semibold text-white/90'>
                Signed in as {currentuser.email}
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
              <button
                type='button'
                onClick={handleSignOut}
                className='mt-6 rounded-lg bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-white/40'
              >
                Switch account
              </button>
            </aside>

            <div className='bg-slate-50 p-5 text-slate-900 sm:p-8 lg:p-10'>
              {pageError ? (
                <div className='mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700'>
                  {pageError}
                </div>
              ) : null}

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
                      ? "Thanks for voting. Your Firebase account has already voted."
                      : "Choose one option to cast your vote."}
                  </p>
                </div>
                <div className='flex flex-col gap-2 sm:flex-row'>
                  <button
                    type='button'
                    onClick={handleRefreshCounts}
                    className='rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200'
                  >
                    Refresh counts
                  </button>
                  <button
                    type='button'
                    onClick={handleReset}
                    disabled={hasVoted}
                    className={`rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition focus:outline-none focus:ring-4 ${
                      hasVoted
                        ? "cursor-not-allowed bg-slate-200 text-slate-500 focus:ring-slate-100"
                        : "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-200"
                    }`}
                  >
                    {hasVoted ? "Reset locked" : "Reset votes"}
                  </button>
                </div>
              </div>

              <PollList
                options={options}
                onVote={handleVote}
                hasVoted={hasVoted || isVoting}
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
