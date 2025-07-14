import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState('Combat');
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await supabase.from('karma_tasks').select();
    setTasks(data || []);
  };

  const handleKarmaAsk = async () => {
    setResponse('Thinking...');
    try {
      const res = await axios.post('/api/karma', { input, mode });
      setResponse(res.data.reply);
      if (res.data.audioUrl) playAudio(res.data.audioUrl);
    } catch (e) {
      setResponse('Error: ' + e.message);
    }
  };

  const playAudio = (url) => {
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play();
    setPlaying(true);
    audio.onended = () => setPlaying(false);
  };

  const handleAddTask = async () => {
    if (!input) return;
    await supabase.from('karma_tasks').insert({ task: input });
    fetchTasks();
    setInput('');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-4xl font-bold mb-4">🧠 K.A.R.M.A. — God Mode</h1>

      <div className="mb-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="bg-gray-800 p-2 rounded mb-2"
        >
          <option value="Zen">Zen 🧘</option>
          <option value="Combat">Combat ⚔️</option>
          <option value="Mentor">Mentor 📚</option>
          <option value="Manager">Manager 🧾</option>
        </select>
        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Ask or add task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={handleKarmaAsk} className="bg-blue-700 px-4 py-2 rounded">Ask</button>
          <button onClick={handleAddTask} className="bg-green-700 px-4 py-2 rounded">Add Task</button>
        </div>
      </div>

      <section className="bg-gray-900 p-4 rounded">
        <h2 className="text-xl mb-2">🗣️ Karma Says</h2>
        <p>{response}</p>
      </section>

      {playing && <p className="text-yellow-400 mt-2">🔊 Speaking...</p>}

      <section className="mt-6">
        <h2 className="text-xl">📋 Your Tasks</h2>
        <ul className="list-disc ml-5">
          {tasks.map((t) => (
            <li key={t.id}>{t.task}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
