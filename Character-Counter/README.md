# 🧠 Text Analyzer

A modern, responsive **Text Analyzer Tool** built using **HTML, CSS, and JavaScript** — capable of analyzing user input for character count, word count, sentence detection, longest word, average word length, and total alphabet usage. Includes **dark/light mode toggle**, real-time updates, toast alerts, and a clean UI powered by **glassmorphism** and adaptive design.


## 📸 Previews

### 🌙 Dark Mode

> ![Dark Mode Screenshot Placeholder](./dark-mode-preview.png)

### ☀️ Light Mode

> ![Light Mode Screenshot Placeholder](./light-mode-preview.png)


### 🎥 Demo

> [![Watch the Demo](./video-placeholder.png)](https://your-video-link.com)


## 📖 Features

- 🧮 **Live Character Counter** with limit enforcement (500 max).
- 📝 **Word & Sentence Counter** with dynamic parsing.
- 🔠 **Longest Word Detection** & average word length.
- ✨ **Real-Time Theme Toggle** with persisted preference.
- 🔔 **Custom Toast Notification** when char limit is hit.
- 🧹 **Reset Functionality** to clear all stats and input.
- 💡 **Glassmorphic UI** for modern feel.
- 📱 **Responsive Design** with clean mobile experience.
- ⚡ **Zero Dependencies** – pure vanilla JavaScript.


## ⚙️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| 🎨 UI        | HTML5, CSS3 (custom properties, gradients, media queries) |
| 🧠 Logic     | Vanilla JavaScript (ES6+) |
| 📦 Fonts     | [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |
| 🌓 Theme     | CSS Variables + JavaScript + `localStorage` |
| 📦 Build     | No framework / tooling needed — plug-and-play |


## 📚 Concepts Used

- DOM Selection & Event Binding
- CSS Variables & Theme Architecture
- Real-Time Input Tracking
- Toast Alert with CSS Transitions
- String & Array Manipulation in JS
- Conditional Rendering & State Management
- `localStorage` for Theme Persistence
- Semantic HTML5 structure
- Media Queries for responsive layout


## 💪 Strengths

- **Beautiful UX/UI** with elegant gradients, shadows, and a sleek toggle system.
- **No Dependencies**: You can run it anywhere — a browser is all you need.
- **Fast and Light**: Minimalistic, smooth transitions, and optimized DOM updates.
- **Developer-Friendly**: Easily extendable and readable codebase.


## ⚠️ Weaknesses

- 🚫 Sentence detection is currently based on `.` key — lacks advanced NLP parsing.
- ❌ No text input validation for gibberish or HTML injection (as it’s local-only).
- 🧪 Not integrated with testing tools or accessibility audit frameworks yet.
- 📉 No real-time debounce or throttling for high-input performance optimization.


## 🚀 Potential Enhancements

| Feature | Description |
|--------|-------------|
| 🔎 Real NLP Support | Integrate with a NLP library like [compromise](https://github.com/spencermountain/compromise) or GPT-based APIs |
| 📈 Reading Score | Calculate Flesch-Kincaid readability or estimated reading time |
| 💾 Auto Save | Save text input in `localStorage` to persist across refresh |
| 📤 Export | Add “Download as .txt” or “Copy to clipboard” feature |
| 🌐 Multilingual Support | Detect language and support analysis in non-English text |
| 🔍 Highlight Stats | Highlight longest word directly inside textarea with overlay trick |
| 📊 Live Chart | Add bar chart for word length distribution with Chart.js |
| 🧩 Convert to PWA | Make it installable on phones with offline capabilities |

## ✅ Getting Started

Clone the repo:

```bash
git clone https://github.com/your-username/text-analyzer.git
cd text-analyzer
````

Just open `index.html` in your browser — no build tools required!

---

## 🤝 Credits

* Icons: [Lucide Icons](https://lucide.dev/)
* Fonts: [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
* Inspiration: Glassmorphism UI trend & modern SaaS editors


## 🧠 Final Thought

> “Text may be cheap, but **clarity is priceless** — this analyzer makes sure your words carry weight.”

Built with 💙 by [Saim Ahmed](https://your-portfolio-link.com) 



