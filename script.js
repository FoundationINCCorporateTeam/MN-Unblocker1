const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({});

// Create your server that makes an endpoint that proxies to the target
const server = http.createServer(function(req, res) {
  // Parse the URL from the request
  const targetUrl = url.parse(req.url, true).query['address'];

  // Check if the URL is valid
  if (targetUrl) {
    // Proxy the request to the target URL
    proxy.web(req, res, { target: targetUrl, changeOrigin: true }, function(e) {
      // Handle any errors in the proxying process
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Proxying error: ' + e.message);
    });
  } else {
    // Respond with an error message if the URL is not provided
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('No URL provided. Please specify a URL as a query parameter.');
  }
});

console.log("Proxy server listening on port 8000")
server.listen(8000);
