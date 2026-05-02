function PollOption({ option, onVote, hasVoted, percentage }) {
  return (
    <article className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-200 hover:shadow-md sm:p-5'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div className='min-w-0'>
          <h3 className='break-words text-base font-bold text-slate-950 sm:text-lg'>
            {option.text}
          </h3>
          <p className='mt-1 text-sm text-slate-500'>
            {option.votes} {option.votes === 1 ? "vote" : "votes"}
          </p>
        </div>
        <div className='flex items-center gap-3 sm:justify-end'>
          <span className='rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-700'>
            {percentage}%
          </span>
          <button
            type='button'
            onClick={() => onVote(option.id)}
            disabled={hasVoted}
            className={`min-h-10 rounded-lg px-4 text-sm font-bold transition focus:outline-none focus:ring-4 ${
              hasVoted
                ? "cursor-not-allowed bg-slate-200 text-slate-500 focus:ring-slate-100"
                : "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:ring-indigo-200"
            }`}
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </div>
      </div>

      <div
        className='mt-4 h-4 overflow-hidden rounded-full bg-slate-200'
        aria-label={`${option.text} has ${percentage}% of votes`}
      >
        <div
          className='h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 transition-all duration-500 ease-out'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </article>
  );
}

export default PollOption;
