# 🧠 LeetCode Helper Chrome Extension

LeetCode Helper is a Chrome extension that reads the current LeetCode problem and generates a beginner-friendly explanation using Google's Gemini API.

## ⚙️ Features
- Extracts problem statements from LeetCode automatically.
- Cleans up the "Can you solve this..." text.
- Sends the question to a Node.js backend connected to Gemini.
- Displays the AI explanation in the popup UI.

## 🧰 Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **API:** Gemini 1.5 Flash
- **Platform:** Chrome Extension

## 🚀 Setup
```bash
npm install
node backend/server.js