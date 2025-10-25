import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './ContactManagemenet.css';
import { useTheme } from "../../context/ThemeContext";

interface SocialLinks {
  instagram: string;
  facebook: string;
  linkedin: string;
  twitter: string;
}

interface Contact {
  id: number;
  email: string;
  phone: string;
  whatsapp: string;
  social: SocialLinks;
  openHours: Record<string, string>;
  addresses: string[];
  published: boolean;
}

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const ContactManagemenet: React.FC = () => {
  const { theme } = useTheme(); // "light" or "dark"

  const [contactsList, setContactsList] = useState<Contact[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [contactData, setContactData] = useState<Contact>({
    id: 0,
    email: '',
    phone: '',
    whatsapp: '',
    social: { instagram: '', facebook: '', linkedin: '', twitter: '' },
    openHours: { Sun:'', Mon:'', Tue:'', Wed:'', Thu:'', Fri:'', Sat:'' },
    addresses: ['', '', ''],
    published: false,
  });

  // Apply theme to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: 'addresses' | 'openHours',
    day?: string
  ) => {
    const { name, value } = e.target;
    if (field === 'addresses' && typeof index === 'number') {
      const updatedAddresses = [...contactData.addresses];
      updatedAddresses[index] = value;
      setContactData({ ...contactData, addresses: updatedAddresses });
    } else if (field === 'openHours' && day) {
      setContactData({
        ...contactData,
        openHours: { ...contactData.openHours, [day]: value },
      });
    } else if (['instagram','facebook','linkedin','twitter'].includes(name)) {
      setContactData({
        ...contactData,
        social: { ...contactData.social, [name]: value },
      });
    } else {
      setContactData({ ...contactData, [name]: value });
    }
  };

  // Submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(editId !== null){
      setContactsList(contactsList.map(c => c.id === editId ? { ...contactData, id: editId } : c));
      setEditId(null);
    } else {
      const newContact = { ...contactData, id: Date.now() };
      setContactsList([...contactsList, newContact]);
    }
    setContactData({
      id: 0,
      email: '',
      phone: '',
      whatsapp: '',
      social: { instagram: '', facebook: '', linkedin: '', twitter: '' },
      openHours: { Sun:'', Mon:'', Tue:'', Wed:'', Thu:'', Fri:'', Sat:'' },
      addresses: ['', '', ''],
      published: false,
    });
  };

  const handleDelete = (id: number) => setContactsList(contactsList.filter(c => c.id !== id));
  const handleEdit = (id: number) => {
    const contact = contactsList.find(c => c.id === id);
    if(contact){
      setContactData(contact);
      setEditId(id);
    }
  };
  const togglePublish = (id: number) => {
    setContactsList(
      contactsList.map(c => c.id === id ? { ...c, published: !c.published } : c)
    );
  };

  return (
    <div className="ContactManagemenet-container">
      {/* Form */}
      <div className="ContactManagemenet-form-section">
        <h2 className="ContactManagemenet-heading">{editId ? 'Edit Contact' : 'Add Contact'}</h2>
        <form onSubmit={handleSubmit} className="ContactManagemenet-form">
          <div className="ContactManagemenet-row">
            {['email','phone','whatsapp'].map((field,index)=>(
              <div key={index} className="ContactManagemenet-item">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={contactData[field as keyof Contact] as string}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  maxLength={field !== 'email' ? 10 : undefined}
                  required={field !== 'whatsapp'}
                />
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="ContactManagemenet-box">
            <h4>Social Media Handles</h4>
            <div className="ContactManagemenet-row">
              {['instagram','facebook','linkedin','twitter'].map((field,index)=>(
                <div key={index} className="ContactManagemenet-item">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={contactData.social[field as keyof SocialLinks]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Open Hours */}
          <div className="ContactManagemenet-box">
            <h4>Open Hours</h4>
            <div className="ContactManagemenet-row">
              {days.map(day => (
                <div key={day} className="ContactManagemenet-item">
                  <label>{day}</label>
                  <div className="ContactManagemenet-timepair">
                    <input
                      type="time"
                      value={contactData.openHours[day]?.split('-')[0] || ''}
                      onChange={e => {
                        const end = contactData.openHours[day]?.split('-')[1] || '';
                        handleChange({ target: { name: day, value: `${e.target.value}-${end}` } } as ChangeEvent<HTMLInputElement>, undefined, 'openHours', day);
                      }}
                    />
                    <span className="ContactManagemenet-time-separator">to</span>
                    <input
                      type="time"
                      value={contactData.openHours[day]?.split('-')[1] || ''}
                      onChange={e => {
                        const start = contactData.openHours[day]?.split('-')[0] || '';
                        handleChange({ target: { name: day, value: `${start}-${e.target.value}` } } as ChangeEvent<HTMLInputElement>, undefined, 'openHours', day);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="ContactManagemenet-box">
            <h4>Addresses</h4>
            {contactData.addresses.map((addr,i)=>(
              <input
                key={i}
                type="text"
                value={addr}
                placeholder={`Address ${i+1}`}
                onChange={e=>handleChange(e,i,'addresses')}
              />
            ))}
          </div>

          <button type="submit" className="ContactManagemenet-submit-btn">
            {editId ? 'Update Contact' : 'Add Contact'}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="ContactManagemenet-table-section">
        <h2 className="ContactManagemenet-heading">Contacts List</h2>
        <div className="ContactManagemenet-table-wrapper">
          <table className="ContactManagemenet-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Email</th>
                <th>Phone</th>
                <th>WhatsApp</th>
                <th>Social</th>
                <th>Open Hours</th>
                <th>Addresses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactsList.map((c,index)=>(
                <tr key={c.id}>
                  <td>{index+1}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.whatsapp}</td>
                  <td>
                    <div className="ContactManagemenet-socials">
                      {Object.entries(c.social).map(([key,val])=>val && <span key={key}>{key.toUpperCase()}: {val}</span>)}
                    </div>
                  </td>
                  <td>
                    <div className="ContactManagemenet-openhours">
                      {Object.entries(c.openHours).map(([day,val])=><span key={day}>{day}: {val||'-'}</span>)}
                    </div>
                  </td>
                  <td>{c.addresses.filter(a=>a).join(' | ')}</td>
                  <td className="ContactManagemenet-actions">
                    <button
                      onClick={()=>togglePublish(c.id)}
                      className={`ContactManagemenet-publish-btn ${c.published ? 'published' : 'unpublished'}`}
                    >
                      {c.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={()=>handleEdit(c.id)} className="ContactManagemenet-edit-btn">Edit</button>
                    <button onClick={()=>handleDelete(c.id)} className="ContactManagemenet-delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactManagemenet;
