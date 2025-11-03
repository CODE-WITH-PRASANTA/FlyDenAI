const Contact = require("../models/Contact");

// ✅ Create Contact
exports.createContact = async (req, res, next) => {
  try {
    const { email, phone, whatsapp, social, openHours, addresses } = req.body;

    if (!email || !phone)
      return res.status(400).json({ message: "Email and phone are required." });

    const contact = await Contact.create({
      email,
      phone,
      whatsapp,
      social,
      openHours,
      addresses,
      published: false,
    });

    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    console.error("❌ Create Contact Error:", err);
    next(err);
  }
};

// ✅ Get All Contacts
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Single Contact
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// ✅ Update Contact
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const {
      email,
      phone,
      whatsapp,
      social,
      openHours,
      addresses,
      published,
    } = req.body;

    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.whatsapp = whatsapp || contact.whatsapp;
    contact.social = social || contact.social;
    contact.openHours = openHours || contact.openHours;
    contact.addresses = addresses || contact.addresses;
    if (published !== undefined) contact.published = published;

    await contact.save();
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    console.error("❌ Update Contact Error:", err);
    next(err);
  }
};

// ✅ Toggle Publish
exports.togglePublish = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    contact.published = !contact.published;
    await contact.save();

    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// ✅ Delete Contact
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.deleteOne();
    res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (err) {
    console.error("❌ Delete Contact Error:", err);
    next(err);
  }
};
