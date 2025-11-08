import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // Optional, but unique if provided
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["farmer", "buyer"], required: true },
  phone: { type: String, unique: true, sparse: true }, // Optional, but unique if provided
}, { timestamps: true });

// Ensure at least email or phone is provided
userSchema.pre('validate', function(next) {
  // Treat empty strings as falsy
  const hasEmail = this.email && this.email.trim() !== '';
  const hasPhone = this.phone && this.phone.trim() !== '';
  
  if (!hasEmail && !hasPhone) {
    next(new Error('Either email or phone must be provided'));
  } else {
    next();
  }
});

export default mongoose.model("User", userSchema);
