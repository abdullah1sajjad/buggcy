import { useRef, useEffect, useState, type ReactNode } from "react";

interface ScrollFrameProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollFrame({ children, className = "" }: ScrollFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<"idle" | "entering" | "locked" | "leaving">("idle");

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    const node = container;
    const contentNode = content;

    let frameId: number;

    function tick() {
      const cRect = node.getBoundingClientRect();
      const vh = window.innerHeight;

      const { scrollTop, scrollHeight, clientHeight } = contentNode;
      const max = scrollHeight - clientHeight;
      const pct = max > 0 ? Math.min((scrollTop / max) * 100, 100) : 0;
      setProgress(pct);

      const frameTop = cRect.top;
      const frameBottom = cRect.bottom;
      const frameVisible = frameTop <= 0 && frameBottom > vh * 0.3;
      const atBottom = pct >= 98;

      if (frameVisible && !atBottom) {
        if (state !== "locked") {
          setState("locked");
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.top = "0";
          document.body.style.width = "100%";
        }
        // Sync body scroll position to keep frame visible
        document.body.style.top = `${-scrollTop}px`;
      } else if (state === "locked") {
        setState("idle");
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        // Restore scroll position
        const savedTop = parseInt(document.body.style.top || "0", 10);
        window.scrollTo(0, -savedTop);
      }

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [state]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    function onWheel(e: WheelEvent) {
      if (state !== "locked") return;
      e.preventDefault();
      content!.scrollTop += e.deltaY;
    }

    let lastY = 0;
    function onTouchStart(e: TouchEvent) { lastY = e.touches[0].clientY; }
    function onTouchMove(e: TouchEvent) {
      if (state !== "locked") return;
      const y = e.touches[0].clientY;
      const delta = lastY - y;
      lastY = y;
      e.preventDefault();
      content!.scrollTop += delta;
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [state]);

  return (
    <div ref={containerRef} className={className} style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={contentRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden"
          style={{ scrollBehavior: "auto" }}
        >
          {children}
        </div>

        {/* Progress */}
        {state === "locked" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-24 bg-white/10 rounded-full overflow-hidden z-50 pointer-events-none">
            <div
              className="w-full bg-primary rounded-full transition-all duration-100"
              style={{ height: `${progress}%` }}
            />
          </div>
        )}

        {/* Hint */}
        {state === "locked" && progress < 2 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full animate-bounce">
              <span className="text-xs text-white/80">Scroll to explore</span>
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
