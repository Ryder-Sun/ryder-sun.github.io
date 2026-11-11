import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";
import { lerp } from "../../../utils/math";
import { Howler } from "howler";
import { isFeatureEnabled } from "../../../utils/features";
import { tick as contactTick } from "../core/contact";
import { useAgent } from "../../../composables/useAgent";
import { stopSnoreRepetition } from "../core/contact";
import { tick as roomTick } from "../core/room";
import { sounds } from "../definitions/sounds";
import { getSoundsHowl } from "../utils/sounds";

import type { SoundKey } from "../types";

export const howlerUnlocked = ref(false);
export const soundsEnabled = ref(true);

Howler.volume(0);

// User gestures that browsers accept as "activation" to resume a suspended AudioContext.
// Covers mouse (pointerdown/click), keyboard (keydown) and touch (pointerdown/touchend).
const UNLOCK_EVENTS = ["pointerdown", "click", "keydown", "touchend"] as const;

export const useHowler = () => {
  const { isTouch } = useAgent();
  const enabledVolume = ref<number>(0);

  const handleUnlocked = () => {
    if (howlerUnlocked.value) return;
    howlerUnlocked.value = true;

    // Disable sounds completely on touch devices
    if (isTouch.value) {
      soundsEnabled.value = false;
      return;
    }

    soundsEnabled.value = true;

    // Unmute the master volume as soon as the context is usable. Music tracks are
    // started independently by useMusic, so they can already be queued or playing.
    Howler.volume(1);
  };

  /**
   * Explicitly resumes the suspended AudioContext on the first real user gesture.
   * The gsap ticker polling below stays as a fallback, but the gesture listener
   * guarantees the unlock no matter which element consumes the event.
   */
  const handleUnlockGesture = () => {
    if (howlerUnlocked.value) {
      removeUnlockListeners();
      return;
    }

    const ctx = Howler.ctx;
    if (!ctx) return;

    if (ctx.state === "running") {
      handleUnlocked();
      removeUnlockListeners();
      return;
    }

    void ctx
      .resume()
      .then(() => {
        if (ctx.state === "running") {
          handleUnlocked();
          removeUnlockListeners();
        }
      })
      .catch(() => {
        // Resume rejected (e.g. gesture not counted as activation yet);
        // keep listening for the next gesture — ticker polling remains as fallback.
      });
  };

  const addUnlockListeners = () => {
    for (const eventName of UNLOCK_EVENTS) {
      window.addEventListener(eventName, handleUnlockGesture, { capture: true });
    }
  };

  const removeUnlockListeners = () => {
    for (const eventName of UNLOCK_EVENTS) {
      window.removeEventListener(eventName, handleUnlockGesture, { capture: true });
    }
  };

  const tick = () => {
    if (!howlerUnlocked.value) {
      if (Howler.ctx?.state !== "running") return;
      // Fallback: context already running (e.g. unlocked by Howler itself)
      handleUnlocked();
      removeUnlockListeners();
    } else if (!isTouch.value) {
      // Only process sounds on non-touch devices
      contactTick();
      roomTick();

      const currentVolume = Howler.volume();
      if (currentVolume > 0.99 && enabledVolume.value === 1) {
        return;
      }
      const speed = enabledVolume.value === 1 ? 0.01 : 0.05;
      Howler.volume(lerp(currentVolume, enabledVolume.value, speed));
    }
  };

  const handleVisibilityChange = () => {
    Howler.mute(document.visibilityState === "hidden");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "KeyM" && !isTouch.value) {
      soundsEnabled.value = !soundsEnabled.value;
    }
  };

  watch(
    soundsEnabled,
    (newVal) => {
      if (!isFeatureEnabled("sounds") || isTouch.value) return;
      enabledVolume.value = newVal ? 1 : 0;
    },
    { immediate: true },
  );

  const loadAllSounds = () => {
    for (const sound of Object.keys(sounds) as SoundKey[]) {
      const howl = getSoundsHowl(sound);
      if (howl) {
        howl.load();
      }
    }
  };

  onMounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    Howler.volume(0);

    gsap.ticker.add(tick);
    addUnlockListeners();
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyPress);

    // Chrome grants audible autoplay to origins the user has already interacted
    // with (or that passed the Media Engagement Index threshold). In that case the
    // AudioContext is running on load, so no gesture is needed — unlock right away
    // instead of waiting for the first click.
    if (Howler.ctx?.state === "running") {
      handleUnlocked();
      removeUnlockListeners();
    }

    if (!isTouch.value) {
      loadAllSounds();
    }
  });

  onUnmounted(() => {
    if (!isFeatureEnabled("sounds")) return;
    gsap.ticker.remove(tick);
    removeUnlockListeners();
    window.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("keydown", handleKeyPress);
    stopSnoreRepetition();
  });
};
