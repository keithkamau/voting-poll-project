function PollForm({ optionText, onOptionTextChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className='rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5'
    >
      <label
        htmlFor='poll-option'
        className='block text-sm font-bold text-slate-700'
      >
        Add a poll option
      </label>
      <div className='mt-3 flex flex-col gap-3 sm:flex-row'>
        <input
          id='poll-option'
          type='text'
          value={optionText}
          onChange={onOptionTextChange}
          placeholder='Type an option, e.g. Angular'
          className='min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100'
        />
        <button
          type='submit'
          className='min-h-11 rounded-lg bg-cyan-600 px-5 font-bold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200'
        >
          Add Option
        </button>
      </div>
    </form>
  );
}

export default PollForm;
