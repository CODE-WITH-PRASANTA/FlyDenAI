import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./VisaPosting.css";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../Api";
import { Editor } from "@tinymce/tinymce-react"; // <-- add this at top


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

interface Country {
  _id: string;
  countryName: string;
  placeName: string;
  logoUrl?: string;
}

interface Expert {
  _id: string;
  name: string;
  designation: string;
  imageUrl?: string;
}

interface VisaForm {
  country: string;
  processingTime: string;
  startingPrice: string;
  description: string;
  isPopular: boolean;
  isNormal: boolean;
  approvalTime: string;
  banner: File | null;
  expert: string;
}

const VisaPosting: React.FC = () => {
  const { theme } = useTheme();

  // ========================= STATES ========================= //
  const [countries, setCountries] = useState<Country[]>([]);
  const [expertsList, setExpertsList] = useState<Expert[]>([]);
  const [visaDesc, setVisaDesc] = useState("");
  const [form, setForm] = useState<VisaForm>({
    country: "",
    processingTime: "",
    startingPrice: "",
    description: "",
    isPopular: false,
    isNormal: false,
    approvalTime: "",
    banner: null,
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
  const [loading, setLoading] = useState(false);
  const [visaTypeCategories, setVisaTypeCategories] = useState<string[]>([]);

  // ========================= HELPERS ========================= //
  const safeGetArray = (res: any): any[] => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  };

  const addListItem = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    list: T[],
    newItem: T
  ) => setter([...list, newItem]);

  const removeListItem = <T extends { id: number }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    list: T[],
    id: number
  ) => setter(list.filter((item) => item.id !== id));

  // ========================= FETCH FUNCTIONS ========================= //
  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/countries`);
      const arr = safeGetArray(res);
      const normalized = arr.map((c: any) => ({
        _id: c._id || c.id || String(Math.random()),
        countryName: c.countryName || c.name || "",
        placeName: c.placeName || c.place || "",
        logoUrl: c.logoUrl || c.image || undefined,
      }));
      setCountries(normalized);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  const fetchExperts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/teammembers`);
      const arr = safeGetArray(res);
      const publishedExperts = arr.filter((member: any) => member.published);
      setExpertsList(
        publishedExperts.map((m: any) => ({
          _id: m._id || m.id || String(Math.random()),
          name: m.name || "",
          designation: m.designation || "",
          imageUrl: m.imageUrl || m.image || undefined,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch experts:", error);
    }
  };

  const fetchVisaTypes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/visatypes`);
      const arr = safeGetArray(res);
      const cats = arr
        .map((v: any) => v.visaName)
        .filter((n: string) => n && n.trim() !== "");
      const uniqueCategories = Array.from(new Set(cats));
      setVisaTypeCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch visa types:", error);
    }
  };

  const fetchVisas = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/visas`);
      const arr = safeGetArray(res);
      setPostedVisas(arr.length ? arr : res.data || []);
    } catch (error) {
      console.error("Error fetching visas:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchExperts();
    fetchVisaTypes();
    fetchVisas();
  }, []);

  // ========================= HANDLERS ========================= //
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === "file" && files && files.length > 0) {
      setForm({ ...form, banner: files[0] });
      return;
    }

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    } as VisaForm);
  };

  const addVisaType = () => {
    if (!visaType.name.trim()) {
      alert("Please provide a visa type name.");
      return;
    }
    if (!visaType.fees.trim()) {
      alert("Please provide fees for the visa type.");
      return;
    }
    setVisaTypes((prev) => [...prev, { ...visaType }]);
    setVisaType({
      name: "",
      processingTime: "",
      stayPeriod: "",
      validity: "",
      category: "",
      entryType: "",
      fees: "",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("country", form.country);
      formData.append("processingTime", form.processingTime);
      formData.append("startingPrice", form.startingPrice);
      formData.append("approvalTime", form.approvalTime);
      formData.append("description", visaDesc);
      formData.append("isPopular", String(form.isPopular));
      formData.append("isNormal", String(form.isNormal));
      formData.append("expert", form.expert);
      if (form.banner) formData.append("banner", form.banner);

      formData.append("visaTypes", JSON.stringify(visaTypes));
      formData.append("documents", JSON.stringify(documents));
      formData.append("faqs", JSON.stringify(faqs));
      formData.append("infos", JSON.stringify(infos));

      const res = await axios.post(`${BASE_URL}/visas`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data?.message || "Visa posted successfully");
      await fetchVisas();

      setForm({
        country: "",
        processingTime: "",
        startingPrice: "",
        description: "",
        isPopular: false,
        isNormal: false,
        approvalTime: "",
        banner: null,
        expert: "",
      });
      setVisaTypes([]);
      setDocuments([]);
      setFaqs([]);
      setInfos([]);
    } catch (error) {
      console.error("❌ Error posting visa:", error);
      alert("Error posting visa. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this visa?")) return;
    try {
      await axios.delete(`${BASE_URL}/visas/${id}`);
      alert("Visa deleted successfully ✅");
      fetchVisas();
    } catch (error) {
      console.error("Error deleting visa:", error);
      alert("Failed to delete visa. Check console.");
    }
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
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="VisaPosting-select"
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c._id} value={c.countryName}>
                      {c.countryName} — {c.placeName}
                    </option>
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
                <input
                  type="file"
                  name="banner"
                  onChange={handleChange}
                  className="VisaPosting-file"
                />
              </div>
            </div>

            <div className="VisaPosting-checkboxGroup">
              {(["isPopular", "isNormal"] as const).map((key) => (
                <label key={key} className="VisaPosting-checkboxLabel">
                  <input
                    type="checkbox"
                    name={key}
                    checked={form[key]}
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
                const selected = Array.from(
                  e.target.selectedOptions,
                  (opt) => opt.value
                );
                setForm({ ...form, expert: selected.join(",") });
              }}
              className="VisaPosting-multiSelect"
            >
              {expertsList.map((expert) => (
                <option key={expert._id} value={expert.name}>
                  {expert.name} — {expert.designation}
                </option>
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

          <section className="VisaPosting-section">
              <h3 className="VisaPosting-sectionTitle">Description</h3>
              <Editor
                apiKey="osnm6yw158o1eaimm0d04yws6sueiubjcuj4i4axh4ulv81i"
                value={visaDesc}
                onEditorChange={(newValue) => setVisaDesc(newValue)}
                init={{
                  height: 400,
                  menubar: true,
                  branding: false,
                  toolbar_sticky: true,
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table help wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
                  skin: theme === "dark" ? "oxide-dark" : "oxide",
                  content_css: theme === "dark" ? "dark" : "default",
                }}
              />
            </section>
          {/* === VISA TYPES === */}
          <section className="VisaPosting-section">
            <h3 className="VisaPosting-sectionTitle">Visa Types</h3>
            <div className="VisaPosting-typeRow">
              {["name", "processingTime", "stayPeriod", "validity", "fees"].map(
                (f) => (
                  <input
                    key={f}
                    name={f}
                    value={(visaType as any)[f]}
                    onChange={(e) =>
                      setVisaType({ ...visaType, [f]: e.target.value })
                    }
                    placeholder={f}
                    className="VisaPosting-input"
                  />
                )
              )}

              <select
                name="category"
                value={visaType.category}
                onChange={(e) =>
                  setVisaType({ ...visaType, category: e.target.value })
                }
                className="VisaPosting-select"
              >
                <option value="">Category</option>
                {visaTypeCategories.length === 0 ? (
                  <option value="">No categories found</option>
                ) : (
                  visaTypeCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))
                )}
              </select>

              <select
                name="entryType"
                value={visaType.entryType}
                onChange={(e) =>
                  setVisaType({ ...visaType, entryType: e.target.value })
                }
                className="VisaPosting-select"
              >
                <option value="">Entry Type</option>
                <option value="Single">Single</option>
                <option value="Multiple">Multiple</option>
              </select>

              <button
                type="button"
                onClick={addVisaType}
                className="VisaPosting-addBtn"
              >
                +
              </button>
            </div>

            {visaTypes.length > 0 && (
              <ul className="VisaPosting-list">
                {visaTypes.map((v, i) => (
                  <li key={i}>{`${v.name} — ${v.category || "-"} — ₹${v.fees}`}</li>
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
                onClick={() => {
                  if (docText.trim()) {
                    addListItem(setDocuments, documents, {
                      id: Date.now(),
                      text: docText,
                    });
                    setDocText("");
                  }
                }}
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

          {/* === FAQ === */}
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
                onClick={() => {
                  if (faqQ.trim() && faqA.trim()) {
                    addListItem(setFaqs, faqs, {
                      id: Date.now(),
                      question: faqQ,
                      answer: faqA,
                    });
                    setFaqQ("");
                    setFaqA("");
                  }
                }}
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
                onClick={() => {
                  if (infoTitle.trim() && infoContent.trim()) {
                    addListItem(setInfos, infos, {
                      id: Date.now(),
                      title: infoTitle,
                      content: infoContent,
                    });
                    setInfoTitle("");
                    setInfoContent("");
                  }
                }}
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

          <button
            type="submit"
            className="VisaPosting-submitBtn"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Visa"}
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
                <tr key={visa._id || i}>
                  <td>{i + 1}</td>
                  <td>{visa.country || visa.countryName || "-"}</td>
                  <td>
                    {(visa.visaTypes &&
                      visa.visaTypes[0] &&
                      visa.visaTypes[0].category) ||
                      "-"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(visa._id)}
                      className="VisaPosting-actionBtn"
                    >
                      Delete
                    </button>
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
