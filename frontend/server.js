/**
 * Servidor estatico: arquivos em frontend/ nas rotas /; index.html na raiz do repo + proxy /api -> backend.
 */
const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = Number(process.env.PORT) || 5173;
const SITE_ROOT = path.join(__dirname, "..");
const FRONTEND_DIR = __dirname;
const API_TARGET = process.env.API_URL || "http://localhost:3000";

app.use(
  "/api",
  createProxyMiddleware({
    target: API_TARGET,
    changeOrigin: true,
  })
);

function sendRootIndex(_req, res) {
  res.sendFile(path.join(SITE_ROOT, "index.html"));
}
app.get("/", sendRootIndex);
app.get("/index.html", sendRootIndex);
app.use(express.static(FRONTEND_DIR, { index: false }));

app.listen(PORT, () => {
  console.log(`Frontend estatico em http://localhost:${PORT}`);
  console.log(`Proxy API /api -> ${API_TARGET}`);
});
