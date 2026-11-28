import React, { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const MIN_VISIBLE_MS = 1850;
const MAX_FAILSAFE_MS = 4500;
const FADE_OUT_MS = 420;

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [textEntered, setTextEntered] = useState(false);

  const isReadyRef = useRef(false);
  const currentProgressRef = useRef(0);
  const startTimeRef = useRef<number>(typeof performance !== 'undefined' ? performance.now() : Date.now());
  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Trigger subtle brand name entrance immediately on first animation frame
    const enterTimer = window.requestAnimationFrame(() => {
      setTextEntered(true);
    });

    let mounted = true;

    const markReady = () => {
      if (!mounted) return;
      isReadyRef.current = true;
    };

    // Wait for actual document load + font readiness (with failsafe guard)
    const waitForReadiness = async () => {
      try {
        const docReadyPromise =
          document.readyState === 'complete'
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                const onLoad = () => {
                  window.removeEventListener('load', onLoad);
                  resolve();
                };
                window.addEventListener('load', onLoad, { once: true });
              });

        const fontsReadyPromise =
          document.fonts && document.fonts.ready
            ? document.fonts.ready.catch(() => undefined)
            : Promise.resolve();

        await Promise.all([docReadyPromise, fontsReadyPromise]);
      } catch {
        // Fail open so website never stalls on browser quirk
      } finally {
        markReady();
      }
    };

    waitForReadiness();

    // Failsafe guarantees preloader never hangs indefinitely
    const failsafeTimer = window.setTimeout(() => {
      markReady();
    }, MAX_FAILSAFE_MS);

    const completePreloader = () => {
      if (finishedRef.current || !mounted) return;
      finishedRef.current = true;

      // Brief pause at 100% before smooth fade-out
      window.setTimeout(
        () => {
          if (!mounted) return;
          setIsFadingOut(true);

          window.setTimeout(
            () => {
              if (!mounted) return;
              setIsVisible(false);
              onComplete?.();
            },
            prefersReducedMotion ? 150 : FADE_OUT_MS
          );
        },
        prefersReducedMotion ? 60 : 180
      );
    };

    const tick = (now: number) => {
      if (!mounted || finishedRef.current) return;

      const elapsed = now - startTimeRef.current;
      const canFinish = isReadyRef.current && elapsed >= MIN_VISIBLE_MS;

      if (prefersReducedMotion && canFinish) {
        currentProgressRef.current = 100;
        setProgress(100);
        completePreloader();
        return;
      }

      // Before actual readiness or minimum 2s intro: glide naturally up to 94% without prematurely hitting 100%.
      // Once ready & minimum reveal elapsed: glide smoothly to 100%.
      const timeRatio = Math.min(1, elapsed / MIN_VISIBLE_MS);
      const easedRatio = 1 - Math.pow(1 - timeRatio, 2.4);
      const target = canFinish ? 100 : Math.min(94, 94 * easedRatio);
      const speed = canFinish ? 0.22 : 0.14;

      const next = currentProgressRef.current + (target - currentProgressRef.current) * speed;

      if (canFinish && next >= 99.5) {
        currentProgressRef.current = 100;
        setProgress(100);
        completePreloader();
        return;
      }

      currentProgressRef.current = next;
      const rounded = Math.min(canFinish ? 100 : 99, Math.round(next));
      setProgress((prev) => (rounded > prev ? rounded : prev));

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(enterTimer);
      window.clearTimeout(failsafeTimer);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onComplete, prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Cake World Bakers and Restaurant"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8F7F4] px-6 select-none transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        transitionDuration: `${prefersReducedMotion ? 150 : FADE_OUT_MS}ms`,
      }}
    >
      <div
        className={`w-full max-w-md flex flex-col items-center text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          textEntered || prefersReducedMotion
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1.5'
        }`}
      >
        {/* Official Brand Logo Centered Above Name */}
        <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 border border-[#E9E5DE]">
          <img
            src="/logo.png"
            alt="Cake World Bakers and Restaurant Logo"
            width={135}
            height={96}
            decoding="sync"
            fetchPriority="high"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain"
          />
        </div>

        <p className="font-serif-display text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-[#302C28] leading-snug">
          Cake World Bakers and Restaurant
        </p>

        {/* Minimal Horizontal Progress Track */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Page loading progress"
          className="mt-6 w-52 sm:w-64 md:w-72 h-[2px] bg-[#E9E5DE] rounded-full overflow-hidden"
        >
          <div
            className="h-full w-full bg-[#873D35] origin-left will-change-transform"
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>

        {/* Numerical Percentage */}
        <span className="mt-3 text-xs sm:text-[13px] font-medium tracking-[0.14em] text-[#89847D] tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  );
};
