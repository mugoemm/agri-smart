import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    
    console.log("Registration attempt:", { name, email, phone, role });
    
    // Validate required fields
    if (!name || !password || !role) {
      return res.status(400).json({ message: "Name, password, and role are required" });
    }
    
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    // Trim and validate email/phone
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();
    
    if (!trimmedEmail && !trimmedPhone) {
      return res.status(400).json({ message: "Email or phone is required" });
    }

    // Check if user already exists (by email or phone)
    let exists = null;
    if (trimmedEmail) {
      exists = await User.findOne({ email: trimmedEmail });
      if (exists) return res.status(409).json({ message: "Email already registered" });
    }
    if (trimmedPhone) {
      exists = await User.findOne({ phone: trimmedPhone });
      if (exists) return res.status(409).json({ message: "Phone number already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Only include email/phone if they have values (avoid empty strings for sparse indexes)
    const userData = { 
      name: name.trim(), 
      role, 
      passwordHash 
    };
    
    if (trimmedEmail) userData.email = trimmedEmail;
    if (trimmedPhone) userData.phone = trimmedPhone;

    const user = await User.create(userData);
    
    console.log("User registered successfully:", user.email || user.phone);
    
    res.status(201).json({ 
      message: "User registered successfully", 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    
    console.log("Login attempt:", { email, phone, hasPassword: !!password });
    
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone is required" });
    }
    
    // Find user by email or phone
    let user = null;
    if (email && email.trim()) {
      console.log("Searching by email:", email);
      user = await User.findOne({ email: email.trim() });
    } else if (phone && phone.trim()) {
      console.log("Searching by phone:", phone);
      user = await User.findOne({ phone: phone.trim() });
    }
    
    console.log("User found:", user ? user.email || user.phone : "NOT FOUND");
    
    if (!user) {
      return res.status(404).json({ message: "User not found. Please check your credentials." });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    console.log("Password match:", match);
    
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      role: user.role
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.id).select("-passwordHash");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
    
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};
