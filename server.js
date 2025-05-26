const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors()); // ✅ Cho phép frontend từ domain khác gọi API
app.use(bodyParser.json()); // ✅ Đọc JSON từ body

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = completion?.data?.choices?.[0]?.message?.content;
    
    if (!reply) {
      return res.status(500).json({
        reply: "❌ GPT không trả lời! Có thể do API key sai, hết hạn hoặc cấu hình sai!"
      });
    }

    res.json({ reply });

  } catch (err) {
    res.status(500).json({
      reply: `❌ Lỗi server: ${err.message}`
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại port ${PORT}`);
});
