import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#102d29", color: "#fff2d6", padding: 70, alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 760 }}>
        <div style={{ display: "flex", color: "#f4cc75", fontSize: 25, letterSpacing: 4 }}>EP-52 · JUEGO DE CARTAS ONLINE</div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 700, marginTop: 30 }}>EL PEAJE</div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 20 }}>La suerte se reparte.</div>
        <div style={{ display: "flex", fontSize: 36 }}>El peaje se cruza.</div>
        <div style={{ display: "flex", color: "#f4cc75", fontSize: 25, marginTop: 48 }}>Gratis · Sin registro · 1–2 jugadores</div>
      </div>
      <div style={{ display: "flex", width: 205, height: 290, background: "#fff2d6", color: "#b54136", borderRadius: 16, border: "8px solid #f4cc75", alignItems: "center", justifyContent: "center", fontSize: 145, fontWeight: 700, transform: "rotate(9deg)" }}>A</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
