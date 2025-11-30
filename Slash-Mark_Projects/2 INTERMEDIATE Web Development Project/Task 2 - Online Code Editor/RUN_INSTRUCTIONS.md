# How to Run the Online Code Editor

Follow these steps to run the project from VS Code.

## 1. Start the Server (Backend)
Open a terminal in VS Code (`Ctrl + \``) and run the following commands:

```powershell
# Navigate to the server directory
cd "Slash-Mark_Projects\2 INTERMEDIATE Web Development Project\Task 2 - Online Code Editor\server"

# Install dependencies (only needed once)
npm install

# Start the server
node index.js
```
> **Note:** Keep this terminal open. You should see "Server listening on port 3010".

## 2. Open the Client (Frontend)
You have two options:

**Option A: Open directly in Browser (Simplest)**
1. Go to the file explorer in VS Code.
2. Navigate to `client` folder.
3. Right-click `index.html` and select **"Open with Live Server"** (if you have the extension) or **"Reveal in File Explorer"** and double-click the file.

**Option B: Using Terminal**
Open a **new** terminal (split terminal or `+` button) and run:
```powershell
# Navigate to the client directory
cd "Slash-Mark_Projects\2 INTERMEDIATE Web Development Project\Task 2 - Online Code Editor\client"

# Open the file in your default browser
start index.html
```

## Summary
1. Terminal 1: `node index.js` (Server)
2. Browser: Open `index.html` (Client)
