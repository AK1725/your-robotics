import express from 'express';
import axios from 'axios';
import Product from '../models/Product.js'; // Adjust if your path is different

const router = express.Router();

const PROJECT_GUIDES = [
  {
    name: "line following robot",
    youtube: "https://www.youtube.com/watch?v=7E0Nn3d3h_g",
    blog: "https://circuitdigest.com/microcontroller-projects/arduino-line-follower-robot"
  },
  {
    name: "obstacle avoiding robot",
    youtube: "https://www.youtube.com/watch?v=sXr2N5Jb24U",
    blog: "https://create.arduino.cc/projecthub/projects/obstacle-avoiding-robot"
  },
  {
    name: "soccerbot",
    youtube: "https://www.youtube.com/watch?v=XHFO5Rlf1CE",
    blog: "https://www.instructables.com/Arduino-Robot-Soccer/"
  },
  {
    name: "firefighting robot",
    youtube: "https://www.youtube.com/watch?v=Owp8o21Gggg",
    blog: "https://circuitdigest.com/microcontroller-projects/arduino-fire-fighting-robot"
  },
  {
    name: "fighterbot",
    youtube: "https://www.youtube.com/watch?v=n6tdwzvPsF8",
    blog: "https://www.instructables.com/Robot-Wars-Battle-Bot/"
  },
  {
    name: "rc car",
    youtube: "https://www.youtube.com/watch?v=3iPLX3bdO0g",
    blog: "https://create.arduino.cc/projecthub/projects/arduino-rc-car"
  },
  {
    name: "bluetooth car",
    youtube: "https://www.youtube.com/watch?v=KvdpK9chzAU",
    blog: "https://circuitdigest.com/microcontroller-projects/arduino-bluetooth-controlled-car"
  },
  {
    name: "wall following robot",
    youtube: "https://www.youtube.com/watch?v=8EE2qN5H53Q",
    blog: "https://circuitdigest.com/microcontroller-projects/arduino-wall-following-robot"
  },
  {
    name: "maze solving robot",
    youtube: "https://www.youtube.com/watch?v=8euHkAv6NFI",
    blog: "https://circuitdigest.com/microcontroller-projects/arduino-maze-solving-robot"
  },
  {
    name: "gesture controlled robot",
    youtube: "https://www.youtube.com/watch?v=GGuAwhQqAaE",
    blog: "https://circuitdigest.com/microcontroller-projects/gesture-controlled-robot-using-arduino"
  }
];

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Try to match the project
    const project = PROJECT_GUIDES.find(p =>
      message.toLowerCase().includes(p.name)
    );

    // Try to find related components from your DB
    let components = [];
    if (project) {
      const keywords = project.name.split(' ');
      components = await Product.find({
        $or: keywords.map(k => ({
          name: { $regex: k, $options: 'i' }
        }))
      }).lean();
    }

    const productList = components.length > 0
      ? components.map(c =>
        `${c.name} - ৳${c.price}${c.stock > 0 ? "" : " (Out of stock)"}`
      ).join('\n')
      : "No products found for this project.";

    const systemPrompt = `You are a helpful robotics shop assistant for a Bangladesh-based site. 
Recommend only from the available list, show price in ৳, mention if something is not in stock and estimate the price. 
Provide a step-by-step guide and YouTube/blog links.`;
    const projectLinks = project ? `YouTube: ${project.youtube}\nBlog: ${project.blog}` : "";

    const userPrompt = `User question: ${message}\nAvailable components:\n${productList}\n${projectLinks}`;

    // === UPDATED ENDPOINT (using gemini-1.5-flash) ===
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await axios.post(
      endpoint,
      {
        contents: [{ role: "user", parts: [{ text: systemPrompt + '\n' + userPrompt }] }]
      }
    );

    const geminiReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a reply right now.";

    res.json({ reply: geminiReply });
  } catch (err) {
    console.error("Gemini API error:", err?.response?.data || err);
    res.status(500).json({ error: "AI chat failed" });
  }
});

export default router;
