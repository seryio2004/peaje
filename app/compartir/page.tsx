import Link from "next/link";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { createShareQr } from "@/lib/share-qr";
import PageHero from "../page-hero";
import ShareSiteActions from "../share-site-actions";
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
        <Link href="/jugar">Seguir jugando en la web →</Link>
      </div>
    </section>
    <section className="content-section" aria-labelledby="apps-title">
      <div className="content-heading"><p className="content-kicker">Próximas salidas</p>
        <h2 id="apps-title">También estamos preparando las apps.</h2>
        <p>Las versiones móviles siguen en desarrollo. Por ahora, puedes jugar desde el navegador.</p>
      </div>
      <div className="upcoming-apps">
        <article className="upcoming-app"><span className="platform-mark" aria-hidden="true">▶</span><div><p>ANDROID</p><h3>Google Play</h3><span className="development-status">En desarrollo</span><p>Aún no disponible para descargar.</p></div></article>
        <article className="upcoming-app"><span className="platform-mark" aria-hidden="true">A</span><div><p>iPHONE / iOS</p><h3>App Store</h3><span className="development-status">En desarrollo</span><p>Aún no disponible para descargar.</p></div></article>
      </div>
    </section>
  </div></main>;
}
