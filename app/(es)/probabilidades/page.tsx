import Link from "next/link";
import EditorialArticle from "../../editorial-article";
import { pageMetadata } from "@/lib/seo";
import { createDeck, rankLabel } from "@/lib/game";
import { initialProbabilityRows, predictionCounts, percent } from "@/lib/probabilities";

export const metadata = pageMetadata("/probabilidades");
const deck = createDeck();
const reference = deck.find(card => card.id === "hearts-8")!;
const known = [reference, ...deck.filter(card => ["clubs-2", "spades-3", "diamonds-4", "clubs-5"].includes(card.id))];
const example = predictionCounts(reference, known);

export default function ProbabilitiesPage() {
  return <EditorialArticle title="Probabilidades en El Peaje" intro="Las opciones no siempre tienen la misma probabilidad. Contamos las cartas que quedan en la baraja real del juego para explicar qué cambia con cada referencia.">
    <section><h2>Mayor o menor: contar antes de elegir</h2>
      <p>El motor crea cuatro palos con valores del 2 al 14: J = 11, Q = 12, K = 13 y A = 14. No hay comodines y las cartas salen sin reposición. Al empezar hay una referencia visible y 51 cartas por revelar. Un valor igual falla tanto si eliges mayor como si eliges menor.</p>
      <p>Para una referencia de valor r, y sin conocer otras cartas, hay 4 × (14 − r) cartas mayores, 4 × (r − 2) menores y 3 del mismo valor. La probabilidad es el número de cartas favorables dividido entre 51. El palo de esa primera referencia no cambia la comparación de valores.</p>
    </section>
    <section><h2>Tabla del primer intento</h2><p>Esta tabla solo supone conocida la carta de referencia. Las fracciones son exactas; los porcentajes se redondean a dos decimales. Mayor y menor no suman el 100 % porque también puede salir un empate.</p>
      <div className="probability-table-wrap" tabIndex={0} role="region" aria-label="Tabla de probabilidades; desplaza horizontalmente en pantallas pequeñas">
        <table className="probability-table"><caption>Baraja de 52 cartas, una referencia retirada</caption><thead><tr><th scope="col">Referencia</th><th scope="col">Mayor</th><th scope="col">Menor</th><th scope="col">Empate (fallo)</th></tr></thead>
          <tbody>{initialProbabilityRows.map(row => <tr key={row.rank}><th scope="row">{rankLabel(row.rank)}</th><td>{row.higher}/51 · {percent(row.higher, row.total)}</td><td>{row.lower}/51 · {percent(row.lower, row.total)}</td><td>{row.equal}/51 · {percent(row.equal, row.total)}</td></tr>)}</tbody>
        </table>
      </div>
      <p>Con un 2, mayor acierta en 48 de las 51 cartas restantes; menor no puede acertar. Con un as ocurre al revés. Con un 8, ambas opciones tienen 24/51: ninguna evita los tres ochos restantes.</p>
    </section>
    <section><h2>Qué cambia al conocer cartas anteriores</h2>
      <p>Hay que retirar todas las cartas ya reveladas, no solo las que sigan visibles en el tablero. Un fallo consume una carta y una posición repetida puede sobrescribir la carta anterior, pero esa carta no vuelve al mazo. Los peajes no extraen cartas.</p>
      <h3>Un 8 después de cuatro cartas bajas</h3>
      <p>Supón que ya has visto 2♣, 3♠, 4♦ y 5♣, además del 8♥ de referencia. Quedan {example.total} cartas. Hay {example.higher} mayores ({percent(example.higher, example.total)}), {example.lower} menores ({percent(example.lower, example.total)}) y {example.equal} empates ({percent(example.equal, example.total)}). Aunque el 8 está en el centro, mayor tiene ahora más cartas favorables.</p>
      <p>La fórmula general es P(mayor) = cartas restantes mayores que r / cartas restantes totales. Para menor y empate se cambia el filtro. Si no recuerdas todo el historial, no puedes tratar el tablero actual como un registro completo.</p>
    </section>
    <section><h2>Color, forma del palo y palo exacto</h2>
      <p>Antes de revelar ninguna carta hay 26 rojas y 26 negras, 26 redondas y 26 picudas, y 13 de cada palo. Si la primera referencia es 8♥, quedan 25 rojas y 26 negras; 25 redondas y 26 picudas; 12 corazones y 13 cartas de cada otro palo. Esas proporciones vuelven a cambiar con cada revelación.</p>
      <p>En La patata difícil, par o impar usa el valor numérico de las figuras y del as. La baraja completa tiene 28 pares y 24 impares; con 8♥ retirado quedan 27 pares y 24 impares. Esto describe la composición inicial, no la probabilidad de la pregunta avanzada, donde ya se han extraído más cartas.</p>
      <p>La patata selecciona 20 de las 51 cartas como cartas de pase ocultas. Eso no equivale a un 40 % de pases por turno: hace falta acertar, que la carta sea de pase y que la partida pueda continuar. No mostramos una tasa de pases o de victorias que no hayamos medido.</p>
    </section>
    <section><h2>Metodología y límites</h2>
      <p>Los números se generan al construir la página con <code>createDeck()</code>, la misma función de la partida, y <code>predictionCounts()</code>. Las pruebas verifican los trece valores, la suma de resultados, los extremos y el ejemplo con historial. No son estadísticas de jugadores ni resultados simulados.</p>
      <p>El cálculo supone una mezcla uniforme. El motor utiliza Fisher–Yates con <code>Math.random</code>; es un juego casual, sin apuestas. Estas probabilidades corresponden a una extracción concreta. No permiten multiplicar preguntas como si fueran independientes ni afirmar una probabilidad de completar todo el recorrido con retrocesos.</p>
      <p>Para convertir estos recuentos en decisiones, consulta <Link prefetch={false} href="/estrategia">la guía de estrategia</Link>.</p>
    </section>
  </EditorialArticle>;
}
