function About() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <h1 className="text-3xl font-bold">About This Poll</h1>
      <p className="mt-4 text-slate-300">
        This page is lazy-loaded only when someone visits /about.
      </p>
    </main>
  );
}

export default About;
