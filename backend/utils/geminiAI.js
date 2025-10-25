import "dotenv/config";

export async function getGemeniResponse(problemStatement) {

  const prompt = `
You are a LeetCode expert. You explain each problem in a structured way:
1. Related Topics: List key computer science/data structure/algorithm concepts relevant to this problem.
2. Problem Understanding: Explain the problem clearly in simple words, approximately 100 words.
3. Approach / Pseudocode: Give a step-by-step approach or pseudocode to solve it, approximately 200 words.


Example:
Problem: "Two Sum - Given an array of integers nums and a target ..."
Response:
1. Problem Understanding: ...
2. Approach

Now explain this problem:
Problem: "${problemStatement}"
`;

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error('API key not found. Please set the GEMINI_API_KEY environment variable.');
    return;
  }

  // The endpoint for the Gemini API.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  // The data payload for the POST request.
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt,
          }
        ]
      }
    ]
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }

  try {
    const response = await fetch(url, options);
    // Parse the JSON response to js object;
    const data = await response.json();
    const candidates = data?.candidates;
    if (!candidates || candidates.length === 0) {
      console.error("No candidates returned from Gemini API", data);
      return "⚠️No response from Gemini API.";
    }
    const generatedText = data.candidates[0].content.parts[0].text;
    // console.log(generatedText);
    return generatedText;

  } catch (error) {
    console.log(error);

  }

}