import QRCode from "qrcode";
export function createShareQr(url: string) {
  if (!["https:", "http:"].includes(new URL(url).protocol)) throw new Error("Unsupported QR URL");
  const { modules } = QRCode.create(url, { errorCorrectionLevel: "M" });
  const margin = 4;
  const cells = [];
  for (let y = 0; y < modules.size; y++) for (let x = 0; x < modules.size; x++) {
    if (modules.get(y, x)) cells.push(`M${x + margin},${y + margin}h1v1h-1z`);
  }
  return { size: modules.size + margin * 2, path: cells.join(""), modules, margin };
}
