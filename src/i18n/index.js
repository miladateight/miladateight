const LANG_KEY = "at8:lang";
const LANGUAGES = ["en", "fa", "ar", "de"];

// Timezones mapped to a supported language. Used only as a fallback signal when
// the browser's language list has no match. Timezone reflects the device's OS
// setting, not the network path, so unlike IP geolocation it stays accurate
// even when the visitor is on a VPN.
const TIMEZONE_LANGUAGE_MAP = {
  "Asia/Tehran": "fa",
  "Asia/Kabul": "fa",
  "Asia/Riyadh": "ar",
  "Asia/Dubai": "ar",
  "Asia/Qatar": "ar",
  "Asia/Kuwait": "ar",
  "Asia/Bahrain": "ar",
  "Asia/Muscat": "ar",
  "Asia/Aden": "ar",
  "Asia/Baghdad": "ar",
  "Asia/Amman": "ar",
  "Asia/Beirut": "ar",
  "Asia/Damascus": "ar",
  "Asia/Gaza": "ar",
  "Asia/Hebron": "ar",
  "Africa/Cairo": "ar",
  "Africa/Tripoli": "ar",
  "Africa/Tunis": "ar",
  "Africa/Algiers": "ar",
  "Africa/Casablanca": "ar",
  "Africa/Khartoum": "ar",
  "Europe/Berlin": "de",
  "Europe/Vienna": "de",
  "Europe/Zurich": "de",
  "Europe/Luxembourg": "de",
  "Europe/Busingen": "de"
};

function detectFromBrowserLanguages() {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const code = candidate?.slice(0, 2).toLowerCase();
    if (code && LANGUAGES.includes(code)) return code;
  }
  return null;
}

function detectFromTimezone() {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TIMEZONE_LANGUAGE_MAP[zone] || null;
}

export function getInitialLanguage() {
  try {
    const queryLang = new URLSearchParams(window.location.search).get("lang");
    if (queryLang && LANGUAGES.includes(queryLang)) return queryLang;

    const saved = localStorage.getItem(LANG_KEY);
    if (saved && LANGUAGES.includes(saved)) return saved;

    const browserLang = detectFromBrowserLanguages();
    if (browserLang) return browserLang;

    const timezoneLang = detectFromTimezone();
    if (timezoneLang) return timezoneLang;
  } catch {}
  return "en";
}

export function saveLanguage(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

export { LANGUAGES };

export const translations = {
  en: {
    label: "English",
    dir: "ltr",
    nav: ["Home", "About", "Projects", "Contact"],
    heroKicker: "Milad Ateight \u00B7 IT Specialist",
    headline: "Infrastructure, networks, and systems that stay reliable in production.",
    intro: "I design, run, and troubleshoot the infrastructure behind real businesses: networks, servers, web and mail systems, and the tools that keep them maintainable.",
    primary: "Browse projects",
    secondary: "About me",
    specialties: ["Networking & MikroTik", "Linux & Servers", "Infrastructure & DevOps", "Web & Development"],
    projectMenu: "Projects",
    projectMenuLead: "Live project pages and source repositories.",
    projectsTitle: "Projects",
    projectsLead: "Tools and case studies I have built, each with its own page.",
    viewProject: "View project",
    methodTitle: "How I work",
    method: [
      ["Discover", "Start from symptoms and constraints. Find the real failure path before changing anything."],
      ["Architect", "Design the smallest useful fix, with rollback in mind and clear visibility into the result."],
      ["Build", "Implement with precision. Document what changed and why at every step."],
      ["Verify", "Test under real conditions. Confirm the fix holds before calling it done."],
      ["Ship", "Deploy with confidence. Leave a clear record for the next person."],
      ["Improve", "Monitor, learn, and refine. Every fix is a chance to make the system stronger."]
    ],
    identityTitle: "About me",
    identityLead: "I focus on understanding the real problem, reading the infrastructure correctly, and shipping fixes that hold up under load.",
    identityCards: [
      ["Core role", "IT Specialist focused on infrastructure, networks, server operations, and web/mail systems."],
      ["Operating style", "Methodical and documented, with a preference for solutions that are easy to explain and maintain."],
      ["Direction", "Building deeper DevOps and cloud skills on top of a solid operational foundation."]
    ],
    contactTitle: "Let\u2019s talk",
    contactLead: "For collaboration, project reviews, or infrastructure work, these are the best ways to reach me.",
    contactButton: "Message on Telegram",
    footer: "Built with React, Vite, and Canvas",
    heroSubtitle: "IT Specialist \u2014 Infrastructure, Networks, Web & Mail Systems",
    projectsList: "All projects",
    sourceCode: "Source code",
    backHome: "Back to home",
    problemLabel: "The problem",
    solutionLabel: "The solution",
    featuresLabel: "Features",
    workflowLabel: "How it works",
    downloadsLabel: "Downloads",
    editionsLabel: "Editions",
    plansLabel: "Plans",
    screenshotsLabel: "Screenshots",
    specialtiesTitle: "Areas of expertise",
    specialtiesLead: "IT operations, network infrastructure, server administration, and everything in between."
  },
  fa: {
    label: "\u0641\u0627\u0631\u0633\u06CC",
    dir: "rtl",
    nav: ["\u062E\u0627\u0646\u0647", "\u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0646", "\u067E\u0631\u0648\u0698\u0647\u200C\u0647\u0627", "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0646"],
    heroKicker: "Milad Ateight \u00B7 \u06A9\u0627\u0631\u0634\u0646\u0627\u0633 IT",
    headline: "\u0632\u06CC\u0631\u0633\u0627\u062E\u062A\u060C \u0634\u0628\u06A9\u0647 \u0648 \u0633\u06CC\u0633\u062A\u0645\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062F\u0631 \u0645\u062D\u06CC\u0637 \u0648\u0627\u0642\u0639\u06CC \u067E\u0627\u06CC\u062F\u0627\u0631 \u0645\u06CC\u200C\u0645\u0627\u0646\u0646\u062F.",
    intro: "\u0632\u06CC\u0631\u0633\u0627\u062E\u062A \u06A9\u0633\u0628\u200C\u0648\u06A9\u0627\u0631\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0631\u0627 \u0637\u0631\u0627\u062D\u06CC\u060C \u0627\u062C\u0631\u0627 \u0648 \u0639\u06CC\u0628\u200C\u06CC\u0627\u0628\u06CC \u0645\u06CC\u200C\u06A9\u0646\u0645 \u0627\u0632 \u0634\u0628\u06A9\u0647 \u0648 \u0633\u0631\u0648\u0631 \u062A\u0627 \u0633\u06CC\u0633\u062A\u0645\u200C\u0647\u0627\u06CC \u0648\u0628 \u0648 \u0627\u06CC\u0645\u06CC\u0644 \u0648 \u0627\u0628\u0632\u0627\u0631\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC \u0622\u0646\u200C\u0647\u0627 \u0631\u0627 \u0622\u0633\u0627\u0646 \u0645\u06CC\u200C\u06A9\u0646\u0646\u062F.",
    primary: "\u062F\u06CC\u062F\u0646 \u067E\u0631\u0648\u0698\u0647\u200C\u0647\u0627",
    secondary: "\u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0646",
    specialties: ["\u0634\u0628\u06A9\u0647 \u0648 MikroTik", "Linux \u0648 \u0633\u0631\u0648\u0631", "\u0632\u06CC\u0631\u0633\u0627\u062E\u062A \u0648 DevOps", "\u0648\u0628 \u0648 \u062A\u0648\u0633\u0639\u0647"],
    projectMenu: "\u067E\u0631\u0648\u0698\u0647\u200C\u0647\u0627",
    projectMenuLead: "\u0635\u0641\u062D\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644 \u067E\u0631\u0648\u0698\u0647\u200C\u0647\u0627 \u0648 \u0631\u06CC\u067E\u0627\u0632\u06CC\u062A\u0648\u0631\u06CC\u200C\u0647\u0627\u06CC \u0627\u0635\u0644\u06CC.",
    projectsTitle: "\u067E\u0631\u0648\u0698\u0647\u200C\u0647\u0627",
    projectsLead: "\u0627\u0628\u0632\u0627\u0631\u0647\u0627 \u0648 \u0645\u0637\u0627\u0644\u0639\u0627\u062A \u0645\u0648\u0631\u062F\u06CC \u06A9\u0647 \u0633\u0627\u062E\u062A\u0647 \u0648 \u0645\u0646\u062A\u0634\u0631 \u06A9\u0631\u062F\u0647\u200C\u0627\u0645\u060C \u0647\u0631\u06A9\u062F\u0627\u0645 \u0628\u0627 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u062E\u062A\u0635\u0627\u0635\u06CC \u062E\u0648\u062F\u0634.",
    viewProject: "\u0645\u0634\u0627\u0647\u062F\u0647 \u067E\u0631\u0648\u0698\u0647",
    methodTitle: "\u0631\u0648\u0634 \u06A9\u0627\u0631",
    method: [
      ["\u06A9\u0634\u0641", "\u0627\u0632 \u0646\u0634\u0627\u0646\u0647\u200C\u0647\u0627 \u0648 \u0645\u062D\u062F\u0648\u062F\u06CC\u062A\u200C\u0647\u0627 \u0634\u0631\u0648\u0639 \u06A9\u0646\u06CC\u062F. \u0645\u0633\u06CC\u0631 \u0648\u0627\u0642\u0639\u06CC \u062E\u0637\u0627 \u0631\u0627 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u062F."],
      ["\u0645\u0647\u0646\u062F\u0633\u06CC", "\u06A9\u0648\u0686\u06A9\u200C\u062A\u0631\u06CC\u0646 \u0627\u0635\u0644\u0627\u062D \u0645\u0641\u06CC\u062F \u0631\u0627 \u0628\u0627 \u062A\u0648\u062C\u0647 \u0628\u0647 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648 \u062F\u06CC\u062F \u0631\u0648\u0634\u0646 \u0646\u0633\u0628\u062A \u0628\u0647 \u0646\u062A\u06CC\u062C\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u06A9\u0646\u0645."],
      ["\u0627\u062C\u0631\u0627", "\u0628\u0627 \u062F\u0642\u062A \u0648 \u062F\u0648\u0631\u0647 \u0627\u062C\u0631\u0627 \u06A9\u0646\u06CC\u062F. \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u0631\u0627 \u062F\u0631 \u0647\u0631 \u0642\u062F\u0645 \u062A\u0648\u0636\u06CC\u062D \u06A9\u0646\u06CC\u062F."],
      ["\u062A\u0635\u062F\u06CC\u0642", "\u062F\u0631 \u0634\u0631\u0627\u06CC\u0637 \u0648\u0627\u0642\u0639\u06CC \u062A\u0633\u062A \u06A9\u0646\u06CC\u062F. \u062A\u0623\u0645\u06CC\u062F \u06A9\u0646\u06CC\u062F \u062E\u0637\u0627 \u0627\u0635\u0644\u0627\u062D \u06A9\u0631\u062F\u0647 \u0627\u0633\u062A."],
      ["\u0627\u0631\u0633\u0627\u0644", "\u0628\u0627 \u0627\u0637\u0645\u06CC\u0646\u0627\u0639 \u0627\u0631\u0633\u0627\u0644 \u06A9\u0646\u06CC\u062F. \u0631\u06A9\u0648\u0631\u062F \u0631\u0648\u0634\u0646 \u0628\u0631\u0627\u06CC \u0646\u0641\u0631 \u0628\u06AF\u0630\u0627\u0631\u0645."],
      ["\u0628\u0647\u0628\u0648\u062F", "\u0646\u0638\u0627\u0631\u062A \u0628\u06AF\u06CC\u0631\u06CC\u062F\u060C \u06CC\u0627\u062F \u0628\u06AF\u06CC\u0631\u06CC\u062F \u0648 \u062A\u062D\u0635\u06CC\u0644. \u0647\u0631 \u0627\u0635\u0644\u0627\u062D \u06CC\u06A9 \u0642\u0631\u0627\u0631 \u0628\u0631\u0627\u06CC \u0642\u0648\u06CC\u062A\u0645 \u0633\u06CC\u0633\u062A\u0645 \u0627\u0633\u062A."]
    ],
    identityTitle: "\u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0646",
    identityLead: "\u062A\u0645\u0631\u06A9\u0632 \u0645\u0646 \u0631\u0648\u06CC \u0641\u0647\u0645 \u062F\u0631\u0633\u062A \u0645\u0633\u0626\u0644\u0647\u060C \u062E\u0648\u0627\u0646\u062F\u0646 \u0635\u062D\u06CC\u062D \u0632\u06CC\u0631\u0633\u0627\u062E\u062A \u0648 \u062A\u062D\u0648\u06CC\u0644 \u0631\u0627\u0647\u200C\u062D\u0644\u06CC \u0627\u0633\u062A \u06A9\u0647 \u0632\u06CC\u0631 \u0641\u0634\u0627\u0631 \u0648\u0627\u0642\u0639\u06CC \u0647\u0645 \u06A9\u0627\u0631 \u06A9\u0646\u062F.",
    identityCards: [
      ["\u0646\u0642\u0634 \u0627\u0635\u0644\u06CC", "\u06A9\u0627\u0631\u0634\u0646\u0627\u0633 IT \u0628\u0627 \u062A\u0645\u0631\u06A9\u0632 \u0631\u0648\u06CC \u0632\u06CC\u0631\u0633\u0627\u062E\u062A\u060C \u0634\u0628\u06A9\u0647\u060C \u0639\u0645\u0644\u06CC\u0627\u062A \u0633\u0631\u0648\u0631 \u0648 \u0633\u06CC\u0633\u062A\u0645\u200C\u0647\u0627\u06CC \u0648\u0628 \u0648 \u0627\u06CC\u0645\u06CC\u0644."],
      ["\u0633\u0628\u06A9 \u06A9\u0627\u0631", "\u062F\u0642\u06CC\u0642 \u0648 \u0645\u0633\u062A\u0646\u062F\u060C \u0628\u0627 \u06AF\u0631\u0627\u06CC\u0634 \u0628\u0647 \u0631\u0627\u0647\u200C\u062D\u0644\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062A\u0648\u0636\u06CC\u062D\u200C\u062F\u0627\u062F\u0646 \u0648 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC\u200C\u0634\u0627\u0646 \u0633\u0627\u062F\u0647 \u0628\u0627\u0634\u062F."],
      ["\u0645\u0633\u06CC\u0631 \u0631\u0634\u062F", "\u062A\u0642\u0648\u06CC\u062A \u0645\u0647\u0627\u0631\u062A\u200C\u0647\u0627\u06CC DevOps \u0648 Cloud \u0631\u0648\u06CC \u067E\u0627\u06CC\u0647\u200C \u0645\u062D\u06A9\u0645 \u0639\u0645\u0644\u06CC\u0627\u062A \u0648\u0627\u0642\u0639\u06CC."]
    ],
    contactTitle: "\u0628\u06CC\u0627\u06CC\u06CC\u062F \u0635\u062D\u0628\u062A \u06A9\u0646\u06CC\u0645",
    contactLead: "\u0628\u0631\u0627\u06CC \u0647\u0645\u06A9\u0627\u0631\u06CC\u060C \u0628\u0631\u0631\u0633\u06CC \u067E\u0631\u0648\u0698\u0647 \u06CC\u0627 \u06A9\u0627\u0631 \u0632\u06CC\u0631\u0633\u0627\u062E\u062A\u06CC\u060C \u0627\u06CC\u0646 \u0645\u0633\u06CC\u0631\u0647\u0627 \u0628\u0647\u062A\u0631\u06CC\u0646 \u0631\u0627\u0647 \u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0645\u0646 \u0647\u0633\u062A\u0646\u062F.",
    contactButton: "\u067E\u06CC\u0627\u0645 \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645",
    footer: "\u0633\u0627\u062E\u062A\u0647\u200C\u0634\u062F\u0647 \u0628\u0627 React\u060C Vite \u0648 Canvas",
    heroSubtitle: "\u06A9\u0627\u0631\u0634\u0646\u0627\u0633 IT \u2014 \u0632\u06CC\u0631\u0633\u0627\u062E\u062A\u060C \u0634\u0628\u06A9\u0647\u060C \u0648\u0628 \u0648 \u0627\u06CC\u0645\u06CC\u0644",
    projectsList: "\u0647\u0645\u0647 \u067E\u0631\u0648\u0698\u0647\u200C\u0647\u0627",
    sourceCode: "\u0633\u0648\u0631\u0633 \u06A9\u062F",
    backHome: "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u062E\u0627\u0646\u0647",
    problemLabel: "\u0645\u0633\u0626\u0644\u0647",
    solutionLabel: "\u0631\u0627\u0647\u200C\u062D\u0644",
    featuresLabel: "\u0642\u0627\u0628\u0644\u06CC\u062A\u200C\u0647\u0627",
    workflowLabel: "\u0631\u0648\u0646\u062F \u06A9\u0627\u0631",
    downloadsLabel: "\u062F\u0627\u0646\u0644\u0648\u062F",
    editionsLabel: "\u0646\u0633\u062E\u0647\u200C\u0647\u0627",
    plansLabel: "\u067E\u0644\u0646\u200C\u0647\u0627",
    screenshotsLabel: "\u062A\u0635\u0627\u0648\u06CC\u0631",
    specialtiesTitle: "\u062D\u0648\u0632\u0647\u200C\u0647\u0627\u06CC \u062A\u062E\u0635\u0635\u06CC",
    specialtiesLead: "\u0632\u06CC\u0631\u0633\u0627\u062E\u062A \u0634\u0628\u06A9\u0647\u060C \u0639\u0645\u0644\u06CC\u0627\u062A \u0633\u0631\u0648\u0631 \u0648 \u0647\u0631\u0686\u0647 \u062F\u0631 \u0645\u06CC\u0627\u0646 \u0627\u0633\u062A."
  },
  ar: {
    label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    dir: "rtl",
    nav: ["\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629", "\u0645\u0646 \u0623\u0646\u0627", "\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639", "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u064A"],
    heroKicker: "Milad Ateight \u00B7 \u0623\u062E\u0635\u0627\u0626\u064A \u062A\u0642\u0646\u064A",
    headline: "\u0628\u0646\u064A\u0629 \u062A\u062D\u062A\u064A\u0629 \u0648\u0634\u0628\u0643\u0627\u062A \u0648\u0623\u0646\u0638\u0645\u0629 \u062A\u0628\u0642\u0649 \u0645\u0633\u062A\u0642\u0631\u0629 \u0641\u064A \u0628\u064A\u0626\u0629 \u0627\u0644\u0625\u0646\u062A\u0627\u062C.",
    intro: "\u0623\u0635\u0645\u0645 \u0648\u0623\u0634\u063A\u0651\u0644 \u0648\u0623\u0639\u0627\u0644\u062C \u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0644\u0623\u0639\u0645\u0627\u0644 \u062D\u0642\u064A\u0642\u064A\u0629: \u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0648\u0627\u0644\u062E\u0648\u0627\u062F\u0645 \u0648\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0648\u064A\u0628 \u0648\u0627\u0644\u0628\u0631\u064A\u062F\u060C \u0648\u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0633\u0647\u0651\u0644 \u0635\u064A\u0627\u0646\u062A\u0647\u0627.",
    primary: "\u0627\u0633\u062A\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639",
    secondary: "\u0645\u0646 \u0623\u0646\u0627",
    specialties: ["\u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0648 MikroTik", "Linux \u0648\u0627\u0644\u062E\u0648\u0627\u062F\u0645", "\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0648 DevOps", "\u0627\u0644\u0648\u064A\u0628 \u0648\u0627\u0644\u062A\u0637\u0648\u064A\u0631"],
    projectMenu: "\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639",
    projectMenuLead: "\u0635\u0641\u062D\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629 \u0648\u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629.",
    projectsTitle: "\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639",
    projectsLead: "\u0623\u062F\u0648\u0627\u062A \u0648\u062F\u0631\u0627\u0633\u0627\u062A \u062D\u0627\u0644\u0629 \u0642\u0645\u062A \u0628\u0628\u0646\u0627\u0626\u0647\u0627 \u0648\u0646\u0634\u0631\u0647\u0627\u060C \u0644\u0643\u0644 \u0645\u0646\u0647\u0627 \u0635\u0641\u062D\u062A\u0647 \u0627\u0644\u062E\u0627\u0635\u0629.",
    viewProject: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    methodTitle: "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0639\u0645\u0644",
    method: [
      ["\u0627\u0644\u062A\u0634\u062E\u064A\u0635", "\u0627\u0628\u062F\u0623 \u0645\u0646 \u0627\u0644\u0623\u0639\u0631\u0627\u0636 \u0648\u0627\u0644\u0642\u064A\u0648\u062F. \u0627\u0643\u062A\u0634\u0641 \u0645\u0633\u0627\u0631 \u0627\u0644\u062E\u0644\u0644 \u0627\u0644\u062D\u0642\u064A\u0642\u064A \u0642\u0628\u0644 \u0623\u064A \u062A\u063A\u064A\u064A\u0631."],
      ["\u0627\u0644\u062A\u0635\u0645\u064A\u0645", "\u062A\u0635\u0645\u064A\u0645 \u0623\u0635\u063A\u0631 \u0625\u0635\u0644\u0627\u062D \u0645\u0641\u064A\u062F \u0645\u0639 \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0648\u0627\u0636\u062D \u0648\u0631\u0624\u064A\u0629 \u0643\u0627\u0645\u0644\u0629."],
      ["\u0627\u0644\u0628\u0646\u0627\u0621", "\u062A\u0646\u0641\u064A\u0630 \u0628\u062F\u0642\u0629 \u0648 \u062A\u0648\u0636\u064A\u062D. \u062A\u0633\u062C\u064A\u0644 \u0645\u0639\u0643\u0648\u0644 \u0641\u064A \u0643\u0644 \u062E\u0637\u0648\u0629."],
      ["\u0627\u0644\u062A\u062D\u0642\u0642", "\u0627\u062E\u062A\u0628\u0627\u0631 \u062A\u062D\u062A \u0627\u0644\u0634\u0631\u0627\u0637 \u0627\u0644\u0648\u0627\u0642\u0639\u064A. \u0627\u0644\u062A\u0623\u0643\u064A\u062F \u0623\u0646 \u0627\u0644\u0625\u0635\u0644\u0627\u062D \u064A\u0635\u0645\u062F."],
      ["\u0627\u0644\u062A\u0631\u0633\u064A\u0644", "\u062A\u0631\u0633\u064A\u0644 \u0628\u0639\u062B\u0645\u0627\u0646. \u062A\u0631\u0643\u064A\u0632 \u0633\u062C\u0644\u0627\u064B \u0648\u0627\u0636\u062D\u0627\u064B \u0644\u0644\u0646\u0641\u0631 \u0627\u0644\u0642\u0627\u062F\u0645."],
      ["\u0627\u0644\u062A\u062D\u0635\u064A\u0644", "\u0645\u0631\u0627\u0642\u0628\u0629 \u0648\u062A\u0639\u0644\u064A\u0645 \u0648\u062A\u062D\u0635\u064A\u0644. \u0643\u0644 \u0625\u0635\u0644\u0627\u062D \u0641\u0631\u0635 \u0644\u0644\u0642\u0648\u064A\u0629."],
    ],
    identityTitle: "\u0645\u0646 \u0623\u0646\u0627",
    identityLead: "\u0623\u0631\u0643\u0651\u0632 \u0639\u0644\u0649 \u0641\u0647\u0645 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0627\u0644\u062D\u0642\u064A\u0642\u064A\u0629 \u0648\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0628\u062F\u0642\u0629 \u0648\u062A\u0633\u0644\u064A\u0645 \u062D\u0644\u0648\u0644 \u062A\u062A\u062D\u0645\u0651\u0644 \u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u0641\u0639\u0644\u064A.",
    identityCards: [
      ["\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0623\u0633\u0627\u0633\u064A", "\u0623\u062E\u0635\u0627\u0626\u064A \u062A\u0642\u0646\u064A \u064A\u0631\u0643\u0651\u0632 \u0639\u0644\u0649 \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0648\u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0648\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062E\u0648\u0627\u062F\u0645 \u0648\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0648\u064A\u0628 \u0648\u0627\u0644\u0628\u0631\u064A\u062F."],
      ["\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u0639\u0645\u0644", "\u0645\u0646\u0647\u062C\u064A \u0648\u0645\u0648\u062B\u0651\u0642\u060C \u0648\u064A\u0645\u064A\u0644 \u0625\u0644\u0649 \u062D\u0644\u0648\u0644 \u064A\u0633\u0647\u0644 \u0634\u0631\u062D\u0647\u0627 \u0648\u0635\u064A\u0627\u0646\u062A\u0647\u0627."],
      ["\u0627\u0644\u0627\u062A\u062C\u0627\u0647", "\u062A\u0639\u0645\u064A\u0642 \u0645\u0647\u0627\u0631\u0627\u062A DevOps \u0648 Cloud \u0639\u0644\u0649 \u0623\u0633\u0627\u0633 \u0645\u062A\u064A\u0646 \u0645\u0646 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062D\u0642\u064A\u0642\u064A\u0629."]
    ],
    contactTitle: "\u0644\u0646\u062A\u062D\u062F\u062B",
    contactLead: "\u0644\u0644\u062A\u0639\u0627\u0648\u0646 \u0623\u0648 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0623\u0648 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629\u060C \u0647\u0630\u0647 \u0623\u0641\u0636\u0644 \u0637\u0631\u0642 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u064A.",
    contactButton: "\u0631\u0633\u0627\u0644\u0629 \u0639\u0644\u0649 Telegram",
    footer: "\u0645\u0628\u0646\u064A \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 React \u0648 Vite \u0648 Canvas",
    heroSubtitle: "\u0623\u062E\u0635\u0627\u0626\u064A \u062A\u0642\u0646\u064A \u2014 \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629\u060C \u0627\u0644\u0634\u0628\u0643\u0627\u062A\u060C \u0627\u0644\u0648\u064A\u0628 \u0648\u0627\u0644\u0628\u0631\u064A\u062F",
    projectsList: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639",
    sourceCode: "\u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0645\u0635\u062F\u0631\u064A",
    backHome: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    problemLabel: "\u0627\u0644\u0645\u0634\u0643\u0644\u0629",
    solutionLabel: "\u0627\u0644\u062D\u0644",
    featuresLabel: "\u0627\u0644\u0645\u064A\u0632\u0627\u062A",
    workflowLabel: "\u0643\u064A\u0641\u064A\u0629 \u0627\u0644\u0639\u0645\u0644",
    downloadsLabel: "\u0627\u0644\u062A\u0646\u0632\u064A\u0644",
    editionsLabel: "\u0627\u0644\u0625\u0635\u062F\u0627\u0631\u0627\u062A",
    plansLabel: "\u0627\u0644\u0628\u0627\u0642\u0627\u062A",
    screenshotsLabel: "\u0644\u0642\u0637\u0627\u062A \u0627\u0644\u0634\u0627\u0634\u0629",
    specialtiesTitle: "\u0645\u062C\u0627\u0644\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629",
    specialtiesLead: "\u0639\u0645\u0644\u064A\u0627\u062A \u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A\u060C \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0644\u0644\u0634\u0628\u0643\u0627\u062A\u060C \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062E\u0648\u0627\u062F\u0645 \u0648\u0645\u0627 \u0628\u064A\u0646 \u0630\u0644\u0643."
  },
  de: {
    label: "Deutsch",
    dir: "ltr",
    nav: ["Home", "\u00DCber mich", "Projekte", "Kontakt"],
    heroKicker: "Milad Ateight \u00B7 IT-Spezialist",
    headline: "Infrastruktur, Netzwerke und Systeme, die im Betrieb verl\u00E4sslich bleiben.",
    intro: "Ich entwerfe, betreibe und analysiere die Infrastruktur realer Unternehmen: Netzwerke, Server, Web- und Mail-Systeme sowie die Tools, die sie wartbar halten.",
    primary: "Projekte ansehen",
    secondary: "\u00DCber mich",
    specialties: ["Netzwerke & MikroTik", "Linux & Server", "Infrastruktur & DevOps", "Web & Entwicklung"],
    projectMenu: "Projekte",
    projectMenuLead: "Live-Projektseiten und die zugeh\u00F6rigen Repositories.",
    projectsTitle: "Projekte",
    projectsLead: "Tools und Fallstudien, die ich gebaut und ver\u00F6ffentlicht habe \u2014 jedes mit eigener Seite.",
    viewProject: "Projekt ansehen",
    methodTitle: "Arbeitsweise",
    method: [
      ["Entdecken", "Bei Symptomen und Grenzen starten. Den echten Fehlerpfad finden, bevor ich etwas \u00E4ndere."],
      ["Architektur", "Die kleinste sinnvolle Korrektur entwerfen, mit Rollback-Gedanken und klarer Sicht auf das Ergebnis."],
      ["Bauen", "Mit Präzision umsetzen. Dokumentieren, was sich ge\u00E4ndert hat und warum, in jedem Schritt."],
      ["Pr\u00FCfen", "Unter realen Bedingungen testen. Best\u00E4tigen, dass die Korrektur h\u00E4lt, bevor sie als erledigt gilt."],
      ["Ausliefern", "Mit Vertrauen deployen. Ein klares Protokoll f\u00FCr die n\u00E4chste Person hinterlassen."],
      ["Verbessern", "Beobachten, lernen und verfeinern. Jede Korrektur ist eine M\u00F6glichkeit, das System st\u00E4rker zu machen."]
    ],
    identityTitle: "\u00DCber mich",
    identityLead: "Ich verstehe zuerst das eigentliche Problem, lese die Infrastruktur korrekt und liefere L\u00F6sungen, die auch unter Last halten.",
    identityCards: [
      ["Kernrolle", "IT-Spezialist mit Fokus auf Infrastruktur, Netzwerke, Serverbetrieb und Web-/Mail-Systeme."],
      ["Arbeitsstil", "Methodisch und dokumentiert, mit einer Vorliebe f\u00FCr erkl\u00E4rbare und wartbare L\u00F6sungen."],
      ["Richtung", "Vertiefung von DevOps- und Cloud-Kenntnissen auf einem soliden operativen Fundament."]
    ],
    contactTitle: "Lass uns sprechen",
    contactLead: "F\u00FCr Zusammenarbeit, Projekt-Reviews oder Infrastrukturarbeit sind dies die besten Wege zu mir.",
    contactButton: "Auf Telegram schreiben",
    footer: "Gebaut mit React, Vite und Canvas",
    heroSubtitle: "IT-Spezialist \u2014 Infrastruktur, Netzwerke, Web & Mail",
    projectsList: "Alle Projekte",
    sourceCode: "Quellcode",
    backHome: "Zur\u00FCck zur Startseite",
    problemLabel: "Das Problem",
    solutionLabel: "Die L\u00F6sung",
    featuresLabel: "Funktionen",
    workflowLabel: "Ablauf",
    downloadsLabel: "Downloads",
    editionsLabel: "Editionen",
    plansLabel: "Tarife",
    screenshotsLabel: "Screenshots",
    specialtiesTitle: "Fachbereiche",
    specialtiesLead: "IT-Betrieb, Netzwerkinfrastruktur, Serverbetrieb und alles dazwischen."
  }
};
