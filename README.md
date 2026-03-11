# Project Assist - Frontend

The frontend for **Project Assist**, an interactive web-based coding platform. It allows users to browse algorithmic problems, write code using an integrated code editor, run test cases, and receive intelligent AI-generated feedback when their code fails.

## Link to Backend: https://github.com/IbrahimF1/PerScholas-Capstone-Backend

## ✨ Features

* **Interactive Code Editor:** Features an integrated Monaco Editor (the engine behind VS Code) customized for dark mode.
* **Problem Library:** Browse a seeded library of 45 algorithmic problems categorized by difficulty (Easy, Medium, Hard).
* **Live Code Execution & Testing:** Run your code against predefined test cases and add your own custom test cases on the fly.
* **AI Coding Tutor:** Receive gentle, context-aware AI hints (powered by Google Gemini) when your test cases fail, without having the answer given away.
* **Markdown Rendering:** Formatted problem descriptions and AI feedback using `marked`.
* **User Dashboard & Settings:** Track problems attempted/solved, set an integrated coding timer, and manage preferences (Default Language, Dark Mode).
* **Immersive UI:** Custom CSS features including an animated starry background and shooting stars logo.

## 🛠️ Tech Stack

* **Framework:** React 19 + Vite
* **Routing:** React Router DOM
* **Code Editor:** `@monaco-editor/react`
* **HTTP Client:** Axios
* **Markdown Parsing:** Marked
* **Styling:** CSS3 (Flexbox, CSS Variables, Custom Animations)

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* The backend server running locally on port `3000`.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.
