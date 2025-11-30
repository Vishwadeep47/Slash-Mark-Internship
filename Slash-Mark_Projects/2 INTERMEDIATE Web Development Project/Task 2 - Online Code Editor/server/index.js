const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const os = require('os');

const app = express();
const port = 3010;

app.use(express.json());
app.use(cors());

// Ensure temp directory exists
const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

// Helper to cleanup files
const cleanup = (files) => {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlink(file, (err) => {
                if (err) console.error(`Failed to delete ${file}:`, err);
            });
        }
    });
};

const executeCommand = (cmd, args, options = {}) => {
    return new Promise((resolve, reject) => {
        const process = spawn(cmd, args, options);
        let stdout = '';
        let stderr = '';
        let killed = false;

        const timeout = setTimeout(() => {
            killed = true;
            process.kill();
            resolve({ success: false, output: 'Time Limit Exceeded (2s)' });
        }, 2000);

        process.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        process.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        process.on('close', (code) => {
            clearTimeout(timeout);
            if (killed) return;

            if (code === 0) {
                resolve({ success: true, output: stdout || stderr }); // Sometimes warnings go to stderr
            } else {
                resolve({ success: false, output: stderr || stdout || 'Unknown Error' });
            }
        });

        process.on('error', (err) => {
            clearTimeout(timeout);
            resolve({ success: false, output: err.message });
        });
    });
};

const runCpp = async (filePath, jobId) => {
    const outPath = path.join(TEMP_DIR, `${jobId}.exe`);
    // Compile
    const compile = await executeCommand('g++', [filePath, '-o', outPath]);
    if (!compile.success) return compile;

    // Run
    const run = await executeCommand(outPath, [], { cwd: TEMP_DIR });
    cleanup([filePath, outPath]);
    return run;
};

const runC = async (filePath, jobId) => {
    const outPath = path.join(TEMP_DIR, `${jobId}.exe`);
    // Compile
    const compile = await executeCommand('gcc', [filePath, '-o', outPath]);
    if (!compile.success) return compile;

    // Run
    const run = await executeCommand(outPath, [], { cwd: TEMP_DIR });
    cleanup([filePath, outPath]);
    return run;
};

const runJava = async (filePath, jobId) => {
    // Java requires class name to match file name. We'll use 'Main'
    // But we saved it as jobId.java. Let's rename or just use Main.java in a unique folder?
    // Simpler: Rename file to Main.java inside a unique folder.
    
    const jobDir = path.join(TEMP_DIR, jobId);
    if (!fs.existsSync(jobDir)) fs.mkdirSync(jobDir);
    
    const javaFile = path.join(jobDir, 'Main.java');
    fs.renameSync(filePath, javaFile);

    // Compile
    const compile = await executeCommand('javac', ['Main.java'], { cwd: jobDir });
    if (!compile.success) {
        fs.rmSync(jobDir, { recursive: true, force: true });
        return compile;
    }

    // Run
    const run = await executeCommand('java', ['Main'], { cwd: jobDir });
    fs.rmSync(jobDir, { recursive: true, force: true });
    return run;
};

const runPython = async (filePath) => {
    const run = await executeCommand('python', [filePath]);
    cleanup([filePath]);
    return run;
};

const runJs = async (filePath) => {
    const run = await executeCommand('node', [filePath]);
    cleanup([filePath]);
    return run;
};

app.post('/submissions', async (req, res) => {
    const { language, code } = req.body.submission;
    
    if (!code) {
        return res.status(400).json({ success: false, result: "No code provided" });
    }

    const jobId = uuidv4();
    let fileName;
    
    switch(language) {
        case 'cpp': fileName = `${jobId}.cpp`; break;
        case 'c': fileName = `${jobId}.c`; break;
        case 'java': fileName = `${jobId}.java`; break;
        case 'python': fileName = `${jobId}.py`; break;
        case 'js': fileName = `${jobId}.js`; break;
        default: return res.status(400).json({ success: false, result: "Unsupported language" });
    }

    const filePath = path.join(TEMP_DIR, fileName);
    
    try {
        fs.writeFileSync(filePath, code);
        
        let result;
        switch(language) {
            case 'cpp': result = await runCpp(filePath, jobId); break;
            case 'c': result = await runC(filePath, jobId); break;
            case 'java': result = await runJava(filePath, jobId); break;
            case 'python': result = await runPython(filePath); break;
            case 'js': result = await runJs(filePath); break;
        }

        res.json({ success: result.success, result: result.output });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, result: "Server Error" });
        if (fs.existsSync(filePath)) cleanup([filePath]);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});