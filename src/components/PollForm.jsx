import { useState } from "react";

function PollForm({ onAdd }) {

  const [inputValue, setInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
        e.preventDefault();

        if (inputValue === "") {
      setErrorMessage("Please type an option before submitting.");
      return;
    }

       if (inputValue.length < 2) {
      setErrorMessage("Option must be at least 2 characters.");
      return;
    }

    onAdd(inputValue);

    setInputValue("");
    setErrorMessage("");
  }

  return (
    <section className="bg-card border border-border rounded-2xl p-5 md:p-6">
      <h2 className="font-display text-lg font-bold mb-4 text-frost-mid">
        Add a Poll Option
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">

        <div className="flex flex-col flex-1 gap-1.5">
          <input
            type="text"
            value={inputValue}
            onChange={function (e) {
              setInputValue(e.target.value);
              if (errorMessage !== "") {
                setErrorMessage("");
              }
            }}
            placeholder="Type a new option here..."
            className="w-full bg-ink border border-border rounded-xl px-4 py-3 text-frost placeholder-muted text-sm font-body focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors duration-200"
          />

          {errorMessage !== "" && (
            <p className="text-coral text-xs px-1">{errorMessage}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-volt text-ink rounded-xl font-display font-bold text-sm hover:bg-volt-dim transition-all duration-200 active:scale-95 whitespace-nowrap self-start sm:self-auto"
        >
          + Add Option
        </button>
      </form>
    </section>
  );
}

export default PollForm;