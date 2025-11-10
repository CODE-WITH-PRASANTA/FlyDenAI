import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VisaPosting.css";
import { Editor } from "@tinymce/tinymce-react";
import BASE_URL from "../../Api"; // Example: "http://localhost:5000/api"

interface VisaType {
  name: string;
  processingTime: string;
  stayPeriod: string;
  validity: string;
  category: string;
  entryType: string;
  fees: string;
}

interface Faq {
  q: string;
  a: string;
}

interface Info {
  title: string;
  content: string;
}

interface Country {
  _id: string;
  countryName: string;
}

interface Expert {
  _id: string;
  name: string;
  designation: string;
  published: boolean;
}

const VisaPosting: React.FC = () => {
  const [visaDesc, setVisaDesc] = useState("");
  const [form, setForm] = useState({
    country: "",
    processingTime: "",
    startingPrice: "",
    approvalTagline: "",
    isPopular: false,
    isNormal: false,
    banner: null as File | null,
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

  const [typedVisaName, setTypedVisaName] = useState(""); // For manual typing
  const [selectedVisaName, setSelectedVisaName] = useState(""); // For selecting existing

  const [countries, setCountries] = useState<Country[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);
  const [docText, setDocText] = useState("");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");
  const [infos, setInfos] = useState<Info[]>([]);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoContent, setInfoContent] = useState("");
  const [allVisaNames, setAllVisaNames] = useState<string[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]); // Fetched from backend
  const entryTypes = ["Single", "Couple", "Family", "Multiple"];

  // Fetch visa names
  useEffect(() => {
    const fetchVisaNames = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visatypes`);
        const names = res.data.data.map((visa: any) => visa.visaName);
        setAllVisaNames(names);
      } catch (err) {
        console.error("Error fetching visa names:", err);
      }
    };
    fetchVisaNames();
  }, []);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/countries`);
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch experts from backend
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/teammembers`);
        // Only include published members
        setExperts(res.data.data.filter((e: Expert) => e.published));
      } catch (err) {
        console.error("Error fetching experts:", err);
      }
    };
    fetchExperts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "file" && files) setForm({ ...form, banner: files[0] });
    else setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

const addVisaType = () => {
  const finalName = typedVisaName || selectedVisaName;
  if (!finalName) return alert("Enter or select Visa Name");

  setVisaTypes([
    ...visaTypes,
    {
      ...visaType,
      name: finalName,
      category: selectedVisaName || finalName, // ✅ Category always comes from selectedVisaName
    },
  ]);

  // Reset fields after adding
  setVisaType({
    name: "",
    processingTime: "",
    stayPeriod: "",
    validity: "",
    category: "",
    entryType: "",
    fees: "",
  });
  setTypedVisaName("");
  setSelectedVisaName("");
};


  const deleteVisaType = (i: number) => setVisaTypes(visaTypes.filter((_, idx) => idx !== i));
  const deleteDoc = (i: number) => setDocuments(documents.filter((_, idx) => idx !== i));
  const deleteFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));
  const deleteInfo = (i: number) => setInfos(infos.filter((_, idx) => idx !== i));


  const handleSubmit = async () => {
  try {
    // Validation
    if (!form.country || !form.processingTime || !form.startingPrice || !form.approvalTagline || !visaDesc) {
      return alert("Please fill all required fields!");
    }

    // FormData for multipart
    const formData = new FormData();
    formData.append("country", form.country);
    formData.append("processingTime", form.processingTime);
    formData.append("startingPrice", form.startingPrice);
    formData.append("approvalTagline", form.approvalTagline);
    formData.append("isPopular", String(form.isPopular));
    formData.append("isNormal", String(form.isNormal));
    formData.append("description", visaDesc);
    if (form.expert) formData.append("expert", form.expert);

    // Files
    if (form.banner) formData.append("banner", form.banner);
    // Add specialImage if needed (you can add input field for it)
    // if (form.specialImage) formData.append("specialImage", form.specialImage);

    // Arrays as JSON strings
    formData.append("visaTypes", JSON.stringify(visaTypes));
    formData.append("documents", JSON.stringify(documents));
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("infos", JSON.stringify(infos));

    // Axios POST
    const res = await axios.post(`${BASE_URL}/visas`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      alert("Visa posted successfully!");
      // Reset all fields
      setForm({
        country: "",
        processingTime: "",
        startingPrice: "",
        approvalTagline: "",
        isPopular: false,
        isNormal: false,
        banner: null,
        expert: "",
      });
      setVisaDesc("");
      setVisaTypes([]);
      setDocuments([]);
      setFaqs([]);
      setInfos([]);
      setTypedVisaName("");
      setSelectedVisaName("");
      setDocText("");
      setFaqQ("");
      setFaqA("");
      setInfoTitle("");
      setInfoContent("");
    }
  } catch (err: any) {
    console.error("Error posting visa:", err);
    alert(err?.response?.data?.message || "Server error while posting visa.");
  }
};
 
  return (
    <div className="Visaposting-PageLayout">
      {/* LEFT FORM */}
      <div className="Visaposting-FormContainer">
        <h2 className="Visaposting-Title">🌍 Add New Visa</h2>

        {/* Visa Details */}
        <section className="Visaposting-Section">
          <h3 className="Visaposting-SectionTitle">Visa Details</h3>
          <div className="Visaposting-GridTwoCol">
            <select name="country" value={form.country} onChange={handleChange} className="Visaposting-Select">
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c._id} value={c.countryName}>{c.countryName}</option>
              ))}
            </select>
            <input name="processingTime" value={form.processingTime} onChange={handleChange} placeholder="Processing Time" className="Visaposting-Input"/>
            <input name="startingPrice" value={form.startingPrice} onChange={handleChange} placeholder="Starting Price" className="Visaposting-Input"/>
            <input name="approvalTagline" value={form.approvalTagline} onChange={handleChange} placeholder="Approval Tagline" className="Visaposting-Input"/>
            <input type="file" name="banner" onChange={handleChange} className="Visaposting-FileInput"/>
          </div>
          <div className="Visaposting-CheckboxRow">
            <label><input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange}/> Popular</label>
            <label><input type="checkbox" name="isNormal" checked={form.isNormal} onChange={handleChange}/> Normal</label>
          </div>
        </section>

        {/* Expert */}
        <section className="Visaposting-Section">
          <h3 className="Visaposting-SectionTitle">Visa Expert</h3>
          <select name="expert" value={form.expert} onChange={handleChange} className="Visaposting-Select">
            <option value="">Select Expert</option>
            {experts.map((e) => <option key={e._id} value={e.name}>{e.name}</option>)}
          </select>
        </section>

        {/* Description */}
        <section className="Visaposting-Section">
          <h3 className="Visaposting-SectionTitle">Visa Description</h3>
          <Editor
            apiKey="osnm6yw158o1eaimm0d04yws6sueiubjcuj4i4axh4ulv81i"
            value={visaDesc}
            onEditorChange={setVisaDesc}
            init={{
              height: 400,
              menubar: true,
              branding: false,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste help wordcount"
              ],
              toolbar: `
                undo redo | formatselect | 
                bold italic underline strikethrough | 
                forecolor backcolor | 
                alignleft aligncenter alignright alignjustify | 
                bullist numlist outdent indent | 
                blockquote removeformat | 
                link image media table | 
                code fullscreen | 
                preview
              `,
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }"
            }}
          />
        </section>

        {/* Visa Types */}
        <section className="Visaposting-Section">
          <h3 className="Visaposting-SectionTitle">Visa Types</h3>
          <div className="Visaposting-GridTwoCol">
            <input placeholder="Type Visa Name (if new)" value={typedVisaName} onChange={(e) => setTypedVisaName(e.target.value)} className="Visaposting-Input"/>
            <input placeholder="Fees" value={visaType.fees} onChange={(e) => setVisaType({ ...visaType, fees: e.target.value })} className="Visaposting-Input"/>
            <input placeholder="Processing Time" value={visaType.processingTime} onChange={(e) => setVisaType({ ...visaType, processingTime: e.target.value })} className="Visaposting-Input"/>
            <input placeholder="Stay Period" value={visaType.stayPeriod} onChange={(e) => setVisaType({ ...visaType, stayPeriod: e.target.value })} className="Visaposting-Input"/>
            <input placeholder="Validity" value={visaType.validity} onChange={(e) => setVisaType({ ...visaType, validity: e.target.value })} className="Visaposting-Input"/>
            <select value={selectedVisaName} onChange={(e) => setSelectedVisaName(e.target.value)} className="Visaposting-Select">
              <option value="">Select Visa Name</option>
              {allVisaNames.map((name, idx) => <option key={idx} value={name}>{name}</option>)}
            </select>
            <select value={visaType.entryType} onChange={(e) => setVisaType({ ...visaType, entryType: e.target.value })} className="Visaposting-Select">
              <option value="">Select Entry Type</option>
              {entryTypes.map((e) => <option key={e}>{e}</option>)}
            </select>
            <button type="button" onClick={addVisaType} className="Visaposting-AddBtn">Add</button>
          </div>
        </section>

        {/* Documents */}
        <section className="Visaposting-Section">
          <h3 className="Visaposting-SectionTitle">Documents Required</h3>
          <div className="Visaposting-InlineAdd">
            <input value={docText} onChange={(e) => setDocText(e.target.value)} placeholder="Enter Document Name" className="Visaposting-Input"/>
            <button onClick={() => docText && (setDocuments([...documents, docText]), setDocText(""))} className="Visaposting-AddBtn">Add</button>
          </div>
        </section>

        {/* FAQs */}
        <section className="Visaposting-Section">
          <h3 className="Visaposting-SectionTitle">FAQs</h3>
          <div className="Visaposting-InlineAdd">
            <input value={faqQ} onChange={(e) => setFaqQ(e.target.value)} placeholder="Question" className="Visaposting-Input"/>
            <input value={faqA} onChange={(e) => setFaqA(e.target.value)} placeholder="Answer" className="Visaposting-Input"/>
            <button onClick={() => faqQ && faqA && (setFaqs([...faqs, { q: faqQ, a: faqA }]), setFaqQ(""), setFaqA(""))} className="Visaposting-AddBtn">Add</button>
          </div>
        </section>

        {/* Info */}
        <section className="Visaposting-Section">
          <h3 className="Visaposting-SectionTitle">Visa Information</h3>
          <div className="Visaposting-InlineAdd">
            <input value={infoTitle} onChange={(e) => setInfoTitle(e.target.value)} placeholder="Title" className="Visaposting-Input"/>
            <input value={infoContent} onChange={(e) => setInfoContent(e.target.value)} placeholder="Content" className="Visaposting-Input"/>
            <button onClick={() => infoTitle && infoContent && (setInfos([...infos, { title: infoTitle, content: infoContent }]), setInfoTitle(""), setInfoContent(""))} className="Visaposting-AddBtn">Add</button>
          </div>
        </section>

       <button type="button" onClick={handleSubmit} className="Visaposting-SubmitBtn">
          💾 Post Visa
        </button>

      </div>

      {/* RIGHT PREVIEW PANEL */}
      <aside className="Visaposting-PreviewPanel">
        <h3 className="Visaposting-PreviewTitle">🧾 Added Data</h3>

        <div className="Visaposting-PreviewSection">
          <h4>Visa Types</h4>
          {visaTypes.map((v, i) => (
            <div key={i} className="Visaposting-PreviewBox">
              <p><b>{v.name}</b> — ₹{v.fees}</p>
              <button onClick={() => deleteVisaType(i)}>🗑</button>
            </div>
          ))}
        </div>

        <div className="Visaposting-PreviewSection">
          <h4>Documents</h4>
          {documents.map((d, i) => (
            <div key={i} className="Visaposting-PreviewBox">
              <p>{d}</p>
              <button onClick={() => deleteDoc(i)}>🗑</button>
            </div>
          ))}
        </div>

        <div className="Visaposting-PreviewSection">
          <h4>FAQs</h4>
          {faqs.map((f, i) => (
            <div key={i} className="Visaposting-PreviewBox">
              <p><b>Q:</b> {f.q}</p>
              <p><b>A:</b> {f.a}</p>
              <button onClick={() => deleteFaq(i)}>🗑</button>
            </div>
          ))}
        </div>

        <div className="Visaposting-PreviewSection">
          <h4>Visa Info</h4>
          {infos.map((info, i) => (
            <div key={i} className="Visaposting-PreviewBox">
              <p><b>{info.title}</b>: {info.content}</p>
              <button onClick={() => deleteInfo(i)}>🗑</button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default VisaPosting;
