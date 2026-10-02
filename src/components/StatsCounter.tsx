"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

function Counter({
  end,
  duration = 1800,
  suffix = "+",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduceMotion) {
          setCount(end);
          observer.disconnect();
          return;
        }

        const startTime = performance.now();

        function animate(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth slow-down at the end
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setCount(Math.floor(easedProgress * end));

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(end);
          }
        }

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-[#071a3b]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-white/15 bg-white/5 sm:grid-cols-2">
          {/* PROPERTIES CLOSED */}
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center sm:border-r sm:border-white/15">
            <p className="font-serif text-5xl font-semibold text-white sm:text-6xl">
              <Counter end={50} />
            </p>

            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Properties Closed
            </p>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
              Successful property transactions completed through Capitalkey
              Realtors.
            </p>
          </div>

          {/* CLIENTS */}
          <div className="flex flex-col items-center justify-center border-t border-white/15 px-6 py-10 text-center sm:border-t-0">
            <p className="font-serif text-5xl font-semibold text-white sm:text-6xl">
              <Counter end={150} />
            </p>

            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
              Clients
            </p>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
              Clients who have trusted us with their property requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}