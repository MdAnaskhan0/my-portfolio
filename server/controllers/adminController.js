import adminModel from '../models/adminModel.js';
import jwt from 'jsonwebtoken';

export const createAdmin = async (req, res) => {
  try {
    const adminData = new adminModel(req.body);
    const { email } = adminData;
    const adminExists = await adminModel.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const savedAdmin = await adminData.save();
    res.status(201).json({ message: "Admin created successfully", savedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin found", admin });
  } catch (error) {
    res.status(500).json({ message: "Error getting admin" });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const updatedAdmin = await adminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin" });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const deletedAdmin = await adminModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Admin deleted successfully", deletedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin" });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const admin = await adminModel.find();
    res.status(200).json({ message: "All admin found", admin });
  } catch (error) {
    res.status(500).json({ message: "Error getting all admin" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "secret123"
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in admin" });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET || "secret123", (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging out admin" });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET || "secret123", async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const admin = await adminModel.findById(decoded.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json({ message: "Admin profile found", admin });
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting admin profile" });
  }
};
