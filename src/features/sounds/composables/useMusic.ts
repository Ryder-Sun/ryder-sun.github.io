import { onMounted, onUnmounted, watch } from "vue";
import { Howler } from "howler";
import { path } from "../../../composables/useRouteObserver";
import gsap from "gsap";
import { BASE_VOLUMES, musicTracks } from "../definitions/music";
import { sceneWeights } from "../../../animations/scenes";
import { sizes } from "../../../utils/sizes";
import { howlerUnlocked, soundsEnabled } from "./useHowler";
import { clamp } from "../../../utils/math";
import { isFeatureEnabled } from "../../../utils/features";
import { useAgent } from "../../../composables/useAgent";

import type { MusicTrack } from "../types";

const TRACK_IDS: MusicTrack[] = ["luci", "about"];

export const useMusic = () => {
  const { isTouch } = useAgent();

  // Howler queues play() while the AudioContext is suspended and starts it on its
  // own "resume" event (emitted on the first user gesture). A second play() in that
  // window would create a second, overlapping instance of the same loop.
  const pending = new Set<MusicTrack>();

  const tickVolumes = () => {
    // If not on home route, always use base volume
    if (path.value !== "/") {
      musicTracks.luci.volume(BASE_VOLUMES.luci);
      musicTracks.about.volume(0);
      return;
    }

    musicTracks.luci.volume(clamp(1 - sceneWeights.about, 0, 1) * BASE_VOLUMES.luci);
    musicTracks.about.volume(clamp(sceneWeights.about * 1.25 - 0.25, 0, 1) * BASE_VOLUMES.about);
  };

  const tick = () => {
    if (!sizes.visible) return;
    if (!soundsEnabled.value || isTouch.value) return;
    tickVolumes();
  };

  const startTrack = (trackId: MusicTrack) => {
    const track = musicTracks[trackId];
    if (track.playing() || pending.has(trackId)) return;

    if (track.state() === "unloaded") {
      track.load();
    }

    pending.add(trackId);
    track.once("play", () => pending.delete(trackId));
    track.once("playerror", () => pending.delete(trackId));
    track.play();
  };

  const ensurePlaying = () => {
    if (!isFeatureEnabled("sounds") || isTouch.value || !soundsEnabled.value) return;
    for (const trackId of TRACK_IDS) {
      startTrack(trackId);
    }
  };

  // Chrome may flip a suspended AudioContext to "running" on its own (site has
  // autoplay permission / MEI). Re-check playback in that case as a safety net.
  const handleContextStateChange = () => {
    if (Howler.ctx?.state === "running") {
      ensurePlaying();
    }
  };

  // Playback intent must not depend on howlerUnlocked: browsers allow audible
  // autoplay for origins the user has already interacted with, and Howler already
  // queues playback until the first gesture when they don't.
  watch([soundsEnabled, howlerUnlocked], ensurePlaying);

  onMounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.add(tick);

    // Start on load instead of waiting for a click. This is what makes the music
    // audible immediately on repeat visits; on a cold visit Howler defers the
    // actual start to the first pointer/key/touch gesture.
    ensurePlaying();
    Howler.ctx?.addEventListener("statechange", handleContextStateChange);
  });

  onUnmounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.remove(tick);
    Howler.ctx?.removeEventListener("statechange", handleContextStateChange);
    musicTracks.luci.stop();
    musicTracks.about.stop();
  });
};
