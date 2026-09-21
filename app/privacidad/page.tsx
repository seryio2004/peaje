import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import PageHero from "../page-hero";
import AdPlacement from "../ad-placement";

export const metadata = pageMetadata("/privacidad");

export default function PrivacyPage() {
  return (
    <main className="content-page legal-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Información legal" title="Política de privacidad">
          <p>Última actualización: 21 de septiembre de 2026.</p>
        </PageHero>
        <div className="content-ad-layout">
          <div className="legal-copy">
          <section>
            <h2>Contacto</h2>
            <p>Para consultas sobre el tratamiento de datos personales o para ejercer tus derechos, escribe a <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. También puedes consultar el <Link href="/aviso-legal">aviso legal</Link>.</p>
          </section>
          <section>
            <h2>Datos tratados y finalidades</h2>
            <p>El juego no exige registro ni formulario. Las cartas y el estado de la partida se mantienen en la memoria del navegador; no enviamos los resultados a un servidor propio. Guardamos localmente tu elección de privacidad para recordarla y respetarla.</p>
            <p>Cloudflare, proveedor de alojamiento de este sitio mediante Workers y recursos estáticos, recibe los datos técnicos necesarios para atender las solicitudes y proteger el servicio, como la dirección IP y los datos de la petición. La base de este tratamiento es el interés legítimo en mantener la web disponible y segura.</p>
            <p>La analítica {siteConfig.analyticsEnabled ? "es opcional en esta versión" : "está desactivada en esta versión"}. Si se habilita y la aceptas, Cloudflare Web Analytics podrá medir visitas y rendimiento; los eventos internos de partidas no tienen actualmente un receptor remoto. La base para activar esa medición opcional es tu consentimiento.</p>
          </section>
          <section>
            <h2>Google AdSense y publicidad</h2>
            <p>En las páginas que muestren anuncios de Google AdSense, las preferencias publicitarias se gestionan mediante la plataforma de consentimiento «Privacidad y mensajes» de Google.</p>
            <p>Los proveedores publicitarios externos, incluido Google, pueden utilizar cookies o tecnologías similares para mostrar anuncios basados en visitas anteriores a esta web o a otras. Las cookies publicitarias permiten a Google y a sus socios mostrar anuncios basados en esas visitas. Según las preferencias y la configuración aplicable, podrán mostrarse anuncios personalizados o no personalizados.</p>
            <p>Puedes gestionar la publicidad personalizada en la <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">configuración de anuncios de Google</a>. El panel de consentimiento informa sobre los proveedores participantes y sus finalidades. Consulta también <a href="https://policies.google.com/technologies/partner-sites?hl=es" target="_blank" rel="noreferrer">cómo utiliza Google los datos de sitios asociados</a>.</p>
          </section>
          <section>
            <h2>Destinatarios y conservación</h2>
            <p>Cloudflare presta el alojamiento. En las páginas con publicidad pueden intervenir Google y los proveedores seleccionados en el panel de consentimiento. Cada proveedor puede tratar datos desde otros países conforme a su propia información de privacidad y las garantías aplicables; sus detalles se indican en ese panel.</p>
            <p>La elección de privacidad se conserva en el navegador hasta 180 días. La sesión analítica local, si se habilita y consientes, dura hasta cerrar la pestaña y caduca tras 30 minutos sin eventos. Para los datos técnicos tratados por Cloudflare y, cuando corresponda, los datos publicitarios de Google, consulta sus respectivas <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">políticas de privacidad</a> y <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noreferrer">conservación</a>.</p>
          </section>
          <section>
            <h2>Tus derechos</h2>
            <p>Puedes solicitar el acceso, rectificación, supresión, oposición o limitación del tratamiento, así como la portabilidad cuando proceda, escribiendo a <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Puedes retirar el permiso de analítica desde la <Link href="/cookies">página de cookies</Link> y gestionar las preferencias publicitarias desde el enlace de privacidad de su panel de consentimiento. La retirada no afecta al tratamiento anterior. Si consideras que no se han atendido tus derechos, puedes reclamar ante la <a href="https://www.aepd.es/" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos</a>.</p>
          </section>
          </div>
          <AdPlacement position="privacy-rail" />
        </div>
      </div>
    </main>
  );
}
