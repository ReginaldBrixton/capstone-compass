const TeamsContainer = () => {
  return (
    <div 
      id="teams-section" 
      className="w-full max-w-7xl mx-auto px-4 py-8"
    >
      <h2 
        id="teams-title"
        className="text-2xl font-bold mb-6 text-gray-800"
      >
        My Teams
      </h2>
      
      <div 
        id="teams-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Teams content */}
      </div>

      <button
        id="create-team-btn"
        className="mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full transition-colors"
      >
        +
      </button>
    </div>
  )
} 