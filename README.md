# AI-Powered-Summarization-Chrome-Assistant
A Chrome extension I built that lets you highlight any text on a webpage and instantly get an AI-powered summary in the sidepanel. It also has a notes section where you can jot things down while browsing, and those notes get saved locally so they don't disappear when you close the tab.

---

## What it does

- **Summarize selected text** – highlight anything on a page, click Summarize, and get a clean AI-generated summary in seconds
- **Take notes** – there's a built-in notes area that saves to Chrome's local storage, so your notes stick around
- **Copy the summary** – one click to copy the result to your clipboard
- **Works as a Chrome sidepanel** – opens right alongside the page, no popups, no switching tabs

---

## Screenshots

**Default view when you open the extension**

![Default State](screenshots/screenshot1.png)

**After clicking Summarize – waiting for the AI response**

![Loading State](screenshots/screenshot2.png)

**Summary result displayed in the panel**

![Summary Result](screenshots/screenshot3.png)

**What happens if you forget to select text first**

![Error State](screenshots/screenshot4.png)

---

## Tech Stack

| Part | Technology |
|------|-----------|
| Extension frontend | HTML, CSS, JavaScript (Chrome Extension Manifest V3) |
| Backend API | Java Spring Boot |
| AI model | Google Gemini API |
| Communication | REST (fetch → `localhost:8080`) |

---

## How to run it locally

### 1. Start the backend

Make sure you have Java 17+ and Maven installed.

```bash
cd Backend/assistant
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`. You'll need a Gemini API key set up in your application properties.

### 2. Load the Chrome extension

1. Open Chrome and go to `chrome://extensions`
2. Turn on **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `extension` folder from this repo

Once loaded, click the extension icon in the toolbar – the sidepanel will open.

### 3. Use it

1. Go to any webpage
2. Select some text you want summarized
3. Click the **Summarize** button in the sidepanel
4. The summary shows up in a few seconds

---

## Project structure

```
├── Backend/
│   └── assistant/          ← Spring Boot backend
│       ├── src/
│       └── pom.xml
├── extension/              ← Chrome extension files
│   ├── manifest.json
│   ├── background.js
│   ├── sidepanel.html
│   ├── sidepanel.css
│   └── sidepanel.js
└── screenshots/            ← Extension screenshots
```

---

## API endpoint

The extension sends a POST request to:

```
POST http://localhost:8080/api/Summarize/process
Content-Type: application/json

{
  "content": "<selected text>",
  "operation": "summarize"
}
```

---

## Notes

- The backend needs to be running before the extension will work — if you see an API error, check that Spring Boot started correctly
- Notes are saved in Chrome's local storage, so they only exist in your browser
- Tested on Windows 11 with Chrome 124+
