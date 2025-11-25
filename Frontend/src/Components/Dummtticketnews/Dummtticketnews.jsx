import React, { useEffect, useRef, useState } from "react";
import "./Dummtticketnews.css";
import LOGO_PATH from '../../assets/dummyticket/dummyticketcompany.png'
import LOGO_PATH1 from '../../assets/dummyticket/dummyticketcompany1.png'
import LOGO_PATH2 from '../../assets/dummyticket/dummyticketcompany2.png'
import LOGO_PATH3 from '../../assets/dummyticket/dummyticketcompany3.png'
import LOGO_PATH4 from '../../assets/dummyticket/dummyticketcompany4.png'
import LOGO_PATH5 from '../../assets/dummyticket/dummyticketcompany5.png'
import LOGO_PATH6 from '../../assets/dummyticket/dummyticketcompany6.png'
import LOGO_PATH7 from '../../assets/dummyticket/dummyticketcompany7.png'
import LOGO_PATH8 from '../../assets/dummyticket/dummyticketcompany8.png'
import LOGO_PATH9 from '../../assets/dummyticket/dummyticketcompany9.png'
import LOGO_PATH10 from '../../assets/dummyticket/dummyticketcompany10.png'

const logos = [LOGO_PATH, LOGO_PATH1, LOGO_PATH2, LOGO_PATH3, LOGO_PATH4, LOGO_PATH5, LOGO_PATH6, LOGO_PATH7, LOGO_PATH8, LOGO_PATH9, LOGO_PATH10];

export default function Dummtticketnews() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const slideWidthRef = useRef(200);
  const intervalRef = useRef(null);

  // Announcer for screen readers
  const announcerRef = useRef(null);
  useEffect(() => {
    if (announcerRef.current) announcerRef.current.textContent = `Autoplay ${playing ? "on" : "off"}`;
  }, [playing]);

  // Compute slide width dynamically based on screen size
  useEffect(() => {
    function calc() {
      const slide = trackRef.current && trackRef.current.querySelector('.dt-slide');
      const gap = trackRef.current ? parseInt(getComputedStyle(trackRef.current).gap || 16) : 16;
      if (slide) slideWidthRef.current = slide.offsetWidth + gap;
    }
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Autoplay logic
  useEffect(() => {
    function start() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setIndex(prev => prev + 1);
      }, 2000);
    }
    if (playing) start();
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  // Handle index wrapping for seamless loop
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
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Update transform whenever index changes
  useEffect(() => {
    if (!trackRef.current) return;
    const w = slideWidthRef.current || 200;
    trackRef.current.style.transform = `translateX(${-index * w}px)`;
  }, [index]);

  // Pause/resume handlers
  function handleMouseEnter() { setPlaying(false); }
  function handleMouseLeave() { setPlaying(true); }
  function handleFocus() { setPlaying(false); }
  function handleBlur() { setPlaying(true); }

  // Manual controls
  function next() { setPlaying(false); setIndex(i => i + 1); }
  function prev() { setPlaying(false); setIndex(i => (i - 1 < 0 ? logos.length - 1 : i - 1)); }

  // Touch swipe
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

  // Keyboard navigation
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
        <div className="dt-carousel" aria-live="off">
          <div className="dt-track" ref={trackRef}>
            {display.map((src, i) => (
              <div
                key={i}
                className="dt-slide"
                role="group"
                aria-label={`Brand ${ (i % logos.length) + 1 } of ${logos.length}`}
              >
                <div className="dt-slide-inner">
                  <img src={src} alt={`Brand ${(i % logos.length) + 1} logo`} />
                </div>
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