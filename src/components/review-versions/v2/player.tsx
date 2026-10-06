import { useEffect, useRef, useState, type RefObject } from 'react';
import { Pause, Play } from 'lucide-react';

// Shared timeline player for version 2: the hero profile (Day 1 to Month 3) and the proof
// panel (our own profile, start to 18 months) both step through stages on their own, pause
// off screen, stop on the last stage for reduced motion, and let the reader tap a stage.

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function useInView(target: RefObject<HTMLElement>, threshold = 0.25) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = target.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [target, threshold]);
  return visible;
}

// Eases a number towards its target, continuing smoothly if the target changes mid-way
export function useTween(target: number, ms: number, instant: boolean) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (instant) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      current.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, instant]);
  return value;
}

const LEAD = 450; // the playhead settles on a stage before it starts moving towards the next

export function useStagePlayer(count: number, dwell: number, hold: number, target: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();
  const visible = useInView(target);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (reduced) {
      setStage(count - 1);
      setPlaying(false);
    }
  }, [reduced, count]);

  const running = playing && visible && !reduced;
  const last = stage === count - 1;

  useEffect(() => {
    setMoving(false);
    if (!running) return;
    const m = window.setTimeout(() => setMoving(true), LEAD);
    const t = window.setTimeout(() => setStage((s) => (s + 1) % count), last ? hold : dwell);
    return () => {
      window.clearTimeout(m);
      window.clearTimeout(t);
    };
  }, [stage, running, last, count, dwell, hold]);

  const travelling = running && moving && !last;
  return {
    stage,
    reduced,
    playing: playing && !reduced,
    pick: (i: number) => {
      setPlaying(false);
      setStage(i);
    },
    toggle: () => {
      if (!playing && last) setStage(0);
      setPlaying((p) => !p);
    },
    fillPct: ((travelling ? stage + 1 : stage) / (count - 1)) * 100,
    fillTransition: travelling ? `width ${dwell - LEAD}ms linear` : 'width 0.45s ease',
  };
}

type Player = ReturnType<typeof useStagePlayer>;

// The visible time scale: a track with one button per stage and a pause/play control
export function TimeScale({
  labels,
  player,
  label,
  idPrefix,
  dark = false,
}: {
  labels: string[];
  player: Player;
  label: string;
  idPrefix: string;
  dark?: boolean;
}) {
  const inset = 50 / labels.length;
  return (
    <div className={`hv2-scale ${dark ? 'is-dark' : ''}`}>
      <div className="hv2-scale-steps" role="tablist" aria-label={label}>
        <span className="hv2-scale-track" style={{ left: `${inset}%`, right: `${inset}%` }} aria-hidden="true">
          <span className="hv2-scale-fill" style={{ width: `${player.fillPct}%`, transition: player.fillTransition }} />
        </span>
        {labels.map((l, i) => (
          <button
            key={l}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${i}`}
            aria-selected={player.stage === i}
            aria-controls={`${idPrefix}-panel`}
            className={`hv2-scale-stop ${i <= player.stage ? 'is-past' : ''} ${player.stage === i ? 'is-on' : ''}`}
            onClick={() => player.pick(i)}
          >
            <span className="hv2-scale-dot" aria-hidden="true" />
            <span className="hv2-scale-label">{l}</span>
          </button>
        ))}
      </div>
      {!player.reduced && (
        <button
          type="button"
          className="hv2-scale-play"
          onClick={player.toggle}
          aria-label={player.playing ? 'Pause the timeline' : 'Play the timeline'}
        >
          {player.playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

// Google-style star row with a partial last star
export function StarRow({ value, size = 14 }: { value: number; size?: number }) {
  const row = (cls: string) => (
    <span className={`hv2-stars-row ${cls}`} style={{ width: size * 5 + 8 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
  return (
    <span className="hv2-stars" style={{ width: size * 5 + 8 }} aria-hidden="true">
      {row('hv2-stars-bg')}
      <span className="hv2-stars-fg" style={{ width: `${(value / 5) * 100}%` }}>
        {row('is-on')}
      </span>
    </span>
  );
}

export const GoogleG = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);
