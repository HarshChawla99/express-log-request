const express = require('express');
const app = express();
const port = 3000;

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello world!,This is a running server hehe');
});

// Make the server listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const fs = require('fs');

// Middleware to log request details to a file
app.use((req, res, next) => {
  const logDetails = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
    protocol: req.protocol,
    method: req.method,
    hostname: req.hostname
  };

  // Append log details to the file "requests.log"
  fs.appendFile('requests.log', JSON.stringify(logDetails) + '\n', (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });

  next(); // Pass control to the next middleware
});
 