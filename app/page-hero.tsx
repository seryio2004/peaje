import type { ReactNode } from "react";

export default function PageHero({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="content-page-hero">
      <p className="content-kicker">{kicker}</p>
      <h1>{title}</h1>
      <div className="content-page-intro">{children}</div>
    </header>
  );
}
