import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

const API_KEY = "AIzaSyDcmKs81s0YB5STyCRlugMT0IA5dJGR_cU";

// ✅ Correct model names (2025)
  const TEXT_MODEL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
const VIDEO_MODEL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

console.log("✅ Backend starting...");
console.log("🔍 Using models: gemini-2.0-flash & gemini-2.0-pro");

// ✅ TEXT → ANIMATION
app.post("/api/text-to-animation", async (req, res) => {
  console.log("🎨 Received animation request");

  try {
    const response = await fetch(TEXT_MODEL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("🔍 Raw Gemini response:", text);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Gemini API error",
        details: text,
      });
    }

    res.json(JSON.parse(text));
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ VIDEO → TEXT
app.post("/api/video-to-text", async (req, res) => {
  console.log("📹 Received video request");

  try {
    const response = await fetch(VIDEO_MODEL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("🔍 Raw video response:", text);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Gemini API error",
        details: text,
      });
    }

    res.json(JSON.parse(text));
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "✅ Server is running",
    models: ["gemini-2.0-flash", "gemini-2.0-pro"],
    time: new Date().toISOString(),
  });
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
  console.log("✅ Health check at: http://localhost:5000/health");
});
