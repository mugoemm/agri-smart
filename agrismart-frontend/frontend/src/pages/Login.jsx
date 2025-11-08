import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    name: "",
    role: "farmer",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate password length
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    // Validate email or phone is provided for login
    if (!isSignup && !form.email && !form.phone) {
      setError("Please enter your email or phone number");
      return;
    }
    
    setLoading(true);

    try {
      if (isSignup) {
        await register({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          role: form.role,
        });
        setIsSignup(false);
        setError("Registration successful! Please login.");
      } else {
        const loginData = {
          password: form.password,
        };
        if (form.email) loginData.email = form.email;
        if (form.phone) loginData.phone = form.phone;

        console.log("Attempting login with:", loginData);
        const result = await login(loginData);
        console.log("Login result:", result);
        
        // Auto-redirect based on role
        if (result.role) {
          if (result.role === "farmer") {
            navigate("/farmer/dashboard");
          } else if (result.role === "buyer") {
            navigate("/buyer/dashboard");
          } else if (result.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        } else {
          // No role assigned, go to home to select
          navigate("/home");
        }
      }
    } catch (err) {
      console.error("Login/Register error:", err);
      console.error("Error response:", err.response);
      
      let errorMessage = "Authentication failed. Please try again.";
      
      if (err.response?.data) {
        // Backend sent an error message
        errorMessage = err.response.data.msg || err.response.data.message || errorMessage;
      } else if (err.message) {
        // Network or other error
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="w-full max-w-md">
        {/* Logo - Non-clickable on login page */}
        <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-3xl mb-8">
          <Leaf className="w-8 h-8" />
          <span>AgriSmart</span>
        </div>

        {/* Form Card */}
        <div className="bg-white border rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            {isSignup ? "Join AgriSmart as a Farmer or Buyer" : "Login to access your dashboard"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Enter your full name"
                  required={isSignup}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="your@email.com"
                required={!form.phone}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone {!isSignup && "(or use email)"}
              </label>
              <Input
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="+254 700 000 000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                minLength={6}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
                <select
                  value={form.role}
                  onChange={handleChange("role")}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="farmer">Farmer</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>
            )}

            {error && (
              <p className={`text-sm ${error.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="text-sm text-green-700 hover:underline"
            >
              {isSignup ? "Already have an account? Login" : "New to AgriSmart? Create account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
