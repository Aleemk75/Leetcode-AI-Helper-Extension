const btn = document.getElementById("getProblem");
const desc = document.getElementById("desc");

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

// ----- Loader Control Functions -----
function showLoader() {
  btn.disabled = true;
  btn.innerHTML = `<div class="loader"></div>`;
}

function hideLoader(originalText) {
  btn.disabled = false;
  btn.innerHTML = originalText;
}

// ----- Main Logic -----
btn.addEventListener("click", async () => {
  const originalText = "Get Problem info"; // change this if your button text is different
  showLoader();

  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const metaDescriptionEl = document.querySelector("meta[name=description]");
          let problemstatement = metaDescriptionEl?.getAttribute("content") || "";

          if (problemstatement.includes("?")) {
            problemstatement = problemstatement.split("?")[1].trim();
          }

          if (!problemstatement) {
            problemstatement = "⚠️ Problem statement not found.";
          }

          return { problemstatement };
        },
      },
      async (results) => {
        const data = results[0].result;
        console.log("Problem Statement:", data.problemstatement);

        try {
          const res = await fetch("http://localhost:5000/api/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ explain: data.problemstatement }),
          });

          const explanation = await res.json();
          console.log("Explanation:", explanation);
          typeText(desc, explanation); // Use typing effect
        } catch (err) {
          console.error("Fetch error:", err);
          typeText(desc, "⚠️ Error fetching explanation.");
        } finally {
          hideLoader(originalText);
        }
      }
    );
  } catch (err) {
    console.error("Script execution error:", err);
    hideLoader(originalText);
  }
});
