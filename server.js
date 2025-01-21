const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello world!, This is a running server hehe');
});

// Middleware to log request details to a file
app.use((req, res, next) => {
  // Log details with enhanced data
  const logDetails = {
    timestamp: new Date().toISOString(),   
    ip: req.ip,                            
    url: req.originalUrl,                  
    protocol: req.protocol,               
    method: req.method,                    
    hostname: req.hostname,                
    userAgent: req.get('User-Agent'),      
    queryParams: req.query,                
    headers: req.headers                   
  };

  // Append the log details to the "requests.log" file
  fs.appendFile('requests.log', JSON.stringify(logDetails) + '\n', (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });

  next();  // Move to the next middleware
});

// Make the server listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
