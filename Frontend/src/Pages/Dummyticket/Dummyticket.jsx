import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  FaExchangeAlt,
  FaPlus,
  FaCrown,
  FaPlane,
  FaHotel,
  FaShieldAlt,
  FaChevronDown,
  FaPassport,
  FaFileAlt,
  FaBriefcase,
  FaCar,
  FaEllipsisH,
  FaCheckCircle,
  FaSearch,
  FaMapMarkerAlt,
  FaArrowLeft
} from "react-icons/fa";
import "./Dummyticket.css";

// Background and sample data
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
];

const CITIES = [
  { name: "New York", airport: "John F. Kennedy International Airport", code: "JFK", country: "USA" },
  { name: "Las Vegas", airport: "McCarran International Airport", code: "LAS", country: "USA" },
  { name: "Los Angeles", airport: "Los Angeles International Airport", code: "LAX", country: "USA" }
];

const PRICE_OPTIONS = [
  { label: "$500 - $2000", note: "Upto 65% offers" },
  { label: "Upto 65% offers", note: "Upto 40% offers" },
  { label: "$5000 - $8000", note: "Upto 35% offers" },
  { label: "$9000 - $11000", note: "Upto 20% offers" },
  { label: "$11000 - $15000", note: "Upto 10% offers" }
];

const Dummyticket = () => {
  // UI states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateSlide, setAnimateSlide] = useState(false);
  const [activeService, setActiveService] = useState("hotels");
  const [flightType, setFlightType] = useState("oneway");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Modals
  const [showCityModal, setShowCityModal] = useState(false);
  const [currentCityField, setCurrentCityField] = useState(null);
  const [cityModalOwner, setCityModalOwner] = useState(null);
  const [citySearchQuery, setCitySearchQuery] = useState("");

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [currentDateField, setCurrentDateField] = useState(null);
  const [calendarModalOwner, setCalendarModalOwner] = useState(null);

  const [showTravellersModal, setShowTravellersModal] = useState(false);
  const [showHotelGuestsModal, setShowHotelGuestsModal] = useState(false);

  // Travel and hotel related states
  const [travelOptions, setTravelOptions] = useState({ adults: 1, children: 1, infants: 1, cabin: 'Economy' });
  const [hotelGuests, setHotelGuests] = useState({ rooms: 2, adults: 4, children: 3, infants: 0, propertyType: 'Villa' });
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(PRICE_OPTIONS[0]);

  const [flightData, setFlightData] = useState({
    from: "New York",
    fromDetail: "Kennedy International Airport",
    to: "Las Vegas",
    toDetail: "McCarran International Airport",
    departure: "21-10-2024",
    departureDay: "Monday",
    returnDate: "23-10-2024",
    returnDay: "Wednesday"
  });

  const [hotelData, setHotelData] = useState({
    destination: "New York",
    country: "United States",
    checkIn: "21-10-2025",
    checkInDay: "Monday",
    checkOut: "23-10-2025",
    checkOutDay: "Wednesday",
  });

  const [insuranceData, setInsuranceData] = useState({
    from: "New York",
    fromDetail: "USA",
    to: "London",
    toDetail: "United Kingdom",
    startDate: "21-10-2024",
    startDay: "Monday",
    endDate: "28-10-2024",
    endDay: "Monday",
    purpose: "Select Purpose"
  });

  // Slideshow logic (paused if any modal open)
  useEffect(() => {
    if (showCityModal || showCalendarModal || showTravellersModal || showHotelGuestsModal) {
      setAnimateSlide(false);
      return;
    }
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BACKGROUND_IMAGES.length);
      setAnimateSlide(true);
      setTimeout(() => setAnimateSlide(false), 900);
    }, 5000);
    setAnimateSlide(true);
    const initTimer = setTimeout(() => setAnimateSlide(false), 900);
    return () => { clearInterval(interval); clearTimeout(initTimer); };
  }, [showCityModal, showCalendarModal, showTravellersModal, showHotelGuestsModal]);

  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => setShowSuccess(false), 4500);
      return () => clearTimeout(t);
    }
  }, [showSuccess]);

  const handleSearch = (service, data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`${service} search completed successfully!`);
      setShowSuccess(true);
      console.log(`${service} SEARCH DATA:`, data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // City filtering
  const filteredCities = CITIES.filter(city =>
    city.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
    city.airport.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
    city.code.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  // Calendar helpers
  const getDaysInMonth = (y,m) => new Date(y, m+1, 0).getDate();
  const getFirstDayOfMonth = (y,m) => new Date(y, m, 1).getDay();
  const formatDate = (d) => `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
  const getDayName = (d) => ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const generateCalendar = () => { const daysInMonth = getDaysInMonth(currentYear, currentMonth); const firstDay = getFirstDayOfMonth(currentYear, currentMonth); const arr=[]; for(let i=0;i<firstDay;i++) arr.push(null); for(let i=1;i<=daysInMonth;i++) arr.push(new Date(currentYear,currentMonth,i)); return arr };
  const navigateMonth = (dir) => { if(dir==='prev'){ if(currentMonth===0){ setCurrentMonth(11); setCurrentYear(currentYear-1); } else setCurrentMonth(currentMonth-1) } else { if(currentMonth===11){ setCurrentMonth(0); setCurrentYear(currentYear+1) } else setCurrentMonth(currentMonth+1) } };
  const getMonthName = (m) => ["January","February","March","April","May","June","July","August","September","October","November","December"][m];

  // centralized handlers
  const handleCitySelect = (city) => {
    if(!city) return;
    if(cityModalOwner === 'flight'){
      if(currentCityField==='from') setFlightData(prev=>({...prev, from: city.name, fromDetail: city.airport}));
      else if(currentCityField==='to') setFlightData(prev=>({...prev, to: city.name, toDetail: city.airport}));
    } else if(cityModalOwner === 'hotel'){
      if(currentCityField==='destination') setHotelData(prev=>({...prev, destination: city.name, country: city.country}));
    } else if(cityModalOwner === 'insurance'){
      if(currentCityField==='from') setInsuranceData(prev=>({...prev, from: city.name, fromDetail: city.airport}));
      else if(currentCityField==='to') setInsuranceData(prev=>({...prev, to: city.name, toDetail: city.airport}));
    }
    setShowCityModal(false);
  };

  const handleDateSelect = (date) => {
    if(!date) return; const formatted = formatDate(date); const dayName = getDayName(date);
    if(calendarModalOwner === 'flight'){
      if(currentDateField === 'departure') setFlightData(prev=>({...prev, departure: formatted, departureDay: dayName}));
      else if(currentDateField === 'return') setFlightData(prev=>({...prev, returnDate: formatted, returnDay: dayName}));
    } else if(calendarModalOwner === 'hotel'){
      if(currentDateField === 'checkIn') setHotelData(prev=>({...prev, checkIn: formatted, checkInDay: dayName}));
      else if(currentDateField === 'checkOut') setHotelData(prev=>({...prev, checkOut: formatted, checkOutDay: dayName}));
    } else if(calendarModalOwner === 'insurance'){
      if(currentDateField === 'start') setInsuranceData(prev=>({...prev, startDate: formatted, startDay: dayName}));
      else if(currentDateField === 'end') setInsuranceData(prev=>({...prev, endDate: formatted, endDay: dayName}));
    }
    setShowCalendarModal(false);
  };

  // Travellers and HotelGuests change helper with min enforcement
  const changeCount = (stateSetter, key, delta, min=0) => {
    stateSetter(prev=>{ const next = {...prev}; next[key] = Math.max(min, next[key]+delta); // ensure at least 1 adult if needed
      if(key !== 'adults' && next.adults === 0) next.adults = 1;
      if(next.adults === 0) next.adults = 1;
      return next;
    });
  };

  // ----- COMPONENTS -----

  // Price per night: measured dropdown that flips above if needed
  const PricePerNightCard = () => {
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);

    const maxDropdownHeight = 320;

    const toggleDropdown = () => {
      if (!open) {
        const rect = triggerRef.current && triggerRef.current.getBoundingClientRect();
        if (rect) {
          const spaceBelow = window.innerHeight - rect.bottom;
          const spaceAbove = rect.top;
          const shouldOpenUp = (spaceBelow < maxDropdownHeight) && (spaceAbove > spaceBelow);
          setOpenUp(Boolean(shouldOpenUp));
        }
      }
      setOpen(prev => !prev);
    };

    useEffect(() => {
      if (!open) return;
      const onDocClick = (e) => {
        if (triggerRef.current && triggerRef.current.contains(e.target)) return;
        if (dropdownRef.current && dropdownRef.current.contains(e.target)) return;
        setOpen(false);
      };
      const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
      const onResize = () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;
          const spaceAbove = rect.top;
          const shouldOpenUp = (spaceBelow < maxDropdownHeight) && (spaceAbove > spaceBelow);
          setOpenUp(Boolean(shouldOpenUp));
        }
      };
      window.addEventListener('mousedown', onDocClick);
      window.addEventListener('keydown', onKey);
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('mousedown', onDocClick);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
      };
    }, [open]);

    return (
      <div style={{ position: 'relative' }}>
        <div
          ref={triggerRef}
          className="dt-input-advanced"
          style={{ minHeight: 88, cursor: 'pointer' }}
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <div className="dt-label">Price per Night</div>
          <div className="dt-values">
            <div className="dt-main">{selectedPrice.label}</div>
            <div className="dt-sub">{selectedPrice.note}</div>
          </div>
        </div>

        {open && (
          <div
            ref={dropdownRef}
            className={`dt-inline--price-list dt-modal-content ${openUp ? 'open-up' : 'open-down'}`}
            role="menu"
            aria-label="Price options"
          >
            <div style={{ maxHeight: maxDropdownHeight, overflowY: 'auto' }}>
              {PRICE_OPTIONS.map((p, i) => (
                <div
                  key={i}
                  className="dt-price-option"
                  onClick={() => { setSelectedPrice(p); setOpen(false); }}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedPrice(p); setOpen(false); } }}
                >
                  <div style={{ fontWeight: 800 }}>{p.label}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{p.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Purpose dropdown implemented as portal so it can escape modal clipping
  const PurposeDropdownPortal = ({ value, onSelect }) => {
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const maxDropdownHeight = 300;

    const purposeOptions = [
      { value: "Select Purpose", label: "Select Purpose", icon: <FaFileAlt /> },
      { value: "Visa Application", label: "Visa Application", icon: <FaPassport /> },
      { value: "Office Work", label: "Office Work", icon: <FaBriefcase /> },
      { value: "Car Rental", label: "Car Rental", icon: <FaCar /> },
      { value: "Other", label: "Other", icon: <FaEllipsisH /> }
    ];

    useEffect(()=> {
      const onDocClick = (e) => {
        if (triggerRef.current && triggerRef.current.contains(e.target)) return;
        if (dropdownRef.current && dropdownRef.current.contains(e.target)) return;
        setOpen(false);
      };
      const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
      window.addEventListener('mousedown', onDocClick);
      window.addEventListener('keydown', onKey);
      return () => { window.removeEventListener('mousedown', onDocClick); window.removeEventListener('keydown', onKey); };
    }, []);

    useEffect(() => {
      if (!open) return;
      // recompute whether to open above/below
      const rect = triggerRef.current && triggerRef.current.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const shouldOpenUp = (spaceBelow < maxDropdownHeight) && (spaceAbove > spaceBelow);
        setOpenUp(Boolean(shouldOpenUp));
      }
    }, [open]);

    // Inline element that sits where the trigger should be — to get bounding rect
    const Trigger = (
      <div ref={triggerRef} className={`dt-purpose-display`} onClick={() => setOpen(v=>!v)} aria-expanded={open} role="button" tabIndex={0} onKeyDown={(e)=> { if(e.key==='Enter') setOpen(v=>!v); }}>
        <div className="dt-label">Purpose</div>
        <div className="dt-values"><div className="dt-main">{value}</div><div className="dt-sub">Select your purpose</div></div>
        <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}><FaChevronDown/></div>
      </div>
    );

    // compute absolute position for portal dropdown
    const [pos, setPos] = useState(null);
    useEffect(()=> {
      if (!open) return;
      const rect = triggerRef.current && triggerRef.current.getBoundingClientRect();
      if (!rect) return;
      const style = {
        left: rect.left + window.scrollX,
        width: rect.width,
      };
      if (openUp) {
        style.bottom = window.innerHeight - rect.top + window.scrollY; // distance from bottom
      } else {
        style.top = rect.bottom + window.scrollY;
      }
      setPos(style);
    }, [open, openUp]);

    const dropdownNode = open ? (
      <div
        ref={dropdownRef}
        className={`dt-purpose-portal ${openUp? 'open-up':'open-down'}`}
        style={{
          position: 'absolute',
          zIndex: 13000,
          left: pos ? pos.left : 0,
          width: pos ? pos.width : 300,
          ...(pos && pos.top ? { top: pos.top } : {}),
          ...(pos && pos.bottom ? { bottom: pos.bottom } : {})
        }}
        role="menu"
        aria-label="Purpose options"
      >
        <div className="dt-dropdown-options" style={{ maxHeight: maxDropdownHeight, overflowY: 'auto' }}>
          {purposeOptions.map(o => (
            <div key={o.value} className={`dt-dropdown-option ${value===o.value ? 'active' : ''}`} onClick={() => { onSelect(o.value); setOpen(false); }}>
              <span className="dt-option-icon">{o.icon}</span>
              <span>{o.label}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null;

    return (
      <>
        {Trigger}
        {dropdownNode && ReactDOM.createPortal(dropdownNode, document.body)}
      </>
    );
  };

  const InsuranceCard = () => {
    const handleInsuranceSearch = () => handleSearch('Insurance', insuranceData);

    return (
      <div className="dt-booking-card">
        <div className="dt-insurance-badge"><FaShieldAlt style={{ marginRight: 6 }} /> Protected</div>
        <div className="dt-selector-title-row"><div/> <div className="dt-flight-title">Comprehensive Travel Insurance - Peace of Mind Guaranteed</div></div>

        {/* Use the shared grid class for consistent behavior */}
        <div className="dt-insurance-form" style={{ gap: 16, alignItems: 'center' }}>
          <div className="dt-input-advanced" onClick={()=>{ setCurrentCityField('from'); setCityModalOwner('insurance'); setCitySearchQuery(''); setShowCityModal(true); }}>
            <div className="dt-label">From</div>
            <div className="dt-values"><div className="dt-main">{insuranceData.from}</div><div className="dt-sub">{insuranceData.fromDetail}</div></div>
          </div>

          <div className="dt-swap-col"><button className="dt-swap" onClick={()=>{ setInsuranceData(p=>({...p, from: p.to, fromDetail: p.toDetail, to: p.from, toDetail: p.fromDetail })) }}><FaExchangeAlt color="#c94b3a"/></button></div>

          <div className="dt-input-advanced" onClick={()=>{ setCurrentCityField('to'); setCityModalOwner('insurance'); setCitySearchQuery(''); setShowCityModal(true); }}>
            <div className="dt-label">To</div>
            <div className="dt-values"><div className="dt-main">{insuranceData.to}</div><div className="dt-sub">{insuranceData.toDetail}</div></div>
          </div>

          <div className="dt-input-advanced" onClick={()=>{ setCurrentDateField('start'); setCalendarModalOwner('insurance'); setShowCalendarModal(true); }}>
            <div className="dt-label">Start Date</div>
            <div className="dt-values"><div className="dt-main">{insuranceData.startDate}</div><div className="dt-sub">{insuranceData.startDay}</div></div>
          </div>

          <div className="dt-input-advanced" onClick={()=>{ setCurrentDateField('end'); setCalendarModalOwner('insurance'); setShowCalendarModal(true); }}>
            <div className="dt-label">End Date</div>
            <div className="dt-values"><div className="dt-main">{insuranceData.endDate}</div><div className="dt-sub">{insuranceData.endDay}</div></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className={`dt-search-btn ${isLoading? 'loading':''}`} onClick={handleInsuranceSearch} disabled={isLoading}>{isLoading?'Processing...':'Get Quote'}</button>
          </div>
        </div>

        {/* Purpose dropdown rendered inline trigger, dropdown lives in portal to avoid clipping */}
        <div style={{ marginTop: 16 }}>
          <PurposeDropdownPortal value={insuranceData.purpose} onSelect={(val) => setInsuranceData(prev=>({...prev, purpose: val}))} />
        </div>

      </div>
    )
  };

  const FlightCard = () => {
    const handleSwap = ()=> setFlightData(p=>({...p, from: p.to, fromDetail: p.toDetail, to: p.from, toDetail: p.fromDetail}));
    const handleFlightSearch = ()=> handleSearch('Flight', {...flightData, flightType, travelOptions});
    const travellersLabel = `${travelOptions.adults + travelOptions.children + travelOptions.infants} Persons`;
    const travellerDetail = `${travelOptions.adults} Adult${travelOptions.adults>1?'s':''}, ${travelOptions.cabin}`;

    return (
      <div className="dt-booking-card">
        <div className="dt-premium-badge"><FaCrown/> Premium</div>
        <div className="dt-selector-title-row">
          <div className="dt-flight-type-selector">
            {[{key:'oneway',label:'One Way'},{key:'roundtrip',label:'Round Trip'},{key:'multitrip',label:'Multi City'}].map(o=> (
              <button key={o.key} className={`dt-type-btn ${flightType===o.key? 'active':''}`} onClick={()=> setFlightType(o.key)} aria-pressed={flightType===o.key}><span className="dt-type-radio"/> <span>{o.label}</span></button>
            ))}
          </div>
          <div className="dt-flight-title">Discover Exclusive Flight Deals & Premium Travel Experiences</div>
        </div>

        <div className="dt-flight-form">
          <div className="dt-form-field"><div className="dt-input-advanced" onClick={()=>{ setCurrentCityField('from'); setCityModalOwner('flight'); setShowCityModal(true); }}><div className="dt-label">From</div><div className="dt-values"><div className="dt-main">{flightData.from}</div><div className="dt-sub">{flightData.fromDetail}</div></div></div></div>
          <div className="dt-swap-col"><button className="dt-swap" onClick={handleSwap}><FaExchangeAlt color="#c94b3a"/></button></div>
          <div className="dt-form-field"><div className="dt-input-advanced" onClick={()=>{ setCurrentCityField('to'); setCityModalOwner('flight'); setShowCityModal(true); }}><div className="dt-label">To</div><div className="dt-values"><div className="dt-main">{flightData.to}</div><div className="dt-sub">{flightData.toDetail}</div></div></div></div>
          <div className="dt-form-field"><div className="dt-input-advanced" onClick={()=>{ setCurrentDateField('departure'); setCalendarModalOwner('flight'); setShowCalendarModal(true); }}><div className="dt-label">Departure</div><div className="dt-values"><div className="dt-main">{flightData.departure}</div><div className="dt-sub">{flightData.departureDay}</div></div></div></div>
          {flightType==='roundtrip' && <div className="dt-form-field"><div className="dt-input-advanced" onClick={()=>{ setCurrentDateField('return'); setCalendarModalOwner('flight'); setShowCalendarModal(true); }}><div className="dt-label">Return</div><div className="dt-values"><div className="dt-main">{flightData.returnDate}</div><div className="dt-sub">{flightData.returnDay}</div></div></div></div>}

          <div className="dt-form-field"><div className="dt-input-advanced" onClick={()=> setShowTravellersModal(true)}><div className="dt-label">Travellers & Class</div><div className="dt-values"><div className="dt-main">{travellersLabel}</div><div className="dt-sub">{travellerDetail}</div></div></div></div>

          <div className="dt-form-field dt-search-field"><button className={`dt-search-btn ${isLoading? 'loading':''}`} onClick={handleFlightSearch} disabled={isLoading}>{isLoading? 'Searching...':'Find Flights'}</button></div>
        </div>
      </div>
    )
  };

  const HotelCard = () => {
    const handleHotelSearch = ()=> handleSearch('Hotel', {...hotelData, guests: hotelGuests});
    return (
      <div className="dt-booking-card">
        <div className="dt-premium-badge"><FaCrown/> Luxury</div>
        <div className="dt-selector-title-row"><div/> <div className="dt-flight-title">Discover Luxury Stays & Exclusive Hotel Deals</div></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: 16, alignItems: 'center' }}>
          <div className="dt-input-advanced" onClick={()=>{ setCurrentCityField('destination'); setCityModalOwner('hotel'); setShowCityModal(true); }}>
            <div className="dt-label">City, Property name or Location</div>
            <div className="dt-values"><div className="dt-main">{hotelData.destination}</div><div className="dt-sub">{hotelData.country}</div></div>
          </div>

          <div className="dt-input-advanced" onClick={()=>{ setCurrentDateField('checkIn'); setCalendarModalOwner('hotel'); setShowCalendarModal(true); }}>
            <div className="dt-label">Check In</div>
            <div className="dt-values"><div className="dt-main">{hotelData.checkIn}</div><div className="dt-sub">{hotelData.checkInDay}</div></div>
          </div>

          <div className="dt-input-advanced" onClick={()=>{ setCurrentDateField('checkOut'); setCalendarModalOwner('hotel'); setShowCalendarModal(true); }}>
            <div className="dt-label">Check Out</div>
            <div className="dt-values"><div className="dt-main">{hotelData.checkOut}</div><div className="dt-sub">{hotelData.checkOutDay}</div></div>
          </div>

          <div className="dt-input-advanced" onClick={()=> setShowHotelGuestsModal(true)}>
            <div className="dt-label">Guests</div>
            <div className="dt-values"><div className="dt-main">{hotelGuests.rooms + ' Rooms'}</div><div className="dt-sub">{hotelGuests.adults} Adult, {hotelGuests.children} Children</div></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PricePerNightCard />
            <button className={`dt-search-btn ${isLoading? 'loading':''}`} onClick={handleHotelSearch} disabled={isLoading}>{isLoading? 'Searching...':'Search'}</button>
          </div>
        </div>
      </div>
    )
  };

  // City modal
  const CitySearchModal = () => { if(!showCityModal) return null; return (
    <div className="dt-modal-overlay" onClick={()=> setShowCityModal(false)}>
      <div className="dt-modal-content" onClick={(e)=> e.stopPropagation()}>
        <div className="dt-modal-header"><button className="dt-modal-back" onClick={()=> setShowCityModal(false)}><FaArrowLeft/></button><h3>Search Location</h3></div>
        <div style={{ padding: 16 }}>
          <div style={{ position: 'relative', marginBottom: 12 }}><FaSearch style={{ position: 'absolute', left: 14, top: 12, color: '#64748b' }} /><input autoFocus value={citySearchQuery} onChange={(e)=> setCitySearchQuery(e.target.value)} placeholder="Search city or airport..." style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 8, border: '1px solid #eef2f7' }} /></div>
          <div style={{ maxHeight: 340, overflowY: 'auto' }}>
            {filteredCities.length>0 ? filteredCities.map((c,i)=> (
              <div key={i} style={{ display:'flex', alignItems:'center', padding:12, borderBottom:'1px solid #f1f5f9', cursor:'pointer' }} onClick={()=> handleCitySelect(c)}>
                <div style={{ width:40, height:40, borderRadius:20, background:'linear-gradient(135deg,#c94b3a,#d9534f)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', marginRight:12 }}><FaMapMarkerAlt/></div>
                <div style={{ flex:1 }}><div style={{ fontWeight:800 }}>{c.name}</div><div style={{ color:'#64748b', fontSize:13 }}>{c.airport} ({c.code})</div></div>
                <div style={{ background:'#f1f5f9', padding:'6px 8px', borderRadius:6, fontSize:12 }}>{c.country}</div>
              </div>
            )) : (<div style={{ padding:40, textAlign:'center', color:'#64748b' }}><div style={{ fontWeight:800, marginBottom:6 }}>No results</div><div>Try another search term</div></div>)}
          </div>
        </div>
      </div>
    </div>
  ) };

  // Calendar Modal
  const CalendarModal = () => { if(!showCalendarModal) return null; const calendarDays = generateCalendar(); const today = new Date(); return (
    <div className="dt-modal-overlay" onClick={()=> setShowCalendarModal(false)}>
      <div className="dt-modal-content dt-calendar-modal" onClick={(e)=> e.stopPropagation()}>
        <div className="dt-modal-header"><button className="dt-modal-back" onClick={()=> setShowCalendarModal(false)}><FaArrowLeft/></button><h3>Select Date</h3></div>
        <div style={{ padding: 12 }}>
          <div className="dt-calendar-header"><button className="dt-calendar-nav" onClick={()=> navigateMonth('prev')}>‹</button><div className="dt-calendar-month">{getMonthName(currentMonth)} {currentYear}</div><button className="dt-calendar-nav" onClick={()=> navigateMonth('next')}>›</button></div>
          <div className="dt-calendar-weekdays" style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', padding:'12px 8px' }}>{['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=> <div key={d} className="dt-calendar-weekday">{d}</div>)}</div>
          <div className="dt-calendar-days" style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6, padding:12 }}>
            {calendarDays.map((date, idx)=>{ const isToday = date && date.getDate()===today.getDate() && date.getMonth()===today.getMonth() && date.getFullYear()===today.getFullYear(); const isPast = date && date < today && !isToday; return (<button key={idx} className={`dt-calendar-day ${isToday? 'today':''} ${isPast? 'past':''} ${!date? 'empty':''}`} onClick={()=> !isPast && handleDateSelect(date)} disabled={isPast}>{date? date.getDate(): ''}</button>) })}
          </div>
        </div>
      </div>
    </div>
  ) };

  // Travellers modal
  const TravellersModal = () => { if(!showTravellersModal) return null; return (
    <div className="dt-modal-overlay" onClick={()=> setShowTravellersModal(false)}>
      <div className="dt-modal-content" onClick={(e)=> e.stopPropagation()} style={{ maxWidth:720 }}>
        <div className="dt-modal-header"><button className="dt-modal-back" onClick={()=> setShowTravellersModal(false)}><FaArrowLeft/></button><h3>Select Travelers & Class</h3></div>
        <div style={{ padding:20 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
            <div style={{ padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
              <div style={{ fontWeight:800, marginBottom:8 }}>Adults (12+ Yrs)</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <button onClick={()=> changeCount(setTravelOptions,'adults',-1,1)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>-</button>
                <div style={{ fontWeight:800 }}>{String(travelOptions.adults).padStart(2,'0')}</div>
                <button onClick={()=> changeCount(setTravelOptions,'adults',1,1)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>+</button>
              </div>
            </div>
            <div style={{ padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
              <div style={{ fontWeight:800, marginBottom:8 }}>Children (2-12 Yrs)</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <button onClick={()=> changeCount(setTravelOptions,'children',-1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>-</button>
                <div style={{ fontWeight:800 }}>{String(travelOptions.children).padStart(2,'0')}</div>
                <button onClick={()=> changeCount(setTravelOptions,'children',1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>+</button>
              </div>
            </div>
            <div style={{ padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
              <div style={{ fontWeight:800, marginBottom:8 }}>Infants (0-2 Yrs)</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <button onClick={()=> changeCount(setTravelOptions,'infants',-1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>-</button>
                <div style={{ fontWeight:800 }}>{String(travelOptions.infants).padStart(2,'0')}</div>
                <button onClick={()=> changeCount(setTravelOptions,'infants',1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>+</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop:18, padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
            <div style={{ fontWeight:800, marginBottom:8 }}>Travellers</div>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              {['Economy','Premium Economy','Business','First Class'].map(c=> (
                <label key={c} style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                  <input type="radio" name="cabin" checked={travelOptions.cabin===c} onChange={()=> setTravelOptions(prev=>({...prev, cabin: c}))} />
                  <span style={{ fontWeight: travelOptions.cabin===c ? 800 : 600 }}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginTop:20 }}>
            <button className="dt-modal-back" onClick={()=> setShowTravellersModal(false)}>Cancel</button>
            <button className="dt-search-btn" onClick={()=> setShowTravellersModal(false)}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  ) };

  // Hotel Guests modal
  const HotelGuestsModal = () => { if(!showHotelGuestsModal) return null; return (
    <div className="dt-modal-overlay" onClick={()=> setShowHotelGuestsModal(false)}>
      <div className="dt-modal-content" onClick={(e)=> e.stopPropagation()} style={{ maxWidth:640 }}>
        <div className="dt-modal-header"><button className="dt-modal-back" onClick={()=> setShowHotelGuestsModal(false)}><FaArrowLeft/></button><h3>Select Rooms & Guests</h3></div>
        <div style={{ padding:20 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
              <div style={{ fontWeight:800, marginBottom:8 }}>Rooms</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <button onClick={()=> changeCount(setHotelGuests,'rooms',-1,1)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>-</button>
                <div style={{ fontWeight:800 }}>{String(hotelGuests.rooms).padStart(2,'0')}</div>
                <button onClick={()=> changeCount(setHotelGuests,'rooms',1,1)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>+</button>
              </div>
            </div>

            <div style={{ padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
              <div style={{ fontWeight:800, marginBottom:8 }}>Adults</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <button onClick={()=> changeCount(setHotelGuests,'adults',-1,1)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>-</button>
                <div style={{ fontWeight:800 }}>{String(hotelGuests.adults).padStart(2,'0')}</div>
                <button onClick={()=> changeCount(setHotelGuests,'adults',1,1)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>+</button>
              </div>
            </div>

            <div style={{ padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
              <div style={{ fontWeight:800, marginBottom:8 }}>Children</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <button onClick={()=> changeCount(setHotelGuests,'children',-1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>-</button>
                <div style={{ fontWeight:800 }}>{String(hotelGuests.children).padStart(2,'0')}</div>
                <button onClick={()=> changeCount(setHotelGuests,'children',1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>+</button>
              </div>
            </div>

            <div style={{ padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
              <div style={{ fontWeight:800, marginBottom:8 }}>Infants</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <button onClick={()=> changeCount(setHotelGuests,'infants',-1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>-</button>
                <div style={{ fontWeight:800 }}>{String(hotelGuests.infants).padStart(2,'0')}</div>
                <button onClick={()=> changeCount(setHotelGuests,'infants',1,0)} style={{ width:36, height:36, borderRadius:36, border:'none', background:'#f1f5f9' }}>+</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop:12, padding:14, borderRadius:12, border:'1px solid #f1f5f9' }}>
            <div style={{ fontWeight:800, marginBottom:8 }}>Property Type</div>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              {['Villa','Condo','Cabin','Apartments'].map(pt=> (
                <label key={pt} style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                  <input type="radio" name="property" checked={hotelGuests.propertyType===pt} onChange={()=> setHotelGuests(prev=>({...prev, propertyType: pt}))} />
                  <span style={{ fontWeight: hotelGuests.propertyType===pt? 800:600 }}>{pt}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginTop:16 }}>
            <button className="dt-modal-back" onClick={()=> setShowHotelGuestsModal(false)}>Cancel</button>
            <button className="dt-search-btn" onClick={()=> setShowHotelGuestsModal(false)}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  ) };

  // ---------------- Render ----------------
  return (
    <div className="dt-container">
      {showSuccess && <div className="dt-success-message"><FaCheckCircle size={20}/> <span>{successMessage}</span></div>}

      <CitySearchModal />
      <CalendarModal />
      <TravellersModal />
      <HotelGuestsModal />

      <div className={`dt-hero-wrap ${animateSlide? 'active-slide':''}`} style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentSlide]})` }}>
        <main className="dt-main">
          <div className="dt-hero">
            <h1 className="dt-hero-title">Elevate Your Journey: Premium Travel Experiences Await</h1>
            <p className="dt-hero-sub">Discover exclusive deals, luxury accommodations, and comprehensive insurance for your next adventure.</p>

            <div className="dt-tabs-area">
              <div className="dt-tabs">
                <button className={`dt-tab ${activeService=== 'flights'? 'active':''}`} onClick={()=> setActiveService('flights')}><FaPlane/> Flights</button>
                <button className={`dt-tab ${activeService=== 'hotels'? 'active':''}`} onClick={()=> setActiveService('hotels')}><FaHotel/> Hotels</button>
                <button className={`dt-tab ${activeService=== 'insurance'? 'active':''}`} onClick={()=> setActiveService('insurance')}><FaShieldAlt/> Insurance</button>
              </div>
            </div>

            <div className="dt-booking-section">
              {activeService === 'flights' && <FlightCard />}
              {activeService === 'hotels' && <HotelCard />}
              {activeService === 'insurance' && <InsuranceCard />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dummyticket;
