import PollOption from "./PollOption";

function PollList({ options, totalVotes, hasVoted, onVote }) {

  if (options.length === 0) {
    return (
      <div className="text-center py-16 text-muted font-body">
        <p>No options yet. Add one above!</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="font-display text-lg font-bold mb-4 text-frost-mid">
        Poll Options
      </h2>

      <div className="space-y-3">
        {options.map(function (option) {
          return (
            <PollOption
              key={option.id}
              option={option}
              totalVotes={totalVotes}
              hasVoted={hasVoted}
              onVote={onVote}
            />
          );
        })}
      </div>
    </section>
  );
}

export default PollList;