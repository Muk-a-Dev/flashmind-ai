# FlashMind AI - Interactive AI Study Assistant

FlashMind AI is an AI-powered study assistant built for the **Frontend Internship Assignment**. It converts free-form study notes into interactive, stateful learning tools—specifically **3D Flashcards** and a **Multiple-Choice Quiz with Retry Wrong Questions capability**.

> **Note:** This application is **NOT a chatbot**. The backend forces strict JSON formatting from Groq's LLM (`llama-3.3-70b-versatile`), which the frontend validates and converts into stateful React components.

---

## 🚀 Key Features

1. **Free-Form Study Notes Input**:
   - Accepts lecture notes, articles, or summary text.
   - Built-in **Example Notes** loader for instant testing.
2. **Interactive 3D Flashcards (Page 1)**:
   - Hardware-accelerated 3D flip animation (click or Spacebar).
   - Step navigation with dynamic progress indicator (`3 / 10`).
   - Keyboard shortcuts (Left/Right Arrow keys).
3. **Multiple-Choice Quiz (Page 2)**:
   - Auto-generated 4-option multiple-choice questions.
   - Interactive choice selection and progress tracking.
4. **Results & Assessment (Page 3)**:
   - Instant score calculation (%) with detailed question breakdown.
   - **"Retry Wrong Questions"**: Re-tests only failed questions to reinforce weak areas.
5. **Robust AI Failure & Stale Request Handling**:
   - **Race Condition Prevention**: `useGenerateNotes` hook uses `AbortController` to cancel pending in-flight requests when new requests are submitted.
   - **Malformed JSON Handling**: Graceful error UI ("We couldn't understand the AI response.") with Retry option.
   - **Empty Response Handling**: Catches empty array responses.
   - **Timeout Protection**: 18-second server-side timeout mapping to a friendly timeout error.
   - **Schema Validation**: Server-side runtime checking (`validateAIResponse`) ensures JSON type safety before sending payload to client.

---

## 🏗️ Architecture

```
[ React SPA (Vite + TailwindCSS) ]
                │
                ▼ (POST /api/generate)
[ Express Backend (Node.js Proxy) ]  ◄── Enforces API Key Security & Timeout
                │
                ▼ (json_object mode)
[ Groq API (llama-3.3-70b-versatile) ]
                │
                ▼
[ Strict JSON Schema Validation ]
                │
                ▼
[ React Interactive UI Components ]
```

### Folder Structure

```
flashmind-ai/
├── server/                      # Express Backend API Proxy
│   ├── controllers/             # Express request handlers & timeout logic
│   ├── routes/                  # Express API routing (/api/generate)
│   ├── services/                # Groq SDK client & system prompt engineering
│   ├── utils/                   # Schema validation (validateAIResponse)
│   └── index.js                 # Server entry point
├── src/                         # React Frontend
│   ├── components/
│   │   ├── Flashcard/           # FlashcardCard & FlashcardDeck components
│   │   ├── Quiz/                # QuizView component
│   │   ├── Results/             # ResultsView & Retry Wrong Questions
│   │   └── Layout/              # Navbar, ErrorMessage, LoadingSpinner
│   ├── hooks/                   # useGenerateNotes hook (with AbortController)
│   ├── pages/                   # Home page text input & example loader
│   ├── services/                # Fetch API client
│   └── utils/                   # Sample notes helper
├── .env.example                 # Environment variables template
├── tailwind.config.js           # Tailwind CSS configuration
└── vite.config.js               # Vite build & API proxy setup
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Groq API Key**: Obtain a free API key from [Groq Console](https://console.groq.com/)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Muk-a-Dev/flashmind-ai.git
cd flashmind-ai
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Add your Groq API key:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
PORT=5001
```

---

## 🏃 How to Run

### Development Mode (Runs Frontend & Backend concurrently)

```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend Proxy: `http://localhost:5001`

### Production Mode

```bash
npm run build
npm start
```

---

## 🤖 AI Usage Disclosure

In compliance with the assignment instructions:
- **AI Tools Used**: Used Claude / DeepMind coding assistants for pair-programming, setting up boilerplate configurations, generating sample study content, and validating React hook architecture.
- **Original Code Ownership**: All core React hooks (`useGenerateNotes`), Groq service wrapper, Express validation logic (`validateAIResponse`), 3D CSS flip animations, and component state flows were crafted, understood, and tested by the developer.

---

## ⚠️ Known Limitations

1. **Context Window Limits**: Extremely long study notes (> 15,000 words) may approach model context limits or cause response latency.
2. **Groq Rate Limits**: Free tier Groq keys are subject to standard API request rate limits.

---

## 🔮 Future Improvements

- **Export Study Sets**: Export flashcards to Anki (.apkg) or PDF formats.
- **Persistence**: Save flashcards to local storage (`localStorage`) or PostgreSQL database.
- **Custom Difficulty**: Allow users to select quiz difficulty (Easy, Medium, Hard).

---

## ⏱️ Time Spent

- **Total Development Time**: ~6 hours total.
  - Architecture & Setup: 1 hour
  - Backend & Groq API Integration: 1.5 hours
  - Frontend Components & 3D Flashcards: 2 hours
  - Error Handling, Stale Request Prevention & Testing: 1.5 hours
