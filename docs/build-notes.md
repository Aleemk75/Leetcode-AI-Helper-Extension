
# 🧱 Build Notes – LeetCode Helper Extension

### Day 1 – Setup
- Created manifest.json and popup.html.
- Added "Get Problem" button.
- Tested `executeScript()` for injecting code.

### Day 2 – Extract Problem Text
- Used `meta[name=description]` to get content.
- Cleaned unwanted text using `.split("?")`.
- Learned that `executeScript` runs in webpage context.

### Day 3 – Backend Setup
- Built Node.js + Express server.
- Integrated Gemini API call.
- Sent mock question → got AI explanation.

### Day 4 – Frontend + Backend Connection
- Popup fetches data from backend.
- Displays explanation in UI.
- Fixed const reassignment bug (changed to let).

### Day 5 – Testing
- Tested on multiple LeetCode problems.
- Verified error handling for undefined meta tags

### 🧩 Day 6 – Chrome Extension Project (LeetCode Helper)

- Continued building the Chrome Extension that reads LeetCode problem statements and sends them to a Node.js backend for explanation using the Gemini API.  
- Fixed a bug in the popup script — previously destructuring the API response as:
  ```js
  const { explanation } = await res.json();
but since the backend returned a direct string, it was corrected to:

js
Copy code
const explanation = await res.json();
After the fix, the explanation displayed correctly inside the popup.

*Learned* that each part of a Chrome Extension has its own “Inspect” console for debugging:

popup.js → Inspect via popup → Console tab

content scripts (executeScript) → Logs appear in the webpage console

background.js → Logs visible from chrome://extensions → Inspect background page

**Added a loader** to the button while fetching the problem explanation:

Circular spinner shown when fetching

Button disabled during API request

Spinner automatically hidden and button restored after success or error

This improvement enhanced the UX and made the extension feel more professional.


### 📝 Day 6 Update:
Worked on UI improvements and implemented response streaming (word-by-word output) for a smoother experience using the new streaming function.

Added Feature: Implemented a typing effect function to display the AI’s response word-by-word for a smoother reading experience.

// ----- Typing Effect Function -----
function typeText(element, text, speed = 40) {
    element.innerText = ''; // Clear existing text
    const words = text.split(' ');
    let currentWordIndex = 0;

    function typeNextWord() {
        if (currentWordIndex < words.length) {
            element.innerText += words[currentWordIndex] + ' ';
            currentWordIndex++;
            setTimeout(typeNextWord, speed);
        }
    }

    typeNextWord();
}


✅ Used this to stream the Gemini API response smoothly in the popup UI.






import React, { useState } from 'react';
import { Database, Server, Globe, Zap, Lock, MessageSquare, Brain, Link2, Home, Chrome } from 'lucide-react';

const ProjectArchitectures = () => {
  const [selectedProject, setSelectedProject] = useState('convox');

  const projects = {
    convox: {
      name: 'ConvoX - Real-Time Chat',
      color: 'bg-blue-500',
      components: [
        { name: 'React Frontend', icon: Globe, layer: 'client', color: 'bg-blue-100' },
        { name: 'Socket.IO Client', icon: MessageSquare, layer: 'client', color: 'bg-blue-200' },
        { name: 'JWT Token Storage', icon: Lock, layer: 'client', color: 'bg-blue-300' },
        { name: 'Express Server', icon: Server, layer: 'server', color: 'bg-green-100' },
        { name: 'Socket.IO Server', icon: Zap, layer: 'server', color: 'bg-green-200' },
        { name: 'JWT Auth Middleware', icon: Lock, layer: 'server', color: 'bg-green-300' },
        { name: 'REST API Routes', icon: Server, layer: 'server', color: 'bg-green-400' },
        { name: 'MongoDB', icon: Database, layer: 'database', color: 'bg-purple-200' },
      ],
      flow: [
        '1. User logs in → JWT generated',
        '2. JWT stored in localStorage/cookies',
        '3. Socket connection with JWT auth',
        '4. Real-time message via Socket.IO',
        '5. Message saved to MongoDB',
        '6. Broadcast to recipient socket',
        '7. Online status via socket events'
      ],
      keyDecisions: [
        'Why Socket.IO? → Real-time bidirectional communication',
        'Why JWT? → Stateless authentication for scalability',
        'Why MongoDB? → Flexible schema for chat messages',
        'Message Structure: sender, receiver, content, timestamp'
      ]
    },
    gemai: {
      name: 'GemAI - AI Assistant',
      color: 'bg-purple-500',
      components: [
        { name: 'React Frontend', icon: Globe, layer: 'client', color: 'bg-purple-100' },
        { name: 'Streaming UI Handler', icon: Brain, layer: 'client', color: 'bg-purple-200' },
        { name: 'Express Backend', icon: Server, layer: 'server', color: 'bg-green-100' },
        { name: 'Gemini API Client', icon: Brain, layer: 'server', color: 'bg-green-200' },
        { name: 'Prompt History API', icon: Server, layer: 'server', color: 'bg-green-300' },
        { name: 'MongoDB', icon: Database, layer: 'database', color: 'bg-blue-200' },
      ],
      flow: [
        '1. User enters prompt in React UI',
        '2. POST request to /api/generate',
        '3. Backend calls Gemini API',
        '4. Stream response chunks back',
        '5. Frontend renders streaming text',
        '6. Save prompt + response to MongoDB',
        '7. Load history on page refresh'
      ],
      keyDecisions: [
        'Why Gemini? → Free tier, good performance',
        'Streaming? → Better UX, feels responsive',
        'History in DB? → Context for future queries',
        'Rate Limiting? → Prevent API abuse/costs'
      ]
    },
    urlite: {
      name: 'URLite - URL Shortener',
      color: 'bg-green-500',
      components: [
        { name: 'React Frontend', icon: Globe, layer: 'client', color: 'bg-green-100' },
        { name: 'Express Server', icon: Server, layer: 'server', color: 'bg-blue-100' },
        { name: 'URL Generation Logic', icon: Link2, layer: 'server', color: 'bg-blue-200' },
        { name: 'Redis Cache', icon: Zap, layer: 'cache', color: 'bg-red-200' },
        { name: 'MongoDB', icon: Database, layer: 'database', color: 'bg-purple-200' },
      ],
      flow: [
        '1. User submits long URL',
        '2. Generate unique short code',
        '3. Store mapping in MongoDB',
        '4. Return short URL to user',
        '5. User clicks short URL',
        '6. Check Redis cache first (2ms)',
        '7. If miss, query MongoDB (17ms)',
        '8. Cache result in Redis',
        '9. Redirect to original URL'
      ],
      keyDecisions: [
        'Why Redis? → 8x faster lookups (17ms → 2ms)',
        'Short code generation? → base62 encoding or random',
        'Cache strategy? → Cache-aside pattern',
        'TTL? → Redis expiry for less-used URLs',
        'Collision handling? → Check existence before insert'
      ]
    },
    airbnb: {
      name: 'Airbnb Clone',
      color: 'bg-orange-500',
      components: [
        { name: 'EJS Templates', icon: Globe, layer: 'client', color: 'bg-orange-100' },
        { name: 'Express Server', icon: Server, layer: 'server', color: 'bg-green-100' },
        { name: 'CRUD Routes', icon: Server, layer: 'server', color: 'bg-green-200' },
        { name: 'Error Middleware', icon: Server, layer: 'server', color: 'bg-green-300' },
        { name: 'Validation Middleware', icon: Lock, layer: 'server', color: 'bg-green-400' },
        { name: 'MongoDB', icon: Database, layer: 'database', color: 'bg-purple-200' },
      ],
      flow: [
        '1. User views listings (GET /listings)',
        '2. User creates listing (POST /listings)',
        '3. Validation middleware checks data',
        '4. Save to MongoDB with schema validation',
        '5. User adds review (POST /reviews)',
        '6. Update listing with review reference',
        '7. Error handling catches issues'
      ],
      keyDecisions: [
        'Why EJS? → Server-side rendering, simple',
        'Schema design? → Listings + Reviews (referenced)',
        'Validation? → Joi for input validation',
        'Error handling? → Custom error class',
        'Indexing? → MongoDB indexes for search'
      ]
    },
    leetcode: {
      name: 'LeetCode Assistant - Chrome Extension',
      color: 'bg-red-500',
      components: [
        { name: 'Content Script', icon: Chrome, layer: 'client', color: 'bg-red-100' },
        { name: 'Background Script', icon: Server, layer: 'client', color: 'bg-red-200' },
        { name: 'Popup UI', icon: Globe, layer: 'client', color: 'bg-red-300' },
        { name: 'DOM Parser', icon: Globe, layer: 'client', color: 'bg-red-400' },
        { name: 'Backend API (Optional)', icon: Server, layer: 'server', color: 'bg-green-100' },
        { name: 'Gemini API', icon: Brain, layer: 'external', color: 'bg-purple-200' },
        { name: 'Chrome Storage', icon: Database, layer: 'storage', color: 'bg-yellow-200' },
      ],
      flow: [
        '1. Content script detects LeetCode page',
        '2. Parse problem title & description',
        '3. Inject "Get Hint" button in DOM',
        '4. User clicks button',
        '5. Send problem to backend/API',
        '6. Backend calls Gemini with prompt',
        '7. Return hint (NO solution)',
        '8. Display in modal overlay',
        '9. Save hint in Chrome Storage'
      ],
      keyDecisions: [
        'Why Chrome Extension? → Seamless integration',
        'Manifest V3? → Latest standard',
        'Content Script? → Access page DOM',
        'Background Script? → API calls, persistence',
        'Prompt Engineering? → Critical for no-solution hints',
        'Rate Limiting? → Prevent API abuse'
      ]
    }
  };

  const currentProject = projects[selectedProject];

  const LayerBox = ({ title, components, color }) => (
    <div className={`${color} p-4 rounded-lg mb-4`}>
      <h4 className="font-semibold mb-3 text-gray-800">{title}</h4>
      <div className="space-y-2">
        {components.map((comp, idx) => {
          const Icon = comp.icon;
          return (
            <div key={idx} className={`${comp.color} p-3 rounded flex items-center gap-2`}>
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{comp.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Architecture Reference</h1>
        <p className="text-gray-600 mb-6">Interactive diagrams for interview preparation</p>

        {/* Project Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(projects).map(([key, project]) => (
            <button
              key={key}
              onClick={() => setSelectedProject(key)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedProject === key
                  ? `${project.color} text-white`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {project.name.split(' - ')[0]}
            </button>
          ))}
        </div>

        {/* Architecture Display */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Component Layers */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Server className="w-6 h-6" />
              System Components
            </h2>

            {/* Client Layer */}
            {currentProject.components.filter(c => c.layer === 'client').length > 0 && (
              <LayerBox
                title="🖥️ Client Layer"
                components={currentProject.components.filter(c => c.layer === 'client')}
                color="bg-blue-50"
              />
            )}

            {/* Server Layer */}
            {currentProject.components.filter(c => c.layer === 'server').length > 0 && (
              <LayerBox
                title="⚙️ Server Layer"
                components={currentProject.components.filter(c => c.layer === 'server')}
                color="bg-green-50"
              />
            )}

            {/* Cache Layer */}
            {currentProject.components.filter(c => c.layer === 'cache').length > 0 && (
              <LayerBox
                title="⚡ Cache Layer"
                components={currentProject.components.filter(c => c.layer === 'cache')}
                color="bg-red-50"
              />
            )}

            {/* Database Layer */}
            {currentProject.components.filter(c => c.layer === 'database').length > 0 && (
              <LayerBox
                title="💾 Database Layer"
                components={currentProject.components.filter(c => c.layer === 'database')}
                color="bg-purple-50"
              />
            )}

            {/* Storage Layer */}
            {currentProject.components.filter(c => c.layer === 'storage').length > 0 && (
              <LayerBox
                title="📦 Storage Layer"
                components={currentProject.components.filter(c => c.layer === 'storage')}
                color="bg-yellow-50"
              />
            )}

            {/* External Layer */}
            {currentProject.components.filter(c => c.layer === 'external').length > 0 && (
              <LayerBox
                title="🌐 External APIs"
                components={currentProject.components.filter(c => c.layer === 'external')}
                color="bg-gray-50"
              />
            )}
          </div>

          {/* Right: Flow & Decisions */}
          <div className="space-y-6">
            {/* Data Flow */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Request Flow
              </h2>
              <div className="space-y-3">
                {currentProject.flow.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`${currentProject.color} text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 pt-1">{step.replace(/^\d+\.\s*/, '')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Decisions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Key Technical Decisions
              </h2>
              <div className="space-y-3">
                {currentProject.keyDecisions.map((decision, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold text-gray-900">
                        {decision.split('→')[0]}
                      </span>
                      {decision.includes('→') && (
                        <span className="text-gray-600">
                          → {decision.split('→')[1]}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-3">💡 Interview Tip</h3>
              <p className="text-sm opacity-90">
                {selectedProject === 'convox' && "Focus on Socket.IO event handling and JWT authentication flow. Be ready to explain how you handle disconnections and message delivery."}
                {selectedProject === 'gemai' && "Emphasize streaming responses for better UX. Explain prompt engineering and how you prevent API abuse with rate limiting."}
                {selectedProject === 'urlite' && "Highlight the 8x performance improvement! Explain cache-aside pattern and how Redis reduces database load."}
                {selectedProject === 'airbnb' && "Focus on RESTful API design and MongoDB schema relationships. Explain your error handling middleware approach."}
                {selectedProject === 'leetcode' && "This is your unique differentiator! Explain prompt engineering to avoid giving solutions and Chrome extension architecture."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💡 Tip: Draw these diagrams on a whiteboard during interviews. Practice explaining each component's role.</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectArchitectures;