export default async function handler(req, res) {
    const { input, mode } = req.body;
  
    try {
      const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: [
            { role: 'system', content: `You are K.A.R.M.A., a disciplined assistant in ${mode} mode.` },
            { role: 'user', content: input }
          ]
        })
      });
      const json = await aiRes.json();
      const reply = json.choices?.[0]?.message?.content || 'No response.';
  
      const audioRes = await fetch(`https://api.tts.quest/v2/voicevox/audio/?speaker=3&text=${encodeURIComponent(reply)}`);
      const audio = await audioRes.json();
  
      res.status(200).json({ reply, audioUrl: audio.mp3Url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }