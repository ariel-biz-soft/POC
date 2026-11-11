export type SupportedLanguage = 'EN' | 'HE';

export interface UIElement {
  en: string;
  he: string;
}

/**
 * Registry of system UI elements (tabs, menus, entities, and actions).
 * Enables dynamic log localization where UI strings are resolved at runtime
 * rather than hardcoded in log messages.
 */
export const UI_ELEMENTS = {
  // Navigation Menus & Tabs
  overview: { en: 'Project Overview', he: 'סקירת פרויקטים' },
  suppliers: { en: 'Supplier Invoices', he: 'חשבוניות ספקים' },
  labor: { en: 'Labor & Workers', he: 'עבודה ועובדים' },
  contracts: { en: 'Contracts & Customers', he: 'חוזים ולקוחות' },
  docs: { en: 'Customer Invoices', he: 'חשבוניות ללקוח' },
  collections: { en: 'Collections', he: 'גביית חובות' },
  reports: { en: 'Cross-Section Reports', he: 'דוחות חיתוך' },
  import: { en: 'Data Import', he: 'ייבוא נתונים' },
  permissions: { en: 'Permissions Management', he: 'ניהול הרשאות' },
  userManagement: { en: 'User Management', he: 'ניהול משתמשים' },
  settings: { en: 'Settings', he: 'הגדרות' },
  auditLog: { en: 'Audit Log', he: 'יומן ביקורת' },

  // System & Seed Entities
  rolesMatrix: { en: 'Roles & Permissions Matrix', he: 'תפקידים ומטריצת הרשאות' },
  expenseTypes: { en: 'Expense Types', he: 'סוגי הוצאה' },
  fieldSettings: { en: 'Required Field Settings', he: 'הגדרות שדות חובה' },
  orgSettings: { en: 'Organization Settings (MASAV)', he: 'הגדרות ארגון (מס"ב)' },
  projects: { en: 'Projects', he: 'פרויקטים' },
  workers: { en: 'Workers', he: 'עובדים' },
  workdays: { en: 'Workday Records', he: 'רשומות ימי עבודה' },
  adminUser: { en: 'Administrator User', he: 'משתמש מנהל' },
} as const;

export type UIElementKey = keyof typeof UI_ELEMENTS;

/**
 * Maps entity types (used in audits/database) to their corresponding UI tab.
 */
export const ENTITY_TO_TAB: Record<string, UIElementKey> = {
  user: 'userManagement',
  role: 'permissions',
  permission: 'permissions',
  supplier: 'suppliers',
  supplierInvoice: 'suppliers',
  invoice: 'suppliers',
  billingDoc: 'docs',
  customer: 'contracts',
  contract: 'contracts',
  worker: 'labor',
  workday: 'labor',
  collection: 'collections',
  project: 'overview',
  import: 'import',
  report: 'reports',
  orgSetting: 'settings',
  setting: 'settings',
};

/**
 * Format a UI element string for logs.
 * When log language is EN and UI language is HE, formats as: "User Management [ניהול משתמשים]".
 * When log language is HE, formats as: "ניהול משתמשים".
 * When UI localization is applied in the future and both are EN, formats as: "User Management".
 */
export function formatUIElement(
  key: UIElementKey | string,
  logLang: SupportedLanguage = 'EN',
  uiLang: SupportedLanguage = 'HE'
): string {
  const el = (UI_ELEMENTS as Record<string, UIElement>)[key];
  if (!el) return key;

  if (logLang === 'EN') {
    // If UI language is Hebrew (or differs from EN), present both English and the active UI string
    return uiLang === 'HE' ? `${el.en} [${el.he}]` : el.en;
  }
  // When log language is HE
  return el.he;
}
