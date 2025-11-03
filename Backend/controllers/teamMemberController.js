const TeamMember = require("../models/TeamMember");
const fs = require("fs-extra");
const path = require("path");

// ✅ CREATE new team member
exports.createTeamMember = async (req, res, next) => {
  try {
    const {
      name,
      designation,
      experience,
      instagram,
      facebook,
      twitter,
      whatsapp,
      phone,
      email,
    } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ message: "Name and designation are required." });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // ✅ this is now the WebP version
    }

    const teamMember = await TeamMember.create({
      name,
      designation,
      experience,
      instagram,
      facebook,
      twitter,
      whatsapp,
      phone,
      email,
      imageUrl,
    });

    res.status(201).json({ success: true, data: teamMember });
  } catch (err) {
    console.error("❌ Error creating team member:", err);
    next(err);
  }
};


// ✅ GET all team members
exports.getAllTeamMembers = async (req, res, next) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

// ✅ GET single team member
exports.getTeamMember = async (req, res, next) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE team member
exports.updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      designation,
      experience,
      instagram,
      facebook,
      twitter,
      whatsapp,
      phone,
      email,
    } = req.body;

    const member = await TeamMember.findById(id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    // ✅ Delete old image if a new one is uploaded
    if (req.file) {
      if (member.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", member.imageUrl);
        if (await fs.pathExists(oldImagePath)) {
          await fs.remove(oldImagePath);
        }
      }
      member.imageUrl = `/uploads/${req.file.filename}`;
    }

    member.name = name || member.name;
    member.designation = designation || member.designation;
    member.experience = experience || member.experience;
    member.instagram = instagram || member.instagram;
    member.facebook = facebook || member.facebook;
    member.twitter = twitter || member.twitter;
    member.whatsapp = whatsapp || member.whatsapp;
    member.phone = phone || member.phone;
    member.email = email || member.email;

    await member.save();
    res.status(200).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE team member
exports.deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findById(id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    // Remove image from server
    if (member.imageUrl) {
      const imagePath = path.join(__dirname, "..", member.imageUrl);
      if (await fs.pathExists(imagePath)) {
        await fs.remove(imagePath);
      }
    }

    await member.deleteOne();
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ✅ TOGGLE Publish/Unpublish
exports.togglePublish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findById(id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    member.published = !member.published;
    await member.save();

    res.status(200).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};
