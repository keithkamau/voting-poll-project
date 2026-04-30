function PollOption({
  option,
  onVote,
  hasVoted,
  percentage,
  isLeading,
  onDelete,
}) {
  return (
    <div
      className={`relative p-4 rounded-xl border transition-all duration-300 
      ${isLeading ? "border-amber-400 bg-amber-50/30 shadow-md" : "border-slate-100 bg-slate-50"}`}
    >
      {/* 👑 Leading Badge */}
      {isLeading && (
        <span className='absolute -top-3 left-4 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm'>
          Leading
        </span>
      )}

      <button
        onClick={() => onDelete(option.id)}
        className='absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors text-lg'
        title='Delete Option'
      >
        ✕
      </button>

      <div className='flex justify-between items-center mb-2 mt-2 md:mt-0'>
        <span className='font-semibold text-slate-700'>{option.text}</span>
        <span className='text-sm font-mono font-bold text-indigo-600'>
          {percentage}%
        </span>
      </div>

      {/* Animated progress bar */}
      <div className='w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4'>
        <div
          className='h-full bg-emerald-500 transition-all duration-500 ease-out'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className='flex justify-between items-center'>
        <span className='text-xs text-slate-500'>{option.votes} votes</span>
        <button
          onClick={() => onVote(option.id)}
          disabled={hasVoted}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all
            ${
              hasVoted
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-amber-400 text-amber-900 hover:bg-amber-500 active:scale-95"
            }`}
        >
          {hasVoted ? "Voted" : "Vote"}
        </button>
      </div>
    </div>
  );
}

export default PollOption;
