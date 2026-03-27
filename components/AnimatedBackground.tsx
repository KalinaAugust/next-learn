"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const animFrame = useRef<number>(0);
  const time = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const blobs = svg.querySelectorAll<SVGCircleElement>(".blob");
    const paths = svg.querySelectorAll<SVGPathElement>(".wave");
    const particles = svg.querySelectorAll<SVGCircleElement>(".particle");

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate() {
      time.current += 0.002;
      const t = time.current;
      // Animate blobs
      blobs.forEach((blob, i) => {
        const speed = 0.6 + i * 0.3;
        const radius = 160 + i * 60;
        const offsetX = Math.sin(t * speed + i * 1.3) * radius * 0.7;
        const offsetY = Math.cos(t * speed * 0.7 + i * 2.1) * radius * 0.7;
        const cx = lerp(20 + i * 30, 20 + i * 30 + offsetX / 8, 1);
        const cy = lerp(20 + i * 20, 20 + i * 20 + offsetY / 8, 1);
        blob.setAttribute("cx", `${cx}%`);
        blob.setAttribute("cy", `${cy}%`);
        const r = 18 + Math.sin(t * 0.8 + i) * 4;
        blob.setAttribute("r", `${r}%`);
      });

      // Animate waves
      paths.forEach((path, i) => {
        const amp = 3 + i * 1.5;
        const freq = 0.015 + i * 0.005;
        const phaseShift = t * (0.4 + i * 0.2);
        const yBase = 30 + i * 22;
        const w = 100;
        const points: string[] = [];
        for (let x = 0; x <= w; x += 3) {
          const y = yBase + Math.sin(x * freq * 10 + phaseShift) * amp + Math.cos(x * freq * 6 + phaseShift * 0.7) * (amp * 0.5);
          points.push(x === 0 ? `M ${x},${y}` : `L ${x},${y}`);
        }
        path.setAttribute("d", points.join(" "));
      });

      particles.forEach((p, i) => {
        const speed = (0.5 + i * 0.18) * 0.5;
        const px = 5 + ((i * 13 + Math.sin(t * speed + i) * 15) % 90);
        const py = ((i * 11 + t * speed * 10) % 100);
        p.setAttribute("cx", `${px}%`);
        p.setAttribute("cy", `${py}%`);
        const opacity = 0.15 + Math.abs(Math.sin(t * speed + i)) * 0.35;
        p.setAttribute("opacity", `${opacity}`);
      });

      animFrame.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bg-grad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#431407" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.01" />
        </radialGradient>
        <radialGradient id="blob0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9a3412" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#431407" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c2410c" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#9a3412" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-lg">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Background fill */}
      <rect width="100" height="100" fill="url(#bg-grad)" />

      {/* Blobs */}
      <circle className="blob" cx="20%" cy="20%" r="18%" fill="url(#blob0)" filter="url(#blur-lg)" />
      <circle className="blob" cx="70%" cy="40%" r="22%" fill="url(#blob1)" filter="url(#blur-lg)" />
      <circle className="blob" cx="45%" cy="75%" r="20%" fill="url(#blob2)" filter="url(#blur-lg)" />

      {/* Waves */}
      <path className="wave" d="" fill="none" stroke="#9a3412" strokeWidth="0.25" strokeOpacity="0.25" filter="url(#blur-sm)" />
      <path className="wave" d="" fill="none" stroke="#c2410c" strokeWidth="0.18" strokeOpacity="0.2" filter="url(#blur-sm)" />
      <path className="wave" d="" fill="none" stroke="#7c2d12" strokeWidth="0.22" strokeOpacity="0.18" filter="url(#blur-sm)" />

      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <circle
          key={i}
          className="particle"
          cx={`${5 + (i * 13) % 90}%`}
          cy={`${(i * 11) % 100}%`}
          r={i % 3 === 0 ? "0.35" : "0.2"}
          fill="#ea580c"
          opacity="0.2"
          filter={i % 4 === 0 ? "url(#blur-sm)" : undefined}
        />
      ))}
    </svg>
  );
}
