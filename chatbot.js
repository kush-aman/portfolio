const chatInput = document.getElementById("userInput");
const chatButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");

// Temperature for our experiment
let chatTemperature = 0.2;

// Portfolio context for the AI system prompt
const PORTFOLIO_CONTEXT = `You are an AI assistant for Aman Kushwaha's personal portfolio website.

About Aman:
- Full name: Aman Kushwaha
- Education: 2nd year B.Tech Computer Science and Engineering student at JEC, RCU
- Email: aman.25bcon1981@jecrcu.edu.in
- GitHub: https://github.com/kush-aman
- Interests: Web development, Machine Learning, Cloud Computing, Cybersecurity
- Skills: Python, C++, HTML5, CSS3, JavaScript, Git & GitHub, OOPs, Problem Solving, AI/ML Basics

Projects:
1. Python Programs Collection — A collection of Python programs including Factorial computation, Fibonacci sequence generation, and Structure-to-Dictionary conversion with detailed documentation.
2. Messy Python Code Improvement — Took a messy Python script and improved it using AI assistance, applying clean code principles, proper naming conventions, modularization, and documentation.
3. Bug Fixing Using Cursor AI — Identified a buggy program and corrected it using Cursor AI for debugging, error detection, and code correction.
4. Interactive Quiz Application — A dynamic quiz app built with HTML, CSS, and JavaScript featuring timed questions, score tracking, and interactive UI.
5. Book Reading List Application — A web app for managing book collections with add/remove books, reading status tracking, and persistent storage.

Answer questions about Aman's portfolio, projects, skills, and background. Keep replies concise (under 80 words). Do not invent information not provided above.`;

function showChatMessage(role, text) {
  const message = document.createElement("div");

  message.className =
    "chat-message " +
    (role === "user" ? "chat-user" : "chat-assistant");

  message.textContent = text;
  chatMessages.appendChild(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Disable chat when local configuration is absent
if (typeof CONFIG === "undefined" ||
    !CONFIG.apiKey ||
    CONFIG.apiKey === "YOUR_PRIVATE_GROQ_KEY") {
  chatButton.disabled = true;
  chatStatus.textContent =
    "AI chat is available in the local demonstration only.";
}

async function sendChatMessage() {
  if (chatButton.disabled) return;

  const question = chatInput.value.trim();

  if (!question) return;

  showChatMessage("user", question);
  chatInput.value = "";

  chatButton.disabled = true;
  chatStatus.textContent = "AI is thinking...";

  try {
    const response = await fetch(
      CONFIG.baseUrl.replace(/\/$/, "") +
      "/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + CONFIG.apiKey
        },
        body: JSON.stringify({
          model: CONFIG.model,
          temperature: chatTemperature,
          messages: [
            {
              role: "system",
              content: PORTFOLIO_CONTEXT
            },
            {
              role: "user",
              content: question
            }
          ]
        })
      }
    );

    if (response.status === 429) {
      throw new Error("RATE_LIMIT");
    }

    if (!response.ok) {
      throw new Error("API_ERROR");
    }

    const data = await response.json();

    const answer = data.choices?.[0]?.message?.content;

    if (typeof answer !== "string" || !answer.trim()) {
      throw new Error("INVALID_RESPONSE");
    }

    showChatMessage("assistant", answer);

  } catch (error) {
    console.error("Chat error:", error.message);

    if (error.message === "RATE_LIMIT") {
      showChatMessage(
        "assistant",
        "Too many requests. Please wait a moment and try again."
      );
    } else if (!navigator.onLine) {
      showChatMessage(
        "assistant",
        "No internet connection. Please reconnect and try again."
      );
    } else {
      showChatMessage(
        "assistant",
        "AI service is currently unavailable. Please try again later."
      );
    }
  } finally {
    chatButton.disabled = false;
    chatStatus.textContent = "";
  }
}

chatButton.addEventListener("click", sendChatMessage);

chatInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
});
