import React, { useState, ChangeEvent, FormEvent } from "react";
import "./VisaPosting.css";
import { useTheme } from "../../context/ThemeContext";

interface VisaType {
  name: string;
  processingTime: string;
  stayPeriod: string;
  validity: string;
  category: string;
  entryType: string;
  fees: string;
}

interface DocumentItem {
  id: number;
  text: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface InfoItem {
  id: number;
  title: string;
  content: string;
}

const expertsList = ["Ravi Sharma", "Neha Gupta", "Aman Verma", "Sonia Roy" , ];
const countries = ["Dubai", "Singapore", "Thailand", "Malaysia", "USA"];

const VisaPosting: React.FC = () => {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    country: "",
    image: "",
    processingTime: "",
    startingPrice: "",
    description: "",
    isPopular: false,
    isNormal: false,
    approvalTime: "",
    banner: "",
    expert: "",
  });

  const [visaTypes, setVisaTypes] = useState<VisaType[]>([]);
  const [visaType, setVisaType] = useState<VisaType>({
    name: "",
    processingTime: "",
    stayPeriod: "",
    validity: "",
    category: "",
    entryType: "",
    fees: "",
  });

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [docText, setDocText] = useState("");

  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");

  const [infos, setInfos] = useState<InfoItem[]>([]);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoContent, setInfoContent] = useState("");

  const [postedVisas, setPostedVisas] = useState<any[]>([]);

  // ========================= HANDLERS ========================= //
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    setForm({
      ...form,
      [name]: type === "file" ? files?.[0]?.name || "" : type === "checkbox" ? checked : value,
    });
  };

  const addVisaType = () => {
    if (!visaType.name || !visaType.fees) return;
    setVisaTypes([...visaTypes, visaType]);
    setVisaType({ name: "", processingTime: "", stayPeriod: "", validity: "", category: "", entryType: "", fees: "" });
  };

  const addListItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, list: T[], newItem: T) =>
    setter([...list, newItem]);

  const removeListItem = <T extends { id: number }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    list: T[],
    id: number
  ) => setter(list.filter((item) => item.id !== id));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newVisa = { ...form, visaTypes, documents, faqs, infos, id: postedVisas.length + 1 };
    setPostedVisas([...postedVisas, newVisa]);
    setForm({
      country: "",
      image: "",
      processingTime: "",
      startingPrice: "",
      description: "",
      isPopular: false,
      isNormal: false,
      approvalTime: "",
      banner: "",
      expert: "",
    });
    setVisaTypes([]);
    setDocuments([]);
    setFaqs([]);
    setInfos([]);
  };

  // ========================= RENDER ========================= //
  return (
    <div className={`VisaPosting ${theme}`}>
      <div className="VisaPosting-wrapper">
        {/* ===== LEFT FORM ===== */}
        <form onSubmit={handleSubmit} className="VisaPosting-form">
          <h2 className="VisaPosting-title">🌍 Post New Visa</h2>

          {/* === VISA DETAILS === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">Visa Details</h3>
            <div className="VisaPosting-row">
              <div className="VisaPosting-field">
                <label className="VisaPosting-label">Country</label>
                <select name="country" value={form.country} onChange={handleChange} className="VisaPosting-select">
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="VisaPosting-field">
                <label className="VisaPosting-label">Processing Time</label>
                <input
                  name="processingTime"
                  value={form.processingTime}
                  onChange={handleChange}
                  placeholder="7-10 Days"
                  className="VisaPosting-input"
                />
              </div>
              <div className="VisaPosting-field">
                <label className="VisaPosting-label">Starting Price</label>
                <input
                  name="startingPrice"
                  value={form.startingPrice}
                  onChange={handleChange}
                  placeholder="₹4999"
                  className="VisaPosting-input"
                />
              </div>
            </div>

            <div className="VisaPosting-row">
              <div className="VisaPosting-field">
                <label className="VisaPosting-label">Approval Tagline</label>
                <input
                  name="approvalTime"
                  value={form.approvalTime}
                  onChange={handleChange}
                  placeholder="Get Approved in 3 Days!"
                  className="VisaPosting-input"
                />
              </div>
              <div className="VisaPosting-field">
                <label className="VisaPosting-label">Upload Banner</label>
                <input type="file" name="banner" onChange={handleChange} className="VisaPosting-file" />
              </div>
            </div>

            <div className="VisaPosting-checkboxGroup">
              {["isPopular", "isNormal"].map((key) => (
                <label key={key} className="VisaPosting-checkboxLabel">
                  <input
                    type="checkbox"
                    name={key}
                    checked={(form as any)[key]}
                    onChange={handleChange}
                    className="VisaPosting-checkbox"
                  />{" "}
                  {key === "isPopular" ? "Popular" : "Normal"}
                </label>
              ))}
            </div>
          </section>

          {/* === VISA EXPERTS === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">Visa Experts</h3>
            <select
              multiple
              name="expert"
              value={form.expert ? form.expert.split(",") : []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                setForm({ ...form, expert: selected.join(",") });
              }}
              className="VisaPosting-multiSelect"
            >
              {expertsList.map((expert) => (
                <option key={expert}>{expert}</option>
              ))}
            </select>

            {form.expert && (
              <div className="VisaPosting-selectedTags">
                {form.expert.split(",").map((name) => (
                  <span key={name} className="VisaPosting-tag">
                    {name}
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          expert: form.expert
                            .split(",")
                            .filter((n) => n.trim() !== name.trim())
                            .join(","),
                        })
                      }
                      className="VisaPosting-removeTagBtn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* === DESCRIPTION === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">Description</h3>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter details about this visa..."
              className="VisaPosting-textarea"
            />
          </section>

          {/* === VISA TYPES === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">Visa Types</h3>
            <div className="VisaPosting-typeRow">
              {["name", "processingTime", "stayPeriod", "validity", "fees"].map((f) => (
                <input
                  key={f}
                  name={f}
                  value={(visaType as any)[f]}
                  onChange={(e) => setVisaType({ ...visaType, [f]: e.target.value })}
                  placeholder={f}
                  className="VisaPosting-input"
                />
              ))}
              <select
                name="category"
                value={visaType.category}
                onChange={(e) => setVisaType({ ...visaType, category: e.target.value })}
                className="VisaPosting-select"
              >
                <option value="">Category</option>
                <option value="Tourist">Tourist</option>
                <option value="Resident">Resident</option>
              </select>
              <select
                name="entryType"
                value={visaType.entryType}
                onChange={(e) => setVisaType({ ...visaType, entryType: e.target.value })}
                className="VisaPosting-select"
              >
                <option value="">Entry Type</option>
                <option value="Single">Single</option>
                <option value="Multiple">Multiple</option>
              </select>
              <button type="button" onClick={addVisaType} className="VisaPosting-addBtn">
                +
              </button>
            </div>
            {visaTypes.length > 0 && (
              <ul className="VisaPosting-list">
                {visaTypes.map((v, i) => (
                  <li key={i}>{`${v.name} — ${v.category} — ₹${v.fees}`}</li>
                ))}
              </ul>
            )}
          </section>

          {/* === DOCUMENTS === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">Documents Required</h3>
            <div className="VisaPosting-row">
              <input
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                placeholder="Add document (e.g. Passport)"
                className="VisaPosting-input"
              />
              <button
                type="button"
                onClick={() =>
                  docText &&
                  addListItem(setDocuments, documents, { id: Date.now(), text: docText }) &&
                  setDocText("")
                }
                className="VisaPosting-addBtn"
              >
                Add
              </button>
            </div>
            <ul className="VisaPosting-list">
              {documents.map((d) => (
                <li key={d.id} className="VisaPosting-listItem">
                  {d.text}
                  <button
                    type="button"
                    onClick={() => removeListItem(setDocuments, documents, d.id)}
                    className="VisaPosting-removeBtn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* === FAQs === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">FAQs</h3>
            <div className="VisaPosting-row">
              <input
                value={faqQ}
                onChange={(e) => setFaqQ(e.target.value)}
                placeholder="Question"
                className="VisaPosting-input"
              />
              <input
                value={faqA}
                onChange={(e) => setFaqA(e.target.value)}
                placeholder="Answer"
                className="VisaPosting-input"
              />
              <button
                type="button"
                onClick={() =>
                  faqQ &&
                  faqA &&
                  addListItem(setFaqs, faqs, { id: Date.now(), question: faqQ, answer: faqA }) &&
                  (setFaqQ(""), setFaqA(""))
                }
                className="VisaPosting-addBtn"
              >
                Add
              </button>
            </div>
            <ul className="VisaPosting-list">
              {faqs.map((f) => (
                <li key={f.id} className="VisaPosting-listItem">
                  <strong>Q: {f.question}</strong>
                  <p>A: {f.answer}</p>
                  <button
                    type="button"
                    onClick={() => removeListItem(setFaqs, faqs, f.id)}
                    className="VisaPosting-removeBtn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* === ADDITIONAL INFO === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">Visa Information & More</h3>
            <div className="VisaPosting-row">
              <input
                value={infoTitle}
                onChange={(e) => setInfoTitle(e.target.value)}
                placeholder="Title"
                className="VisaPosting-input"
              />
              <input
                value={infoContent}
                onChange={(e) => setInfoContent(e.target.value)}
                placeholder="Content"
                className="VisaPosting-input"
              />
              <button
                type="button"
                onClick={() =>
                  infoTitle &&
                  infoContent &&
                  addListItem(setInfos, infos, { id: Date.now(), title: infoTitle, content: infoContent }) &&
                  (setInfoTitle(""), setInfoContent(""))
                }
                className="VisaPosting-addBtn"
              >
                Add
              </button>
            </div>
            <ul className="VisaPosting-list">
              {infos.map((i) => (
                <li key={i.id} className="VisaPosting-listItem">
                  <strong>{i.title}</strong>
                  <p>{i.content}</p>
                  <button
                    type="button"
                    onClick={() => removeListItem(setInfos, infos, i.id)}
                    className="VisaPosting-removeBtn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <button type="submit" className="VisaPosting-submitBtn">
            Post Visa
          </button>
        </form>

        {/* ===== RIGHT SIDE LIST ===== */}
        <aside className="VisaPosting-aside">
          <h3 className="VisaPosting-asideTitle">🗂️ Posted Visa List</h3>
          <table className="VisaPosting-table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Country</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postedVisas.map((visa, i) => (
                <tr key={visa.id}>
                  <td>{i + 1}</td>
                  <td>{visa.country}</td>
                  <td>{visa.visaTypes?.[0]?.category || "-"}</td>
                  <td>
                    <button className="VisaPosting-actionBtn">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="VisaPosting-note">
            <strong>Note:</strong> Edit feature coming soon.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default VisaPosting;
