import React, { useEffect, useRef, useState } from "react";
import "./Dummtticketnews.css"; // <-- import the file you just saved

const LOGO_PATH = "https://tripcafe.net/images/KZR.png";
const logos = [LOGO_PATH, LOGO_PATH, LOGO_PATH, LOGO_PATH, LOGO_PATH, LOGO_PATH];

export default function Dummtticketnews() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const slideWidthRef = useRef(200);
  const intervalRef = useRef(null);

  // Announcer for screen readers - updates when autoplay toggles
  const announcerRef = useRef(null);
  useEffect(() => {
    if (announcerRef.current) announcerRef.current.textContent = `Autoplay ${playing ? "on" : "off"}`;
  }, [playing]);

  // compute slide width dynamically
  useEffect(() => {
    function calc() {
      const slide = trackRef.current && trackRef.current.querySelector('.dt-slide');
      const gap = trackRef.current ? parseInt(getComputedStyle(trackRef.current).gap || 20) : 20;
      if (slide) slideWidthRef.current = slide.offsetWidth + gap;
    }
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // autoplay logic
  useEffect(() => {
    function start() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setIndex(prev => prev + 1);
      }, 3200);
    }
    if (playing) start();
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  // handle index wrapping for seamless loop
  useEffect(() => {
    const n = logos.length;
    if (index >= n) {
      const timeout = setTimeout(() => {
        if (!trackRef.current) return;
        trackRef.current.style.transition = 'none';
        setIndex(0);
        trackRef.current.style.transform = `translateX(0px)`;
        void trackRef.current.offsetWidth;
        trackRef.current.style.transition = '';
      }, 520);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // update transform whenever index changes
  useEffect(() => {
    if (!trackRef.current) return;
    const w = slideWidthRef.current || 200;
    trackRef.current.style.transform = `translateX(${-index * w}px)`;
  }, [index]);

  // pause/resume handlers
  function handleMouseEnter() { setPlaying(false); }
  function handleMouseLeave() { setPlaying(true); }
  function handleFocus() { setPlaying(false); }
  function handleBlur() { setPlaying(true); }

  // manual controls
  function next() { setPlaying(false); setIndex(i => i + 1); }
  function prev() { setPlaying(false); setIndex(i => (i - 1 < 0 ? logos.length - 1 : i - 1)); }

  // touch swipe
  useEffect(() => {
    let startX = null;
    const c = containerRef.current;
    if (!c) return;
    function onTouchStart(e) { setPlaying(false); startX = e.touches[0].clientX; }
    function onTouchEnd(e) {
      if (startX === null) return;
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) { if (delta > 0) prev(); else next(); }
      startX = null; setPlaying(true);
    }
    c.addEventListener('touchstart', onTouchStart, { passive: true });
    c.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => { c.removeEventListener('touchstart', onTouchStart); c.removeEventListener('touchend', onTouchEnd); };
  }, []);

  // keyboard navigation (on focused container)
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    const c = containerRef.current;
    c && c.addEventListener('keydown', onKey);
    return () => c && c.removeEventListener('keydown', onKey);
  }, []);

  const display = logos.concat(logos);

  return (
    <div className="dt-wrap">
      <div
        className="dt-card"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Trusted company logos"
        aria-describedby="carousel-desc"
      >
        <div className="dt-header">
          <div>
            <div className="dt-title">Trusted by leading companies</div>
            <div id="carousel-desc" className="dt-sub">Premium-quality logo strip — auto-sliding, responsive and accessible.</div>
          </div>

          <div className="dt-controls" aria-hidden={false}>
            <button className="dt-btn" onClick={prev} aria-label="Previous logo">◀</button>
            <button className="dt-btn" onClick={next} aria-label="Next logo">▶</button>

            <div className="dt-autoplay">
              <span className="dt-ribbon" aria-hidden="true">Premium</span>
              <span>Autoplay:</span>
              <strong aria-live="polite" style={{marginLeft:6}}>{playing ? 'On' : 'Off'}</strong>
            </div>
          </div>
        </div>

        <div className="dt-carousel" aria-live="off">
          <div className="dt-track" ref={trackRef}>
            {display.map((src, i) => (
              <div
                key={i}
                className="dt-slide"
                role="group"
                aria-label={`Brand ${ (i % logos.length) + 1 } of ${logos.length}`}
              >
                <img src={src} alt={`Brand ${(i % logos.length) + 1} logo`} />
              </div>
            ))}
          </div>
        </div>

        {/* Visible only to screen-readers to announce autoplay state changes */}
        <div ref={announcerRef} className="sr-only" aria-live="polite"></div>
      </div>
    </div>
  );
}
