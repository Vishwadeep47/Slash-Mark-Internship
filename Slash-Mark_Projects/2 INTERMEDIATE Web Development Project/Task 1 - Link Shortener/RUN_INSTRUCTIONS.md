# How to Run the Link Shortener

Follow these steps to run the project from VS Code.

## 1. Start the Server
Open a terminal in VS Code (`Ctrl + \``) and run the following commands:

```powershell
# Navigate to the project directory
cd "Slash-Mark_Projects\2 INTERMEDIATE Web Development Project\Task 1 - Link Shortener"

# Install dependencies (only needed once)
npm install

# Start the server
node index.js
```
> **Note:** Keep this terminal open. You should see "Server running on port 5000".

## 2. Open the App
You have two options:

**Option A: Open directly in Browser**
Open your browser and go to:
[http://localhost:5000](http://localhost:5000)

**Option B: Using Terminal**
Open a **new** terminal and run:
```powershell
start http://localhost:5000
```

## Features
- **Premium UI**: Beautiful dark mode design with animations.
- **Local Database**: No MongoDB required! Data is saved in `database.json`.
- **Instant Shortening**: Paste a link and get a short URL instantly.
