// src/lib/api.js
import axios from "axios";

// Base API URL
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance
const client = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// ===========================
// 🔐 Auth Endpoints
// ===========================
export const AuthAPI = {
  register: async (userData) => {
    const res = await client.post("/api/auth/register", userData);
    return res.data;
  },

  login: async (credentials) => {
    const res = await client.post("/api/auth/login", credentials);
    const { token } = res.data || {};
    if (token) localStorage.setItem("token", token);
    return res.data;
  },

  getCurrentUser: async () => {
    const token = getToken();
    if (!token) return null;
    
    try {
      const res = await client.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error("Get current user error:", error);
      // Clear invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return null;
    }
  },
};

// ===========================
// 🌾 Listings Endpoints
// ===========================
export const ListingsAPI = {
  listAll: async () => {
    const res = await client.get("/api/listings");
    return res.data;
  },

  getOne: async (id) => {
    const res = await client.get(`/api/listings/${id}`);
    return res.data;
  },

  create: async (listingData, token = getToken()) => {
    const res = await client.post("/api/listings", listingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  update: async (id, listingData, token = getToken()) => {
    const res = await client.put(`/api/listings/${id}`, listingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  delete: async (id, token = getToken()) => {
    const res = await client.delete(`/api/listings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

// ===========================
// 🗒️ Notes (local-only demo)
// ===========================
export const NotesAPI = {
  list: async (userId) => {
    const key = `notes:${userId}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  },
  create: async (note, userId = import.meta.env.VITE_FAKE_USER_ID || "demo") => {
    const key = `notes:${userId}`;
    const list = await NotesAPI.list(userId);
    const newNote = { ...note, _id: crypto.randomUUID(), createdAt: Date.now() };
    localStorage.setItem(key, JSON.stringify([newNote, ...list]));
    return newNote;
  },
  update: async (id, note, userId = import.meta.env.VITE_FAKE_USER_ID || "demo") => {
    const key = `notes:${userId}`;
    const list = await NotesAPI.list(userId);
    const next = list.map((n) => (n._id === id ? { ...n, ...note } : n));
    localStorage.setItem(key, JSON.stringify(next));
    return { ok: true };
  },
  delete: async (id, userId = import.meta.env.VITE_FAKE_USER_ID || "demo") => {
    const key = `notes:${userId}`;
    const list = await NotesAPI.list(userId);
    const next = list.filter((n) => n._id !== id);
    localStorage.setItem(key, JSON.stringify(next));
    return { ok: true };
  },
};

// ===========================
// 💰 Price Endpoints
// ===========================
export const PriceAPI = {
  insights: async () => {
    const res = await client.get("/api/prices");
    return res.data;
  },
};

// ===========================
// Export client (optional)
// ===========================
export default client;

/// <reference types="vite/client" />
