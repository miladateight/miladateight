export function localize(value, language, fallback = "en") {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] || value[fallback] || Object.values(value).find(Boolean) || "";
}

export function localizedList(value, language, fallback = "en") {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[language] || value[fallback] || [];
}
