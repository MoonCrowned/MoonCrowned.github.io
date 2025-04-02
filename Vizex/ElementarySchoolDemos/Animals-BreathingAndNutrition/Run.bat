@echo off
echo Starting local server for WebGL app...

REM Change to the directory containing this batch file
cd /d "%~dp0"

REM Check if Python is available for a simple HTTP server
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start "" "http://localhost:8000"
    python -m http.server 8000
    goto :eof
)

where python3 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start "" "http://localhost:8000"
    python3 -m http.server 8000
    goto :eof
)

REM If Python is not available, try using Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo const http = require('http'); > server.js
    echo const fs = require('fs'); >> server.js
    echo const path = require('path'); >> server.js
    echo const port = 8000; >> server.js
    echo. >> server.js
    echo const server = http.createServer((req, res) => { >> server.js
    echo   let filePath = '.' + req.url; >> server.js
    echo   if (filePath === './') filePath = './index.html'; >> server.js
    echo. >> server.js
    echo   const extname = String(path.extname(filePath)).toLowerCase(); >> server.js
    echo   const contentTypes = { >> server.js
    echo     '.html': 'text/html', >> server.js
    echo     '.js': 'text/javascript', >> server.js
    echo     '.css': 'text/css', >> server.js
    echo     '.json': 'application/json', >> server.js
    echo     '.png': 'image/png', >> server.js
    echo     '.jpg': 'image/jpg', >> server.js
    echo     '.wav': 'audio/wav', >> server.js
    echo     '.mp3': 'audio/mpeg', >> server.js
    echo     '.svg': 'image/svg+xml', >> server.js
    echo     '.wasm': 'application/wasm', >> server.js
    echo     '.data': 'application/octet-stream', >> server.js
    echo     '.unityweb': 'application/octet-stream' >> server.js
    echo   }; >> server.js
    echo. >> server.js
    echo   fs.readFile(filePath, (error, content) => { >> server.js
    echo     if (error) { >> server.js
    echo       res.writeHead(404); >> server.js
    echo       res.end('File not found'); >> server.js
    echo     } else { >> server.js
    echo       res.writeHead(200, { 'Content-Type': contentTypes[extname] || 'text/plain' }); >> server.js
    echo       res.end(content, 'utf-8'); >> server.js
    echo     } >> server.js
    echo   }); >> server.js
    echo }); >> server.js
    echo. >> server.js
    echo server.listen(port, () => { >> server.js
    echo   console.log(`Server running at http://localhost:${port}`); >> server.js
    echo }); >> server.js

    start "" "http://localhost:8000"
    node server.js
    goto :eof
)

echo Could not find Python or Node.js to start a local server.
echo Please install either Python or Node.js to run this WebGL application.
pause