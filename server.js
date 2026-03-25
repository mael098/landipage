import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// reemplazo de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  key: fs.readFileSync('clave.key'),
  cert: fs.readFileSync('certificado.crt')
};

const basePath = path.join(__dirname, 'dist');

https.createServer(options, (req, res) => {
  let filePath = path.join(basePath, req.url === '/' ? 'index.html' : req.url);

  if (!filePath.startsWith(basePath)) {
    res.writeHead(403);
    return res.end("Acceso denegado 🚫");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("404 - No encontrado 😢");
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });

}).listen(3000, () => {
  console.log("🔥 Astro + HTTPS en https://localhost:3000");
});