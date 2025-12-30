import express from "express";
import { initWhatsApp, getSock } from "./whatsapp.js";
import routes from "./routes.js";

const app = express();
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("HTTP server on port", PORT);
  initWhatsApp();
});
