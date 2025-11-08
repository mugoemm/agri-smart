import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth on mount - check for existing token
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const currentUser = await AuthAPI.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          // Check if user has role in their data, otherwise check localStorage
          const userRole = currentUser.role || localStorage.getItem("userRole");
          setRole(userRole);
        }
      } catch (error) {
        console.error("Auth init failed:", error);
        // Clear invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // Login function - accepts email or phone
  const login = async (credentials) => {
    try {
      // credentials can be { email, password } or { phone, password }
      const data = await AuthAPI.login(credentials);
      
      // Store user and token (token is already stored in AuthAPI.login)
      const userData = data.user || { 
        _id: "temp-id", 
        name: credentials.name || "User", 
        email: credentials.email || credentials.phone,
        role: data.role
      };
      
      setUser(userData);
      
      // Set role from response or localStorage
      const userRole = data.user?.role || data.role || null;
      setRole(userRole);
      
      if (userRole) {
        localStorage.setItem("userRole", userRole);
      }
      
      return { success: true, user: userData, role: userRole };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Register function
  const register = async (payload) => {
    try {
      const data = await AuthAPI.register(payload);
      
      // Don't auto-login after registration, let user log in
      return { success: true, message: "Registration successful! Please log in." };
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUser(null);
    setRole(null);
    navigate("/");
  };

  // Select role and navigate to appropriate dashboard
  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    
    // Navigate based on role
    if (selectedRole === "farmer") {
      navigate("/farmer/dashboard");
    } else if (selectedRole === "buyer") {
      navigate("/buyer/dashboard");
    } else if (selectedRole === "admin") {
      navigate("/admin");
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        role, 
        loading, 
        login, 
        register, 
        logout, 
        selectRole,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
