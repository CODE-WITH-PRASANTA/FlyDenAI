import React, { useState } from "react";
import "./PreviewVisa.css";
import {
  MoreVertical,
  Trash2,
  CheckCircle2,
  CalendarDays,
  Clock,
  DollarSign,
  User,
  Globe2,
} from "lucide-react";

interface VisaType {
  name: string;
  fees: string;
  category: string;
  entryType: string;
}

interface VisaPost {
  country: string;
  processingTime: string;
  startingPrice: string;
  approvalTime: string;
  date: string;
  expert: string;
  isPopular: boolean; // kept in data but not shown as badge
  visaTypes: VisaType[];
  flag?: string;
}

const demoVisas: VisaPost[] = [
  {
    country: "Dubai",
    processingTime: "7-10 Days",
    startingPrice: "₹4999",
    approvalTime: "Get Approved in 3 Days!",
    date: "2025-11-04",
    expert: "John Doe",
    isPopular: true,
    flag: "https://flagcdn.com/w40/ae.png",
    visaTypes: [
      { name: "Tourist Visa", fees: "4999", category: "Visit", entryType: "Single" },
    ],
  },
  {
    country: "Singapore",
    processingTime: "5-7 Days",
    startingPrice: "₹5999",
    approvalTime: "Get Approved in 2 Days!",
    date: "2025-10-30",
    expert: "Emily Smith",
    isPopular: false,
    flag: "https://flagcdn.com/w40/sg.png",
    visaTypes: [
      { name: "Business Visa", fees: "5999", category: "Business", entryType: "Multiple" },
    ],
  },
  {
    country: "Thailand",
    processingTime: "3-5 Days",
    startingPrice: "₹3999",
    approvalTime: "Get Approved in 24 Hours!",
    date: "2025-11-01",
    expert: "David Lee",
    isPopular: false,
    flag: "https://flagcdn.com/w40/th.png",
    visaTypes: [
      { name: "Tourist Visa", fees: "3999", category: "Visit", entryType: "Single" },
    ],
  },
  {
    country: "Malaysia",
    processingTime: "6-9 Days",
    startingPrice: "₹4599",
    approvalTime: "Get Approved in 2 Days!",
    date: "2025-10-28",
    expert: "Sophia Johnson",
    isPopular: false,
    flag: "https://flagcdn.com/w40/my.png",
    visaTypes: [
      { name: "Tourist Visa", fees: "4599", category: "Visit", entryType: "Single" },
    ],
  },
];

const PreviewVisa: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const toggleMenu = (i: number) => setOpenMenu(openMenu === i ? null : i);

  const handleDelete = (country: string) => {
    // demo action
    alert(`Demo: delete ${country}`);
    setOpenMenu(null);
  };

  const handlePublish = (country: string) => {
    // demo action
    alert(`Demo: publish ${country}`);
    setOpenMenu(null);
  };

  return (
    <section className="pv-wrapper">
      <div className="pv-header">
        <div className="pv-header-left">
          <h1>Visa Management <span className="pv-sub">Preview</span></h1>
        </div>
        <div className="pv-header-right">
          {/* Demo controls placeholder (non-functional) */}
          <button className="pv-btn">New Preview</button>
        </div>
      </div>

      <div className="pv-grid">
        {demoVisas.map((visa, idx) => (
          <article className="pv-card" key={idx} aria-labelledby={`visa-${idx}-title`}>
            {/* top row */}
            <div className="pv-card-top">
              <div className="pv-country">
                {visa.flag ? (
                  <img src={visa.flag} alt={`${visa.country} flag`} className="pv-flag" />
                ) : (
                  <Globe2 className="pv-ico-globe" />
                )}
                <h2 id={`visa-${idx}-title`} className="pv-country-name">{visa.country}</h2>
              </div>

              <div className="pv-menu">
                <button
                  aria-label={`Open menu for ${visa.country}`}
                  className="pv-menu-btn"
                  onClick={() => toggleMenu(idx)}
                >
                  <MoreVertical />
                </button>

                {openMenu === idx && (
                  <div className="pv-dropdown" role="menu">
                    <button className="pv-dropdown-item pv-delete" onClick={() => handleDelete(visa.country)}>
                      <Trash2 className="pv-icon pv-icon-red" /> Delete
                    </button>
                    <button className="pv-dropdown-item pv-publish" onClick={() => handlePublish(visa.country)}>
                      <CheckCircle2 className="pv-icon pv-icon-green" /> Publish
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* approval tagline */}
            <div className="pv-approval">
              <span className="pv-approval-dot" /> {visa.approvalTime}
            </div>

            {/* details grid */}
            <div className="pv-details">
              <div className="pv-detail">
                <DollarSign className="pv-ico pv-ico-price" />
                <div>
                  <div className="pv-detail-label">Starting From</div>
                  <div className="pv-detail-value">{visa.startingPrice}</div>
                </div>
              </div>

              <div className="pv-detail">
                <Clock className="pv-ico pv-ico-time" />
                <div>
                  <div className="pv-detail-label">Processing Time</div>
                  <div className="pv-detail-value">{visa.processingTime}</div>
                </div>
              </div>

              <div className="pv-detail">
                <CalendarDays className="pv-ico pv-ico-date" />
                <div>
                  <div className="pv-detail-label">Posted On</div>
                  <div className="pv-detail-value">{visa.date}</div>
                </div>
              </div>

              <div className="pv-detail">
                <User className="pv-ico pv-ico-user" />
                <div>
                  <div className="pv-detail-label">Expert</div>
                  <div className="pv-detail-value">{visa.expert}</div>
                </div>
              </div>
            </div>

            {/* visa types */}
            <div className="pv-type-wrap">
              <h3 className="pv-type-title"><Globe2 className="pv-ico pv-ico-globe-small" /> Visa Type(s)</h3>

              <div className="pv-type-list">
                {visa.visaTypes.map((vt, i) => (
                  <div className="pv-type-card" key={i}>
                    <div className="pv-type-top">
                      <div className="pv-type-name">{vt.name}</div>
                      <div className="pv-type-fees">₹{vt.fees}</div>
                    </div>

                    <div className="pv-type-meta">
                      <span className="pv-chip pv-chip-cat">{vt.category}</span>
                      <span className="pv-chip pv-chip-entry">{vt.entryType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PreviewVisa;
