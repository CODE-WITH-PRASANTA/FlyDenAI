import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import {
  Globe2,
  Clock3,
  IndianRupee,
  BadgeCheck,
  ImagePlus,
  Star,
  UserRound,
  FileText,
  Plus,
  Trash2,
  HelpCircle,
  Info,
  CheckCircle2,
  X,
  Sparkles,
  Send,
} from "lucide-react";

import "./VisaPosting.css";
import BASE_URL from "../../Api";

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

  const [typedVisaName, setTypedVisaName] = useState("");
  const [selectedVisaName, setSelectedVisaName] = useState("");

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
  const [experts, setExperts] = useState<Expert[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const entryTypes = ["Single", "Couple", "Family", "Multiple"];

  /* =========================================================
     FETCH VISA NAMES
  ========================================================= */

  useEffect(() => {
    const fetchVisaNames = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/visatypes`);

        const names = res.data.data.map(
          (visa: any) => visa.visaName
        );

        setAllVisaNames(names);
      } catch (err) {
        console.error("Error fetching visa names:", err);
      }
    };

    fetchVisaNames();
  }, []);

  /* =========================================================
     FETCH COUNTRIES
  ========================================================= */

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

  /* =========================================================
     FETCH EXPERTS
  ========================================================= */

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/teammembers`);

        setExperts(
          res.data.data.filter(
            (expert: Expert) => expert.published
          )
        );
      } catch (err) {
        console.error("Error fetching experts:", err);
      }
    };

    fetchExperts();
  }, []);

  /* =========================================================
     HANDLE FORM CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked, files } =
      e.target as HTMLInputElement;

    if (type === "file" && files) {
      setForm((prev) => ({
        ...prev,
        banner: files[0],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================================================
     ADD VISA TYPE
  ========================================================= */

  const addVisaType = () => {
    const finalName = typedVisaName || selectedVisaName;

    if (!finalName) {
      alert("Enter or select Visa Name");
      return;
    }

    setVisaTypes((prev) => [
      ...prev,
      {
        ...visaType,
        name: finalName,
        category: selectedVisaName || finalName,
      },
    ]);

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

  /* =========================================================
     DELETE FUNCTIONS
  ========================================================= */

  const deleteVisaType = (index: number) => {
    setVisaTypes((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const deleteDoc = (index: number) => {
    setDocuments((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const deleteFaq = (index: number) => {
    setFaqs((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const deleteInfo = (index: number) => {
    setInfos((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* =========================================================
     ADD DOCUMENT
  ========================================================= */

  const addDocument = () => {
    if (!docText.trim()) return;

    setDocuments((prev) => [
      ...prev,
      docText.trim(),
    ]);

    setDocText("");
  };

  /* =========================================================
     ADD FAQ
  ========================================================= */

  const addFaq = () => {
    if (!faqQ.trim() || !faqA.trim()) return;

    setFaqs((prev) => [
      ...prev,
      {
        q: faqQ.trim(),
        a: faqA.trim(),
      },
    ]);

    setFaqQ("");
    setFaqA("");
  };

  /* =========================================================
     ADD INFO
  ========================================================= */

  const addInfo = () => {
    if (!infoTitle.trim() || !infoContent.trim()) return;

    setInfos((prev) => [
      ...prev,
      {
        title: infoTitle.trim(),
        content: infoContent.trim(),
      },
    ]);

    setInfoTitle("");
    setInfoContent("");
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async () => {
    try {
      if (
        !form.country ||
        !form.processingTime ||
        !form.startingPrice ||
        !form.approvalTagline ||
        !visaDesc
      ) {
        alert("Please fill all required fields!");
        return;
      }

      setSubmitting(true);

      const formData = new FormData();

      formData.append("country", form.country);
      formData.append(
        "processingTime",
        form.processingTime
      );
      formData.append(
        "startingPrice",
        form.startingPrice
      );
      formData.append(
        "approvalTagline",
        form.approvalTagline
      );

      formData.append(
        "isPopular",
        String(form.isPopular)
      );

      formData.append(
        "isNormal",
        String(form.isNormal)
      );

      formData.append("description", visaDesc);

      if (form.expert) {
        formData.append("expert", form.expert);
      }

      if (form.banner) {
        formData.append("banner", form.banner);
      }

      formData.append(
        "visaTypes",
        JSON.stringify(visaTypes)
      );

      formData.append(
        "documents",
        JSON.stringify(documents)
      );

      formData.append(
        "faqs",
        JSON.stringify(faqs)
      );

      formData.append(
        "infos",
        JSON.stringify(infos)
      );

      const res = await axios.post(
        `${BASE_URL}/visas`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Visa posted successfully!");

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

      alert(
        err?.response?.data?.message ||
          "Server error while posting visa."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Visaposting-Page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="Visaposting-Header">

        <div className="Visaposting-HeaderIcon">
          <Globe2 size={28} />
        </div>

        <div className="Visaposting-HeaderContent">
          <span className="Visaposting-HeaderBadge">
            <Sparkles size={13} />
            VISA MANAGEMENT
          </span>

          <h1>Post New Visa</h1>

          <p>
            Create a professional visa listing with
            complete information, documents, FAQs and
            expert details.
          </p>
        </div>

        <div className="Visaposting-HeaderStats">
          <div>
            <strong>{visaTypes.length}</strong>
            <span>Visa Types</span>
          </div>

          <div>
            <strong>{documents.length}</strong>
            <span>Documents</span>
          </div>

          <div>
            <strong>{faqs.length}</strong>
            <span>FAQs</span>
          </div>
        </div>

      </div>

      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <div className="Visaposting-PageLayout">

        {/* ===================================================
            LEFT FORM
        =================================================== */}

        <main className="Visaposting-FormContainer">

          {/* VISA DETAILS */}

          <section className="Visaposting-Section">

            <div className="Visaposting-SectionHeading">

              <div className="Visaposting-SectionIcon">
                <Globe2 size={20} />
              </div>

              <div>
                <h2>Visa Details</h2>
                <p>
                  Enter the basic information for this visa.
                </p>
              </div>

            </div>

            <div className="Visaposting-GridTwoCol">

              <div className="Visaposting-Field">
                <label>
                  Country
                  <span>*</span>
                </label>

                <div className="Visaposting-InputWrapper">
                  <Globe2 size={17} />

                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="Visaposting-Select"
                  >
                    <option value="">
                      Select Country
                    </option>

                    {countries.map((country) => (
                      <option
                        key={country._id}
                        value={country.countryName}
                      >
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="Visaposting-Field">
                <label>
                  Processing Time
                  <span>*</span>
                </label>

                <div className="Visaposting-InputWrapper">
                  <Clock3 size={17} />

                  <input
                    name="processingTime"
                    value={form.processingTime}
                    onChange={handleChange}
                    placeholder="e.g. 7-10 Working Days"
                    className="Visaposting-Input"
                  />
                </div>
              </div>

              <div className="Visaposting-Field">
                <label>
                  Starting Price
                  <span>*</span>
                </label>

                <div className="Visaposting-InputWrapper">
                  <IndianRupee size={17} />

                  <input
                    name="startingPrice"
                    value={form.startingPrice}
                    onChange={handleChange}
                    placeholder="e.g. 4999"
                    className="Visaposting-Input"
                  />
                </div>
              </div>

              <div className="Visaposting-Field">
                <label>
                  Approval Tagline
                  <span>*</span>
                </label>

                <div className="Visaposting-InputWrapper">
                  <BadgeCheck size={17} />

                  <input
                    name="approvalTagline"
                    value={form.approvalTagline}
                    onChange={handleChange}
                    placeholder="e.g. 99% Approval Rate"
                    className="Visaposting-Input"
                  />
                </div>
              </div>

            </div>

            {/* BANNER */}

            <div className="Visaposting-Field Visaposting-FullField">

              <label>
                Visa Banner
              </label>

              <label className="Visaposting-UploadBox">

                <input
                  type="file"
                  name="banner"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleChange}
                />

                <div className="Visaposting-UploadIcon">
                  <ImagePlus size={25} />
                </div>

                <div>
                  <strong>
                    {form.banner
                      ? form.banner.name
                      : "Upload Visa Banner"}
                  </strong>

                  <span>
                    PNG, JPG or WEBP · Recommended
                    high-quality image
                  </span>
                </div>

              </label>

            </div>

            {/* STATUS */}

            <div className="Visaposting-StatusGrid">

              <label
                className={`Visaposting-StatusCard ${
                  form.isPopular
                    ? "active"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={form.isPopular}
                  onChange={handleChange}
                />

                <div className="Visaposting-StatusIcon">
                  <Star size={20} />
                </div>

                <div>
                  <strong>Popular Visa</strong>
                  <span>
                    Highlight this visa as popular.
                  </span>
                </div>

                <CheckCircle2 className="Visaposting-CheckIcon" />
              </label>

              <label
                className={`Visaposting-StatusCard ${
                  form.isNormal
                    ? "active"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="isNormal"
                  checked={form.isNormal}
                  onChange={handleChange}
                />

                <div className="Visaposting-StatusIcon">
                  <BadgeCheck size={20} />
                </div>

                <div>
                  <strong>Normal Visa</strong>
                  <span>
                    Mark this as a standard visa.
                  </span>
                </div>

                <CheckCircle2 className="Visaposting-CheckIcon" />
              </label>

            </div>

          </section>

          {/* =================================================
              EXPERT
          ================================================= */}

          <section className="Visaposting-Section">

            <div className="Visaposting-SectionHeading">

              <div className="Visaposting-SectionIcon">
                <UserRound size={20} />
              </div>

              <div>
                <h2>Visa Expert</h2>
                <p>
                  Assign a published expert to this visa.
                </p>
              </div>

            </div>

            <div className="Visaposting-Field">

              <label>Assigned Expert</label>

              <div className="Visaposting-InputWrapper">
                <UserRound size={17} />

                <select
                  name="expert"
                  value={form.expert}
                  onChange={handleChange}
                  className="Visaposting-Select"
                >
                  <option value="">
                    Select Expert
                  </option>

                  {experts.map((expert) => (
                    <option
                      key={expert._id}
                      value={expert.name}
                    >
                      {expert.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

          </section>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <section className="Visaposting-Section">

            <div className="Visaposting-SectionHeading">

              <div className="Visaposting-SectionIcon">
                <FileText size={20} />
              </div>

              <div>
                <h2>Visa Description</h2>
                <p>
                  Add detailed information about this visa.
                </p>
              </div>

            </div>

            <div className="Visaposting-EditorWrapper">

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
                    "insertdatetime media table paste help wordcount",
                  ],

                  toolbar: `
                    undo redo |
                    formatselect |
                    bold italic underline strikethrough |
                    forecolor backcolor |
                    alignleft aligncenter alignright alignjustify |
                    bullist numlist outdent indent |
                    blockquote removeformat |
                    link image media table |
                    code fullscreen |
                    preview
                  `,

                  content_style:
                    "body { font-family: Inter, Arial, sans-serif; font-size: 14px; line-height: 1.7; padding: 10px; }",
                }}
              />

            </div>

          </section>

          {/* =================================================
              VISA TYPES
          ================================================= */}

          <section className="Visaposting-Section">

            <div className="Visaposting-SectionHeading">

              <div className="Visaposting-SectionIcon">
                <BadgeCheck size={20} />
              </div>

              <div>
                <h2>Visa Types</h2>
                <p>
                  Add individual visa types and pricing.
                </p>
              </div>

            </div>

            <div className="Visaposting-AddGrid">

              <div className="Visaposting-Field">
                <label>New Visa Name</label>
                <input
                  placeholder="Type Visa Name"
                  value={typedVisaName}
                  onChange={(e) =>
                    setTypedVisaName(e.target.value)
                  }
                  className="Visaposting-Input"
                />
              </div>

              <div className="Visaposting-Field">
                <label>Existing Visa</label>
                <select
                  value={selectedVisaName}
                  onChange={(e) =>
                    setSelectedVisaName(e.target.value)
                  }
                  className="Visaposting-Select"
                >
                  <option value="">
                    Select Visa Name
                  </option>

                  {allVisaNames.map(
                    (name, index) => (
                      <option
                        key={index}
                        value={name}
                      >
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="Visaposting-Field">
                <label>Fees</label>
                <input
                  placeholder="₹ Fees"
                  value={visaType.fees}
                  onChange={(e) =>
                    setVisaType({
                      ...visaType,
                      fees: e.target.value,
                    })
                  }
                  className="Visaposting-Input"
                />
              </div>

              <div className="Visaposting-Field">
                <label>Processing Time</label>
                <input
                  placeholder="e.g. 7 Days"
                  value={visaType.processingTime}
                  onChange={(e) =>
                    setVisaType({
                      ...visaType,
                      processingTime:
                        e.target.value,
                    })
                  }
                  className="Visaposting-Input"
                />
              </div>

              <div className="Visaposting-Field">
                <label>Stay Period</label>
                <input
                  placeholder="e.g. 30 Days"
                  value={visaType.stayPeriod}
                  onChange={(e) =>
                    setVisaType({
                      ...visaType,
                      stayPeriod:
                        e.target.value,
                    })
                  }
                  className="Visaposting-Input"
                />
              </div>

              <div className="Visaposting-Field">
                <label>Validity</label>
                <input
                  placeholder="e.g. 1 Year"
                  value={visaType.validity}
                  onChange={(e) =>
                    setVisaType({
                      ...visaType,
                      validity:
                        e.target.value,
                    })
                  }
                  className="Visaposting-Input"
                />
              </div>

              <div className="Visaposting-Field">
                <label>Entry Type</label>

                <select
                  value={visaType.entryType}
                  onChange={(e) =>
                    setVisaType({
                      ...visaType,
                      entryType:
                        e.target.value,
                    })
                  }
                  className="Visaposting-Select"
                >
                  <option value="">
                    Select Entry Type
                  </option>

                  {entryTypes.map((entry) => (
                    <option
                      key={entry}
                      value={entry}
                    >
                      {entry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="Visaposting-AddButtonWrapper">

                <button
                  type="button"
                  onClick={addVisaType}
                  className="Visaposting-AddBtn"
                >
                  <Plus size={18} />
                  Add Visa Type
                </button>

              </div>

            </div>

          </section>

          {/* =================================================
              DOCUMENTS
          ================================================= */}

          <section className="Visaposting-Section">

            <div className="Visaposting-SectionHeading">

              <div className="Visaposting-SectionIcon">
                <FileText size={20} />
              </div>

              <div>
                <h2>Documents Required</h2>
                <p>
                  List the documents applicants need.
                </p>
              </div>

            </div>

            <div className="Visaposting-InlineAdd">

              <input
                value={docText}
                onChange={(e) =>
                  setDocText(e.target.value)
                }
                placeholder="Enter document name"
                className="Visaposting-Input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addDocument();
                  }
                }}
              />

              <button
                type="button"
                onClick={addDocument}
                className="Visaposting-AddBtn"
              >
                <Plus size={18} />
                Add Document
              </button>

            </div>

            {documents.length > 0 && (
              <div className="Visaposting-ChipList">

                {documents.map((document, index) => (
                  <div
                    key={index}
                    className="Visaposting-Chip"
                  >
                    <FileText size={15} />

                    <span>{document}</span>

                    <button
                      type="button"
                      onClick={() =>
                        deleteDoc(index)
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

              </div>
            )}

          </section>

          {/* =================================================
              FAQ
          ================================================= */}

          <section className="Visaposting-Section">

            <div className="Visaposting-SectionHeading">

              <div className="Visaposting-SectionIcon">
                <HelpCircle size={20} />
              </div>

              <div>
                <h2>Frequently Asked Questions</h2>
                <p>
                  Add common questions and answers.
                </p>
              </div>

            </div>

            <div className="Visaposting-FAQGrid">

              <div className="Visaposting-Field">
                <label>Question</label>

                <input
                  value={faqQ}
                  onChange={(e) =>
                    setFaqQ(e.target.value)
                  }
                  placeholder="Enter question"
                  className="Visaposting-Input"
                />
              </div>

              <div className="Visaposting-Field">
                <label>Answer</label>

                <input
                  value={faqA}
                  onChange={(e) =>
                    setFaqA(e.target.value)
                  }
                  placeholder="Enter answer"
                  className="Visaposting-Input"
                />
              </div>

              <button
                type="button"
                onClick={addFaq}
                className="Visaposting-AddBtn"
              >
                <Plus size={18} />
                Add FAQ
              </button>

            </div>

          </section>

          {/* =================================================
              VISA INFORMATION
          ================================================= */}

          <section className="Visaposting-Section">

            <div className="Visaposting-SectionHeading">

              <div className="Visaposting-SectionIcon">
                <Info size={20} />
              </div>

              <div>
                <h2>Visa Information</h2>
                <p>
                  Add additional information for applicants.
                </p>
              </div>

            </div>

            <div className="Visaposting-InfoGrid">

              <div className="Visaposting-Field">
                <label>Information Title</label>

                <input
                  value={infoTitle}
                  onChange={(e) =>
                    setInfoTitle(e.target.value)
                  }
                  placeholder="e.g. Eligibility"
                  className="Visaposting-Input"
                />
              </div>

              <div className="Visaposting-Field">
                <label>Information Content</label>

                <input
                  value={infoContent}
                  onChange={(e) =>
                    setInfoContent(e.target.value)
                  }
                  placeholder="Enter information"
                  className="Visaposting-Input"
                />
              </div>

              <button
                type="button"
                onClick={addInfo}
                className="Visaposting-AddBtn"
              >
                <Plus size={18} />
                Add Information
              </button>

            </div>

          </section>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="Visaposting-SubmitArea">

            <div className="Visaposting-SubmitInfo">
              <CheckCircle2 size={20} />

              <div>
                <strong>
                  Ready to publish?
                </strong>

                <span>
                  Review your visa information before
                  posting it.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="Visaposting-SubmitBtn"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="Visaposting-Spinner" />
                  Posting Visa...
                </>
              ) : (
                <>
                  <Send size={19} />
                  Post Visa
                </>
              )}
            </button>

          </div>

        </main>

        {/* ===================================================
            RIGHT PREVIEW
        =================================================== */}

        <aside className="Visaposting-PreviewPanel">

          <div className="Visaposting-PreviewHeader">

            <div className="Visaposting-PreviewHeaderIcon">
              <FileText size={20} />
            </div>

            <div>
              <span>LIVE PREVIEW</span>
              <h2>Added Data</h2>
            </div>

          </div>

          {/* VISA TYPES */}

          <div className="Visaposting-PreviewSection">

            <div className="Visaposting-PreviewSectionHeader">
              <div>
                <BadgeCheck size={17} />
                <h3>Visa Types</h3>
              </div>

              <span>
                {visaTypes.length}
              </span>
            </div>

            {visaTypes.length === 0 ? (
              <div className="Visaposting-EmptyState">
                <BadgeCheck size={24} />
                <p>No visa types added yet.</p>
              </div>
            ) : (
              visaTypes.map((visa, index) => (
                <div
                  key={index}
                  className="Visaposting-PreviewCard"
                >
                  <div className="Visaposting-PreviewCardIcon">
                    <Globe2 size={17} />
                  </div>

                  <div className="Visaposting-PreviewCardContent">
                    <strong>{visa.name}</strong>

                    <span>
                      {visa.entryType ||
                        "Entry type not specified"}
                    </span>

                    <small>
                      ₹{visa.fees || "0"}
                    </small>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      deleteVisaType(index)
                    }
                    className="Visaposting-DeleteBtn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}

          </div>

          {/* DOCUMENTS */}

          <div className="Visaposting-PreviewSection">

            <div className="Visaposting-PreviewSectionHeader">
              <div>
                <FileText size={17} />
                <h3>Documents</h3>
              </div>

              <span>
                {documents.length}
              </span>
            </div>

            {documents.length === 0 ? (
              <div className="Visaposting-EmptyState">
                <FileText size={24} />
                <p>No documents added yet.</p>
              </div>
            ) : (
              documents.map((document, index) => (
                <div
                  key={index}
                  className="Visaposting-SimplePreview"
                >
                  <div>
                    <CheckCircle2 size={16} />
                    <span>{document}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      deleteDoc(index)
                    }
                    className="Visaposting-DeleteBtn"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}

          </div>

          {/* FAQ */}

          <div className="Visaposting-PreviewSection">

            <div className="Visaposting-PreviewSectionHeader">
              <div>
                <HelpCircle size={17} />
                <h3>FAQs</h3>
              </div>

              <span>
                {faqs.length}
              </span>
            </div>

            {faqs.length === 0 ? (
              <div className="Visaposting-EmptyState">
                <HelpCircle size={24} />
                <p>No FAQs added yet.</p>
              </div>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={index}
                  className="Visaposting-FAQPreview"
                >
                  <div className="Visaposting-FAQTop">
                    <strong>
                      Q{index + 1}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        deleteFaq(index)
                      }
                      className="Visaposting-DeleteBtn"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <p className="Visaposting-Question">
                    {faq.q}
                  </p>

                  <p className="Visaposting-Answer">
                    {faq.a}
                  </p>
                </div>
              ))
            )}

          </div>

          {/* INFO */}

          <div className="Visaposting-PreviewSection">

            <div className="Visaposting-PreviewSectionHeader">
              <div>
                <Info size={17} />
                <h3>Visa Information</h3>
              </div>

              <span>
                {infos.length}
              </span>
            </div>

            {infos.length === 0 ? (
              <div className="Visaposting-EmptyState">
                <Info size={24} />
                <p>No information added yet.</p>
              </div>
            ) : (
              infos.map((info, index) => (
                <div
                  key={index}
                  className="Visaposting-InfoPreview"
                >
                  <div className="Visaposting-InfoPreviewTop">

                    <strong>
                      {info.title}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        deleteInfo(index)
                      }
                      className="Visaposting-DeleteBtn"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                  <p>{info.content}</p>
                </div>
              ))
            )}

          </div>

        </aside>

      </div>
    </div>
  );
};

export default VisaPosting;