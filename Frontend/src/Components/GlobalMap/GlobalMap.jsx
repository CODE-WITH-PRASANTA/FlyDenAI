import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import * as topojson from "topojson-client";
import "./GlobalMap.css";

const regions = [
  {
    name: "Asia",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Map_of_Asia.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
    countries: [
      { name: "India", lat: 20.5937, lng: 78.9629 },
      { name: "Nepal", lat: 28.3949, lng: 84.124 },
      { name: "Thailand", lat: 15.87, lng: 100.9925 },
      { name: "UAE", lat: 23.4241, lng: 53.8478 },
      { name: "Maldives", lat: 3.2028, lng: 73.2207 },
      { name: "Singapore", lat: 1.3521, lng: 103.8198 },
      { name: "Indonesia", lat: -0.7893, lng: 113.9213 },
    ],
  },
  {
    name: "Europe",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/2008_Europe_Political_Map_EN.jpg",
    countries: [
      { name: "France", lat: 46.2276, lng: 2.2137 },
      { name: "Germany", lat: 51.1657, lng: 10.4515 },
      { name: "Italy", lat: 41.8719, lng: 12.5674 },
    ],
  },
  {
    name: "Africa",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xJUI2SjL-M4djEssQ1DZJD2qKOgyI2HK2w&s",
    countries: [
      { name: "Nigeria", lat: 9.082, lng: 8.6753 },
      { name: "Kenya", lat: -0.0236, lng: 37.9062 },
    ],
  },
];

const GlobalMap = () => {
  const globeRef = useRef();
  const globeInstance = useRef();

  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [activeCountry, setActiveCountry] = useState(null);

  // 🔥 INIT GLOBE
  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .backgroundColor("#020617");

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;

    globeInstance.current = globe;

    // Resize
    const resize = () => {
      globe.width(globeRef.current.offsetWidth);
      globe.height(globeRef.current.offsetHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    // 🌍 LOAD COUNTRIES
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then(res => res.json())
      .then(worldData => {
        const countries = topojson.feature(
          worldData,
          worldData.objects.countries
        ).features;

        globe
          .polygonsData(countries)
          .polygonCapColor(() => "rgba(255,255,255,0.02)")
          .polygonSideColor(() => "rgba(0,0,0,0)")
          .polygonStrokeColor(() => "#334155");
      });

    // 🔥 ADD POINTS (OUTSIDE CLICK)
    globe
      .pointsData(regions.flatMap(r => r.countries))
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#38bdf8")
      .pointAltitude(0.02)
      .pointRadius(0.5);

    return () => window.removeEventListener("resize", resize);
  }, []);

  // 🔥 CLICK COUNTRY
  const handleCountryClick = (country) => {
    setActiveCountry(country.name);

    const globe = globeInstance.current;

    globe.controls().autoRotate = false;

    globe.pointOfView(
      {
        lat: country.lat,
        lng: country.lng,
        altitude: 0.7,
      },
      1800
    );

   // 🔥 ADVANCED PULSE EFFECT
globe
  .ringsData([country, country]) // double layer for depth

  .ringLat("lat")
  .ringLng("lng")

  // 🌈 Gradient glowing rings
  .ringColor(() => (t) => {
    if (t < 0.4) return "rgba(59,130,246,0.8)";   // bright blue
    if (t < 0.7) return "rgba(96,165,250,0.5)";   // soft blue
    return "rgba(59,130,246,0.1)";                // fade out
  })

  // 📏 Bigger radius for dramatic look
  .ringMaxRadius(18)

  // ⚡ Smooth wave speed
  .ringPropagationSpeed(2.5)

  // 🔁 Smooth repeat
  .ringRepeatPeriod(1200)

  // 🌍 FLOAT ABOVE SURFACE (3D feel)
  .ringAltitude(0.02);
  };

  // 🔁 RESET
  const resetGlobe = () => {
    setActiveCountry(null);

    const globe = globeInstance.current;

    globe.controls().autoRotate = true;

    globe.pointOfView(
      { lat: 20, lng: 0, altitude: 2.2 },
      1500
    );
  };

  return (
    <div className="gm-container">
        <div className="gm-header">
        <div className="gm-header-content">
            
            <h1 className="gm-title">
            Explore <span>Global Destinations</span>
            </h1>

            <p className="gm-subtitle">
            Interactive world guide to discover breathtaking places for your next journey.
            </p>

        </div>
        </div>

      {/* MAIN */}
      <div className="gm-layout">

        {/* SIDEBAR */}
        <div className="gm-sidebar">

          <div className="gm-region-list">
            {regions.map((region) => (
              <div
                key={region.name}
                className={`gm-region-card ${
                  selectedRegion.name === region.name ? "active" : ""
                }`}
                onClick={() => setSelectedRegion(region)}
              >
                <img src={region.image} alt={region.name} />
                <div>
                  <h3>{region.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="gm-country-list">
            {selectedRegion.countries.map((c) => (
              <button
                key={c.name}
                className={`gm-country-btn ${
                  activeCountry === c.name ? "active" : ""
                }`}
                onClick={() => handleCountryClick(c)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <button className="gm-reset-btn" onClick={resetGlobe}>
            Reset View
          </button>

        </div>

        {/* GLOBE */}
        <div className="gm-globe" ref={globeRef}></div>

      </div>
    </div>
  );
};

export default GlobalMap;