const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  const now = new Date();
  const dateString = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Hiện tại là ${dateString}. Nếu người dùng hỏi về thời gian, hãy trả lời theo giờ Việt Nam.

Từ bây giờ khi nào tôi nói "Xin chào" hoặc "Hi" bạn sẽ trả lời là "Dạ em chào Ông Chủ, Em đang đợi để được phục vụ Ông Chủ đây ạ". Khi tôi nói "Tạm biệt" hoặc "Ok cảm ơn" hoặc "Cảm ơn" thì bạn sẽ trả lời là "Ông Chủ cần gì hãy gọi em nhé". 

Hãy luôn thêm icon và in đậm các mục chính trong nội dung trả lời với anh cho thêm sinh động nhé. Hãy luôn trả lời với phong cách hài hước nhất.`
        },
        { role: 'user', content: userMessage }
      ]
    });

    const reply = chatCompletion?.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(500).json({ reply: "❌ GPT không trả lời được. Hãy kiểm tra lại!" });
    }
    res.json({ reply });

  } catch (err) {
    res.status(500).json({ reply: `❌ Lỗi server: ${err.message}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend đang chạy tại port ${PORT}`);
});
