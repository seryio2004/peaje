import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import ConsentControls from "../consent-controls";
import PageHero from "../page-hero";

export const metadata = pageMetadata("/cookies");
export default function CookiesPage() {
  return <main className="content-page legal-page"><div className="content-shell narrow-content">
    <PageHero kicker="Información legal" title="Cookies y tecnologías similares"><p>Última actualización: 9 de septiembre de 2026.</p></PageHero>
    <div className="legal-copy">
      <section><h2>Para qué se utilizan</h2><p>El Peaje no guarda tus partidas ni instala cookies propias. Utiliza almacenamiento del navegador para recordar tu elección de privacidad y, solo si la analítica está habilitada y la aceptas, medir el uso del juego.</p><p>Estado de esta versión: <strong>{siteConfig.analyticsEnabled ? "analítica opcional disponible" : "analítica desactivada"}</strong>. La publicidad no está activa.</p></section>
      <section><h2>Tus preferencias</h2><ConsentControls /></section>
      <section><h2>Inventario de tecnologías</h2><div className="cookie-table-wrap"><table className="cookie-table">
        <thead><tr><th scope="col">Tecnología y proveedor</th><th scope="col">Finalidad</th><th scope="col">Duración y permiso</th></tr></thead>
        <tbody>
          <tr><td>peaje.consent.v2<br />localStorage · El Peaje</td><td>Recordar aceptación o rechazo, versión de la política y fecha de elección.</td><td>Hasta 180 días. Necesaria para gestionar tus preferencias.</td></tr>
          <tr><td>peaje.analytics-session.v1<br />sessionStorage · El Peaje</td><td>Identificador aleatorio y contador de partidas por sesión. No incluye nombres ni correos.</td><td>Hasta cerrar la pestaña; se renueva tras 30 minutos sin eventos. Solo con consentimiento analítico.</td></tr>
          <tr><td>Cloudflare Web Analytics<br />Cloudflare</td><td>Visitas y rendimiento de páginas. No utiliza cookies ni recibe eventos personalizados del juego.</td><td>Solo se carga si está configurado y aceptas analítica. No añade almacenamiento de cookies propio.</td></tr>
        </tbody>
      </table></div><p>La versión anterior de preferencias (peaje.consent.v1) no se reutiliza y se elimina al guardar una nueva elección. Si el almacenamiento está bloqueado, la elección se conserva solo en memoria hasta recargar.</p></section>
      <section><h2>Proveedores y datos</h2><p>La medición de partidas no tiene actualmente un receptor remoto conectado. Si se habilita Cloudflare Web Analytics, el navegador realiza solicitudes al proveedor para enviar mediciones de visitas y rendimiento. Consulta su <a href="https://www.cloudflare.com/privacypolicy/">política de privacidad</a> y la <a href="https://developers.cloudflare.com/web-analytics/">documentación de Web Analytics</a>.</p><p>El proveedor de alojamiento del despliegue, GitHub Pages o Cloudflare Pages, procesa las solicitudes necesarias para servir la web. Los datos del titular se completarán en el <Link href="/aviso-legal">aviso legal</Link> antes de publicar la versión definitiva.</p></section>
      <section><h2>Cambiar o retirar el permiso</h2><p>Puedes hacerlo desde esta página o mediante «Preferencias de cookies» en el pie de página y en la cabecera de la partida. Cerrar el panel, desplazarte o seguir navegando no equivale a aceptar. El juego sigue disponible si rechazas.</p><p>Al retirar el permiso se borra la sesión analítica local. Si el beacon ya se había cargado, se recarga el documento para retirar sus escuchadores; se pierde la partida abierta. Esto no elimina mediciones que el proveedor hubiera recibido anteriormente.</p><p>Volveremos a solicitar una elección al caducar o cambiar los servicios o finalidades. También puedes borrar el almacenamiento desde las opciones de privacidad del navegador.</p></section>
      <section><h2>Publicidad futura</h2><p>No recogemos autorización anticipada para AdSense ni otros proveedores publicitarios. Su incorporación requerirá nueva información y el mecanismo de consentimiento correspondiente.</p></section>
      <section><h2>Más información</h2><p>Consulta la <Link href="/privacidad">política de privacidad</Link> y la <Link href="/contacto">página de contacto</Link>.</p></section>
    </div>
  </div></main>;
}
