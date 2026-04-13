// lib/utils.js - Shared utility functions

// Format date to Indian format
export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("mr-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export const formatDateEn = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

// Days remaining
export const daysLeft = (dateStr) => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Category color map
export const categoryColors = {
  MPSC: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-600" },
  UPSC: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", badge: "bg-purple-600" },
  Railway: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", badge: "bg-orange-600" },
  Bank: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", badge: "bg-green-600" },
  Police: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", badge: "bg-red-700" },
  SSC: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", badge: "bg-yellow-600" },
  ZP: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", badge: "bg-teal-600" },
  NMK: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", badge: "bg-indigo-600" },
};

export const getCategoryColor = (cat) =>
  categoryColors[cat] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", badge: "bg-gray-600" };

// Number formatter (Indian style)
export const formatNumber = (n) => {
  if (!n) return "0";
  return parseInt(n).toLocaleString("en-IN");
};

// Truncate text
export const truncate = (str, n = 120) =>
  str?.length > n ? str.slice(0, n) + "..." : str;

// Generate slug from title
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
