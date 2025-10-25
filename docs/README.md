# 🧠 LeetCode AI Helper Extension

- Built a Chrome Extension that extracts LeetCode problem statements and generates structured explanations using Google Gemini API.

- Designed a Node.js backend to process problem statements and return AI-generated problem understanding, approach/pseudocode, and related topics.

- Implemented response streaming (word-by-word) and a loading animation for smooth user experience.

- Utilized Chrome Scripting API, JavaScript, HTML, CSS, and Express.js, demonstrating full-stack integration and prompt engineering.

- Managed sensitive API keys securely using environment variables and handled CORS for extension requests.

---

## 🚀 Features
- Fetches problem statements directly from the LeetCode page.  
- Sends them to the backend for AI-powered explanations.  
- Displays formatted explanations inside the extension popup.  
- Loading animation and word-by-word streaming for smooth UX.  

---

## 🛠️ Tech Stack
**Frontend (Extension):**
- HTML, CSS, JavaScript  
- Chrome Scripting API  

**Backend:**
- Node.js  
- Express.js  
- Google Gemini API  

---

## ⚙️ Project Structure

LeetCode-Helper-Extension/
│
├── backend/
│ ├── routes/
│ │ └── explain.js
│ ├── utils/
│ │ └── geminiAI.js
│ ├── server.js
│ ├── .env
│
├── extension/
│ ├── popup.html
│ ├── popup.js
│ ├── popup.css
│ ├── manifest.json
│
└── README.md

yaml
Copy code

---

## 🧩 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/LeetCode-Helper-Extension.git
cd LeetCode-Helper-Extension
2️⃣ Setup Environment Variables
Create a .env file inside the backend/ folder and add your Gemini API key:

ini
Copy code
GEMINI_API_KEY=your_api_key_here
PORT=5000
You can get your API key from:
👉 Google AI Studio (Gemini API)

3️⃣ Install Dependencies
Go to the backend folder and install the required packages:

bash
Copy code
cd backend
npm install
4️⃣ Start the Server
Run the backend server locally:

bash
Copy code
npm start
Your server should start on http://localhost:5000

5️⃣ Load the Chrome Extension
Open Chrome and go to:

arduino
Copy code
chrome://extensions/
Enable Developer Mode (top right).

Click “Load unpacked”.

Select the extension/ folder.

Your LeetCode Helper icon will now appear in the Chrome toolbar 🎉

6️⃣ How It Works
Open any LeetCode problem in your browser.

Click the LeetCode Helper Extension icon.

Click “Get Problem Info” — it will:

Extract the problem statement from the page.

Send it to the backend API (/api/explain).

Get AI-generated explanation from Gemini.

Display it beautifully in the popup.

🧠 Example API Usage
Endpoint:
POST http://localhost:5000/api/explain

Request Body:

json
Copy code
{
  "explain": "Given an array nums..."
}
Response Example:

json
Copy code
{
  "explanation": "This problem is about finding the maximum subarray..."
}
🔧 Developer Notes
Added Loader animation during API call.

Added word-by-word streaming typing effect for response display.

Separated UI logic from data fetching for maintainability.

Uses environment variables to keep API key secure.

🧾 Future Improvements
Add title extraction and difficulty level.

Support for multiple AI providers (OpenAI, Claude).

Store previous explanations in localStorage.

🤝 Contributing
Contributions are always welcome!
If you’d like to improve the extension, follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature-name)

Open a Pull Request

👨‍💻 Author
Aleem Khan
🔗 [LinkedIn](https://www.linkedin.com/in/aleemkh4n/)  
💻 [GitHub](https://github.com/Aleemk75)







