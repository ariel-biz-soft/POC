import { formatUIElement, type SupportedLanguage, type UIElementKey } from '../constants/uiElements';

export interface LogFormatContext {
  lang: SupportedLanguage;
  uiLang?: SupportedLanguage;
}

/**
 * Parameterized log message catalog supporting dual-language (EN / HE) localization.
 * When log language is EN, references to UI elements embed the current UI string dynamically.
 */
export const logCatalog = {
  serverRunning: (ctx: LogFormatContext, port: number, envName: string) =>
    ctx.lang === 'EN'
      ? `🚀 Server <CompNamePlaceHolder> is running on port ${port} (${envName})`
      : `🚀 שרת <CompNamePlaceHolder> פועל על פורט ${port} (${envName})`,

  serverClosing: (ctx: LogFormatContext) =>
    ctx.lang === 'EN' ? 'Shutting down the server...' : 'סוגר את השרת...',

  internalServerError: (ctx: LogFormatContext) =>
    ctx.lang === 'EN' ? 'Internal server error' : 'שגיאת שרת פנימית',

  auditLogFailed: (ctx: LogFormatContext, tabKey?: UIElementKey | string) => {
    const tabStrEn = tabKey ? ` for ${formatUIElement(tabKey, ctx.lang, ctx.uiLang)}` : '';
    const tabStrHe = tabKey ? ` עבור ${formatUIElement(tabKey, ctx.lang, ctx.uiLang)}` : '';
    return ctx.lang === 'EN'
      ? `Audit log failed${tabStrEn}`
      : `כשל ברישום פעולה ביומן הביקורת${tabStrHe}`;
  },

  tabOperation: (ctx: LogFormatContext, tabKey: UIElementKey | string, action: string, details?: string) => {
    const tab = formatUIElement(tabKey, ctx.lang, ctx.uiLang);
    const detailSuffix = details ? ` (${details})` : '';
    return ctx.lang === 'EN'
      ? `Operation "${action}" executed in tab: ${tab}${detailSuffix}`
      : `בוצעה פעולה "${action}" בטאב: ${tab}${detailSuffix}`;
  },

  // Seed / Database initialization telemetry logs
  seedStart: (ctx: LogFormatContext) =>
    ctx.lang === 'EN' ? 'Seeding database...' : 'זריעת נתונים...',

  seedItemWithCount: (ctx: LogFormatContext, count: number, entityKey: UIElementKey | string) => {
    const formatted = formatUIElement(entityKey, ctx.lang, ctx.uiLang);
    return `  ✓ ${count} ${formatted}`;
  },

  seedItem: (ctx: LogFormatContext, entityKey: UIElementKey | string) => {
    const formatted = formatUIElement(entityKey, ctx.lang, ctx.uiLang);
    return `  ✓ ${formatted}`;
  },

  seedAdminUser: (ctx: LogFormatContext, email: string) => {
    const userLabel = formatUIElement('adminUser', ctx.lang, ctx.uiLang);
    return `  ✓ ${userLabel}: ${email}`;
  },

  seedSuccess: (ctx: LogFormatContext) =>
    ctx.lang === 'EN' ? 'Database seed completed successfully.' : 'הזריעה הושלמה בהצלחה.',

  seedFailed: (ctx: LogFormatContext) =>
    ctx.lang === 'EN' ? 'Database seed failed:' : 'זריעת הנתונים נכשלה:',
};

export type LogCatalog = typeof logCatalog;
