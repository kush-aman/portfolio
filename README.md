# Aman Kushwaha — Personal Portfolio Website

A personalized, responsive portfolio website showcasing my projects, skills, and background as a 2nd year B.Tech CSE student.

🔗 **Live Website:** [https://portfolio-kush-aman.vercel.app](https://portfolio-kush-aman.vercel.app)

---

## 📋 Project Description

This portfolio website is built as part of an internal assessment. It features a clean, modern design with interactive functionality, project showcase, and an AI-powered chatbot.

## ✨ Features

- **Personalized Content** — Real name, about section, skills, education, and contact information
- **5 Project Showcase** — Each project displayed as a card with title, description, technologies, and GitHub links
- **Project Search & Filter** — Search projects by name or technology (e.g., Python, Quiz, Book)
- **Light/Dark Mode Toggle** — Theme preference saved in localStorage
- **AI Chatbot** — API-integrated chatbot powered by Groq that answers questions about the portfolio
- **Responsive Design** — Works on desktop, tablet, and mobile devices
- **Smooth Navigation** — Fixed navbar with smooth scroll and mobile hamburger menu

## 🛠️ Technologies Used

- **HTML5** — Semantic markup and structure
- **CSS3** — Custom properties, Flexbox, Grid, responsive design
- **JavaScript** — DOM manipulation, Fetch API, event handling
- **Groq API** — AI chatbot integration
- **Font Awesome** — Icons
- **Vercel** — Deployment and hosting
- **Git & GitHub** — Version control

## 📁 Project Structure

```
portfolio/
├── index.html      # Main HTML file with all sections
├── style.css       # Main stylesheet (light/dark themes, responsive)
├── chatbot.css     # Chatbot-specific styles
├── script.js       # Theme toggle, navigation, project search/filter
├── chatbot.js      # AI chatbot logic and API integration
├── config.js       # API keys (excluded from Git via .gitignore)
├── .gitignore      # Ignores config.js to protect API keys
└── README.md       # Project documentation
```

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kush-aman/portfolio.git
   cd portfolio
   ```

2. **Create a `config.js` file** in the root directory:
   ```javascript
   const CONFIG = {
     apiKey: "YOUR_GROQ_API_KEY",
     baseUrl: "https://api.groq.com/openai/v1",
     model: "openai/gpt-oss-20b"
   };
   ```

3. **Open `index.html`** in a browser or use a live server.

4. **For deployment on Vercel:**
   - Connect your GitHub repo to Vercel
   - Add `config.js` content as needed for the deployment environment
   - Deploy and verify all features work

## 📌 Website Sections

| Section | Description |
|---------|-------------|
| **Home** | Hero section with name, tagline, photo, and links |
| **About Me** | Personal introduction and background |
| **Skills** | Technical skills displayed in a grid |
| **Projects** | 5 project cards with search/filter functionality |
| **Contact** | Email, GitHub, and education information |
| **AI Chatbot** | Interactive chatbot for portfolio Q&A |

## 🤖 Chatbot Integration

The chatbot uses the **Groq API** (OpenAI-compatible) to answer questions about the portfolio. It:
- Sends requests to the Groq chat completions endpoint
- Includes portfolio context in the system prompt for accurate responses
- Handles errors (rate limiting, network issues, API failures)
- API key is stored in `config.js` which is excluded from version control via `.gitignore`

## 👤 Author

**Aman Kushwaha**  
B.Tech CSE, 2nd Year — JEC, RCU  
📧 aman.25bcon1981@jecrcu.edu.in  
🔗 [GitHub](https://github.com/kush-aman)
