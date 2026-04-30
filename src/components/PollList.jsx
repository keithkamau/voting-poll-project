import PollOption from "./PollOption";

function PollList({
  options,
  onVote,
  hasVoted,
  totalVotes,
  maxVotes,
  onDelete,
}) {
  return (
    <div className='space-y-6'>
      {options.length === 0 ? (
        <div className='text-center py-10 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50'>
          <p className='text-slate-400 italic'>
            No options yet. Add one above to start!
          </p>
        </div>
      ) : (
        options.map((opt) => (
          <PollOption
            key={opt.id}
            option={opt}
            onVote={onVote}
            hasVoted={hasVoted}
            percentage={
              totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100)
            }
            isLeading={totalVotes > 0 && opt.votes === maxVotes}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default PollList;
