import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

let sock;

export async function initWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
      console.log("Escaneie o QR Code");
    }

    if (connection === "close") {
      console.log("Reconectando...");
      initWhatsApp();
    }

    if (connection === "open") {
      console.log("WhatsApp conectado");
    }
  });
}

export function getSock() {
  return sock;
}
