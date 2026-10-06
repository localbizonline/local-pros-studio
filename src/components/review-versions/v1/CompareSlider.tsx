import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// A before/after comparison: the "after" screen sits underneath, the "before" screen on top is
// clipped at the handle. Both screens share one grid cell, so the frame is always as tall as the
// taller screen and dragging never changes the page height.
// Works by drag (mouse, touch, pen), by tapping a spot, by keyboard on the handle, and by the
// Before / After buttons underneath. With `nudge`, it moves once on its own the first time it is
// in view, to show that it can be dragged (skipped for reduced motion or after any interaction).

const MIN = 3;
const MAX = 97;
const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

interface Props {
  before: ReactNode;
  after: ReactNode;
  /** What the comparison shows, for screen readers and the handle label */
  label: string;
  /** Plain-language description of the two states for screen readers */
  description: string;
  nudge?: boolean;
  className?: string;
}

export default function CompareSlider({ before, after, label, description, nudge = false, className = '' }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [smooth, setSmooth] = useState(false);
  const touched = useRef(false);
  const timers = useRef<number[]>([]);
  const drag = useRef<{ id: number; x: number; y: number; active: boolean } | null>(null);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const interact = () => {
    touched.current = true;
    clearTimers();
  };

  // One gentle nudge the first time the slider is mostly on screen
  useEffect(() => {
    const el = stageRef.current;
    if (!nudge || !el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        io.disconnect();
        const steps: [number, number | null][] = [
          [700, 68],
          [1500, 34],
          [2300, 50],
          [3100, null],
        ];
        setSmooth(true);
        steps.forEach(([t, v]) => {
          timers.current.push(
            window.setTimeout(() => {
              if (touched.current) return;
              if (v === null) setSmooth(false);
              else setPos(v);
            }, t),
          );
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [nudge]);

  const posFromX = (x: number) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r || r.width === 0) return 50;
    return clamp(((x - r.left) / r.width) * 100);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    interact();
    const onHandle = (e.target as HTMLElement).closest('.hv1-cmp-handle') !== null;
    // Mouse and the handle drag straight away. A finger elsewhere on the card waits to see
    // whether it is a sideways drag, a tap or a page scroll.
    const active = onHandle || e.pointerType === 'mouse';
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, active };
    if (active) {
      e.currentTarget.setPointerCapture(e.pointerId);
      if (!onHandle) {
        setSmooth(true);
        setPos(posFromX(e.clientX));
      }
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.active) {
      const dx = Math.abs(e.clientX - d.x);
      const dy = Math.abs(e.clientY - d.y);
      if (dx > 8 && dx > dy) {
        d.active = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      } else if (dy > 10) {
        drag.current = null;
        return;
      } else {
        return;
      }
    }
    setSmooth(false);
    setPos(posFromX(e.clientX));
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    if (!d.active) {
      // A tap: glide to that spot
      setSmooth(true);
      setPos(posFromX(e.clientX));
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
      PageDown: -20,
      PageUp: 20,
    };
    let next: number | null = null;
    if (e.key in moves) next = clamp(pos + moves[e.key]);
    if (e.key === 'Home') next = MIN;
    if (e.key === 'End') next = MAX;
    if (next === null) return;
    e.preventDefault();
    interact();
    setSmooth(true);
    setPos(next);
  };

  const show = (side: 'before' | 'after') => {
    interact();
    setSmooth(true);
    setPos(side === 'before' ? MAX : MIN);
  };

  const shown = Math.round(((pos - MIN) / (MAX - MIN)) * 100);

  return (
    <figure className={`hv1-cmp ${className}`}>
      <p className="hv1-sr">{description}</p>
      <div
        ref={stageRef}
        className={`hv1-cmp-stage ${smooth ? 'is-smooth' : ''}`}
        style={{ '--pos': `${pos}%` } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div className="hv1-cmp-frame">
          <div className="hv1-cmp-layer hv1-cmp-after" aria-hidden="true">
            {after}
            <span className="hv1-cmp-tag is-after">After</span>
          </div>
          <div className="hv1-cmp-layer hv1-cmp-before" aria-hidden="true">
            {before}
            <span className="hv1-cmp-tag is-before">Before</span>
          </div>
        </div>
        <div
          className="hv1-cmp-handle"
          role="slider"
          tabIndex={0}
          aria-label={`${label}: move to compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={shown}
          aria-valuetext={`${shown}% before, ${100 - shown}% after`}
          onKeyDown={onKeyDown}
        >
          <span className="hv1-cmp-knob">
            <ChevronLeft size={20} strokeWidth={2.5} aria-hidden="true" />
            <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
      </div>
      <figcaption className="hv1-cmp-bar">
        <span className="hv1-cmp-hint">Drag the handle to compare</span>
        <span className="hv1-cmp-toggle" role="group" aria-label={`Show ${label}`}>
          <button type="button" aria-pressed={pos >= 80} onClick={() => show('before')}>
            Before
          </button>
          <button type="button" aria-pressed={pos <= 20} onClick={() => show('after')}>
            After
          </button>
        </span>
      </figcaption>
    </figure>
  );
}
