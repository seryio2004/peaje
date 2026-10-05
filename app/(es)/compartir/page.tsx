import Link from "next/link";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { createShareQr } from "@/lib/share-qr";
import PageHero from "../../page-hero";
import ShareSiteActions from "../../share-site-actions";
export const metadata = pageMetadata("/compartir");
export default function SharePage() {
  const url = siteUrl();
  const qr = createShareQr(url);
  return <main className="content-page"><div className="content-shell">
    <PageHero kicker="EP-52 / Invita a tu próxima partida" title="El Peaje se comparte.">
      <p>Acerca otra cámara al código y lleva la partida al siguiente móvil. Sin registro ni instalación.</p>
    </PageHero>
    <section className="qr-share-panel" aria-labelledby="qr-title">
      <div className="qr-ticket">
        <span className="road-label">BILLETE PARA OTRA PANTALLA</span>
        <svg className="share-qr" viewBox={`0 0 ${qr.size} ${qr.size}`} role="img" aria-label="Código QR para abrir la página de El Peaje" shapeRendering="crispEdges">
          <rect width={qr.size} height={qr.size} fill="#fff" /><path d={qr.path} fill="#000" />
        </svg>
        <span>ESCANEA Y ENTRA EN RUTA</span>
      </div>
      <div className="qr-share-copy"><h2 id="qr-title">Una cámara. Una nueva partida.</h2>
        <p>Escanea el QR con la cámara de tu móvil o comparte este enlace con tu grupo.</p>
        <a className="share-canonical" href={url}>{url}</a><ShareSiteActions url={url} />
        <Link prefetch={false} href="/jugar">Seguir jugando en la web →</Link>
      </div>
    </section>
    <section className="content-section" aria-labelledby="share-help-title">
      <h2 id="share-help-title">Qué recibe quien abre el enlace</h2>
      <p>El QR lleva al inicio de El Peaje. Cada persona puede leer las reglas o abrir su propia partida; no recibe tus cartas, tu posición ni una invitación a una sala compartida. Para La patata, compartid un solo móvil en la misma mesa.</p>
      <p>Si el navegador permite compartir, el botón abre sus opciones. También puedes copiar el enlace; si no dispones de JavaScript, selecciona y copia la dirección visible o escanea el QR. No hace falta instalar una app.</p>
      <p>Antes de empezar en grupo, consulta las <Link prefetch={false} href="/variantes">propuestas para organizar una sesión</Link>.</p>
    </section>
  </div></main>;
}
