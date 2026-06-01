const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// ==============================
// GANTI DENGAN API KEY GROQ KAMU
const GROQ_API_KEY = 'your_api_key_here';
// ==============================

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route: proxy ke Groq API
app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages harus berupa array' });
  }

  // Groq pakai format OpenAI — system message masuk ke array messages
  const groqMessages = [
    { role: 'system', content: system || 'You are a helpful assistant.' },
    ...messages
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: groqMessages
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error('Groq API error:', errData);
      return res.status(response.status).json({ error: errData.error?.message || 'API error' });
    }

    const data = await response.json();

    // Konversi format Groq ke format yang dimengerti frontend
    const reply = data.choices?.[0]?.message?.content || "Sorry, couldn't get a response.";
    res.json({
      content: [{ type: 'text', text: reply }]
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fallback ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 LearnAI server jalan di http://localhost:${PORT}`);
  console.log(`⚡ Powered by Groq — super cepet!`);
  console.log(`📚 Buka browser dan akses http://localhost:${PORT}\n`);
});
