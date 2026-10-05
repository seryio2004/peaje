import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-page">
      <div className="content-shell narrow-content">
        <section className="page-hero">
          <p className="content-kicker">Salida 404</p>
          <h1>Esta ruta no existe.</h1>
          <p>El enlace puede haber cambiado. Puedes volver al inicio o empezar una partida.</p>
          <Link className="primary-button" href="/">Volver al inicio</Link>{" "}
          <Link className="secondary-button" href="/jugar">Jugar a El Peaje</Link>
        </section>
      </div>
    </main>
  );
}
