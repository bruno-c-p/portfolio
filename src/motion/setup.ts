// Global motion for this site: runs once on the client, before the first page initializes.
import { startHero } from './hero';
import { startCurtain } from './curtain';
import { startFrame, startMenu, startSpy, startMeters, startLiveEdge, startNotFound } from './ui';
import { startFigures } from './figures';
import { startAnchors } from './anchors';

export function setupMotion() {
  startAnchors();
  startCurtain();
  startFrame();
  startMenu();
  startSpy();
  startMeters();
  startLiveEdge();
  startNotFound();
  startHero();
  startFigures();
}
