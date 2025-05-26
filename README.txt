# Chatbot Backend - Node.js (Render Ready)
Triển khai chatbot AI backend đơn giản với OpenAI GPT-3.5 turbo.

## Hướng dẫn deploy trên Render.com:
1. Tạo tài khoản tại https://render.com
2. Tạo Web Service → chọn repo chứa mã nguồn này
3. Build command: `npm install`
4. Start command: `node server.js`
5. Port: `3000`
6. Thêm biến môi trường: `OPENAI_API_KEY = sk-...` (lấy từ openai.com)

## Endpoints
POST /api/chat
Body: { "message": "Xin chào" }
