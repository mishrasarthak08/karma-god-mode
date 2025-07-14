// pages/index.js (for Next.js) or App.js (for React)
export default function KarmaUI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0e0e1a] to-gray-900 text-white font-mono p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h1 className="text-4xl font-bold tracking-wide text-blue-400">K.A.R.M.A</h1>
          <span className="text-sm text-gray-400">God Mode Enabled</span>
        </div>

        {/* MODES */}
        <div className="flex gap-4">
          {["Zen", "Combat", "Mentor", "Manager"].map(mode => (
            <button
              key={mode}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-blue-500 text-blue-300 text-sm shadow-md"
            >
              {mode} Mode
            </button>
          ))}
        </div>

        {/* CHAT INTERFACE */}
        <div className="bg-[#121222] rounded-xl p-6 shadow-inner space-y-4">
          <div className="text-xs text-gray-400">Assistant Response</div>
          <div className="bg-black/40 p-4 rounded-lg min-h-[100px] border border-gray-700">
            <p className="text-blue-300">"Welcome back, Sarthak. You have 3 scheduled focus blocks today. Entering Zen Mode..."</p>
          </div>
        </div>

        {/* INPUT BAR */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask Karma anything..."
            className="flex-1 bg-black/50 border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-semibold shadow">
            Send
          </button>
        </div>

        {/* FOOTER STATUS */}
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-4 flex justify-between">
          <span>Listening...</span>
          <span>Connected to Supabase · v1.0</span>
        </div>
      </div>
    </div>
  );
}
