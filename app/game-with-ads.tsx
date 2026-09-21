"use client";

import { useRef, useState } from "react";
import type { GameDifficulty } from "@/lib/game";
import { advanceAdCadence } from "@/lib/ad-cadence";
import AdSlot from "./ad-slot";
import Game from "./game";

export default function GameWithAds() {
  const shortGameCredit = useRef<0 | 1>(0);
  const [showPostGameAd, setShowPostGameAd] = useState(false);

  function handleCompletedGame(difficulty: GameDifficulty) {
    const next = advanceAdCadence(shortGameCredit.current, difficulty);
    shortGameCredit.current = next.shortGameCredit;
    setShowPostGameAd(next.showAd);
  }

  return <>
    <Game onCompleted={handleCompletedGame} onStart={() => setShowPostGameAd(false)} />
    {showPostGameAd ? <div className="post-game-ad"><AdSlot id="after-game" /></div> : null}
  </>;
}
