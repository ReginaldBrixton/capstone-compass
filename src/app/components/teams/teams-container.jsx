const TeamsContainer = () => {
  return (
    <div id="teams-section" className="mx-auto w-full max-w-7xl px-4 py-8">
      <h2 id="teams-title" className="mb-6 text-2xl font-bold text-gray-800">
        My Teams
      </h2>

      <div
        id="teams-grid"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Teams content */}
      </div>

      <button
        id="create-team-btn"
        className="mt-8 rounded-full bg-primary px-4 py-2 font-bold text-white transition-colors hover:bg-primary/90"
      >
        +
      </button>
    </div>
  );
};
