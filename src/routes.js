import { Router } from "express";
import { getSock } from "./whatsapp.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ ok: true });
});

router.post("/send", async (req, res) => {
  try {
    const { to, message } = req.body;

    const sock = getSock();
    if (!sock) {
      return res.status(500).json({ error: "WhatsApp not ready" });
    }

    await sock.sendMessage(`${to}@s.whatsapp.net`, { text: message });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
