# 🚀 Startup Guru AI

An AI-powered startup advisor that helps users validate, analyze, and improve their startup ideas instantly.

---

## ✨ Overview

Startup Guru AI acts like a virtual mentor for entrepreneurs.
Users can input their startup ideas and receive:

* ✅ Strengths of the idea
* 🚀 A practical MVP plan

This helps founders make faster, smarter decisions.

---

## 🔥 Features

* 🧠 AI-powered idea analysis
* 📈 Structured feedback 
* 🚀 MVP planning guidance
* 💬 Context-aware responses (supports previous ideas)
* ⚡ Fast API response using Openrouter.ai

---

## 🛠️ Tech Stack

* **Frontend:** Next.js
* **Backend:** Next.js API Routes
* **AI Engine:**  Openrouter.ai
* **Runtime:** Node.js

---

## 📦 Installation

```bash
git clone https://github.com/amankandhal34/startup-guru-ai.git
cd startup-guru-ai
npm install
```

---

## 🔐 Environment Setup

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=openai/gpt-4o-mini
```

⚠️ Never expose your API key publicly.

---

## ▶️ Running the App

```bash
npm run dev
```

Visit:

```
https://startupguru123.vercel.app/
```

---

## 📡 API Usage

### Endpoint:

```
POST /api/chat
```

### Request Body:

```json
{
  "message": "I want to build an AI fitness app",
  "idea": ""
}
```

### Response:

```json
{
  "reply": "Score: 8/10\nStrengths: ...\nRisks: ...\nMVP Plan: ..."
}
```

---

## 🧠 How It Works

1. User submits a startup idea
2. Backend creates a structured prompt
3. Prompt is sent to Gemini AI
4. AI returns detailed startup analysis
5. Response is displayed to the user

---

## 🚀 Use Cases

* 💡 Startup idea validation
* 🧑‍💻 Hackathon projects
* 📊 Business brainstorming
* 🎓 Student entrepreneurship

---

## 🔮 Future Enhancements

* 💾 Save chat history (database)
* 📊 Market analysis integration
* 📄 Export reports (PDF)
* 🌐 Multi-language support
* 🎨 Improved UI/UX

---

## ⚠️ Security

* Store API keys in environment variables
* Never expose secrets in frontend code
* Rotate keys if compromised

---

## 👨‍💻 Author

Built with ❤️ by Aman Kandhal

---

## 📄 License

MIT License
