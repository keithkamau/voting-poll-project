import PollOption from "./PollOption";

function PollList({ options, onVote, hasVoted, totalVotes }) {
  return (
    <div className='mt-5 space-y-4'>
      {options.length === 0 ? (
        <div className='rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-10 text-center'>
          <p className='font-medium text-slate-500'>
            No options yet. Add one above to start the poll.
          </p>
        </div>
      ) : (
        options.map((option) => {
          const percentage =
            totalVotes === 0
              ? 0
              : Math.round((option.votes / totalVotes) * 100);

          return (
            <PollOption
              key={option.id}
              option={option}
              onVote={onVote}
              hasVoted={hasVoted}
              percentage={percentage}
            />
          );
        })
      )}
    </div>
  );
}

export default PollList;
