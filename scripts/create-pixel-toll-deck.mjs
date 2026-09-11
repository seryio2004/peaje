// Hand-authored, deterministic pixel-art deck generator. It never calls an image model or network service.
import { writeFileSync, rmSync } from "node:fs";
import { deflateSync } from "node:zlib";
const out = "public/images";
const C = { navy: [8, 24, 41], blue: [13, 40, 69], green: [31, 94, 76], gold: [247, 203, 75], amber: [255, 224, 132], cream: [255, 244, 205], red: [198, 72, 62], asphalt: [42, 55, 62] };
const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function rgba(color) { return color.length === 3 ? [...color, 255] : color; }
function crc32(buffer) { let value = 0xffffffff; for (const byte of buffer) value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8); return (value ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const name = Buffer.from(type); const length = Buffer.alloc(4); const checksum = Buffer.alloc(4); length.writeUInt32BE(data.length); checksum.writeUInt32BE(crc32(Buffer.concat([name, data]))); return Buffer.concat([length, name, data, checksum]); }
function encode(png) { const raw = Buffer.alloc((png.width * 4 + 1) * png.height); for (let y = 0; y < png.height; y += 1) { const row = y * (png.width * 4 + 1); raw[row] = 0; png.data.copy(raw, row + 1, y * png.width * 4, (y + 1) * png.width * 4); } const header = Buffer.alloc(13); header.writeUInt32BE(png.width, 0); header.writeUInt32BE(png.height, 4); header[8] = 8; header[9] = 6; return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", header), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]); }
function image(width, height, color = [0, 0, 0, 0]) { const png = { width, height, data: Buffer.alloc(width * height * 4) }; const fill = rgba(color); for (let index = 0; index < width * height; index += 1) png.data.set(fill, index * 4); return png; }
function px(png, x, y, color) { if (x >= 0 && x < png.width && y >= 0 && y < png.height) png.data.set(rgba(color), (y * png.width + x) * 4); }
function box(png, x, y, width, height, color) { for (let py = y; py < y + height; py += 1) for (let pX = x; pX < x + width; pX += 1) px(png, pX, py, color); }
function paint(png, x, y, rows, scale, color) { rows.forEach((row, rowIndex) => [...row].forEach((cell, columnIndex) => { if (cell === "1") box(png, x + columnIndex * scale, y + rowIndex * scale, scale, scale, color); })); }
function save(name, png) { writeFileSync(out + "/" + name, encode(png)); }
function back() {
  const png = image(160, 224, C.navy);
  box(png, 4, 4, 152, 216, C.gold); box(png, 8, 8, 144, 208, C.blue); box(png, 12, 12, 136, 200, C.navy);
  for (let x = 18; x < 145; x += 19) box(png, x, 22 + (x % 3) * 7, 2, 2, C.amber);
  box(png, 12, 132, 136, 80, C.asphalt);
  for (let y = 134; y < 212; y += 8) { const width = Math.round(18 + (y - 132) * 1.45); box(png, Math.round(80 - width / 2), y, width, 8, [42, 55, 62]); if ((y - 134) % 16 === 0) box(png, 77, y + 2, 6, 5, C.cream); }
  box(png, 43, 86, 74, 40, [19, 53, 57]); box(png, 39, 80, 82, 8, C.green); box(png, 45, 77, 70, 3, C.gold);
  [50, 72, 94].forEach((x) => { box(png, x, 94, 16, 24, [9, 31, 38]); box(png, x + 4, 98, 8, 6, C.amber); });
  box(png, 76, 84, 8, 35, [16, 42, 45]); box(png, 74, 84, 12, 4, C.cream);
  for (let index = 0; index < 5; index += 1) { const x = 20 + index * 27; box(png, x, 70, 3, 48, [10, 35, 47]); box(png, x - 2, 69, 7, 4, C.gold); }
  for (let step = 0; step < 9; step += 1) box(png, 42 + step * 8, 122 - step * 4, 8, 4, step % 2 === 0 ? C.red : C.cream);
  box(png, 20, 160, 24, 3, C.gold); box(png, 116, 160, 24, 3, C.gold); save("peaje-pixel-back.png", png);
}
function suits() {
  const png = image(128, 32);
  const shapes = ["0110110|1111111|1111111|0111110|0011100|0001000", "0001000|0011100|0111110|1111111|0111110|0011100|0001000", "0011100|0111110|0111110|0011100|1111111|0011100|0011100", "0001000|0011100|0111110|1111111|0111110|0011100|0111110"];
  shapes.forEach((shape, index) => { const color = index < 2 ? C.red : C.navy; box(png, index * 32 + 2, 2, 28, 28, index < 2 ? C.gold : [164, 195, 182]); box(png, index * 32 + 4, 4, 24, 24, [0, 0, 0, 0]); paint(png, index * 32 + 5, 5, shape.split("|"), 3, color); });
  save("peaje-pixel-suits.png", png);
}
rmSync(`${out}/peaje-pixel-deck-back.png`, { force: true });
back(); suits();