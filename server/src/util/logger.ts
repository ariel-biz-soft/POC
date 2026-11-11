import { env } from '../env';
import { logCatalog, type LogFormatContext } from '../i18n/logCatalog';
import {
  formatUIElement,
  ENTITY_TO_TAB,
  type SupportedLanguage,
  type UIElementKey,
} from '../constants/uiElements';

class Logger {
  private getLogContext(): LogFormatContext {
    const lang = (env.logLanguage || 'EN').toUpperCase() as SupportedLanguage;
    return {
      lang: lang === 'HE' ? 'HE' : 'EN',
      uiLang: 'HE', // UI is currently in Hebrew; adapts automatically if UI localization changes
    };
  }

  get language(): SupportedLanguage {
    return this.getLogContext().lang;
  }

  /** Format a UI element string adhering to current log & UI localization */
  formatUI(key: UIElementKey | string): string {
    const ctx = this.getLogContext();
    return formatUIElement(key, ctx.lang, ctx.uiLang);
  }

  info(message: string, ...optionalParams: unknown[]): void {
    console.log(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    console.warn(message, ...optionalParams);
  }

  error(message: string | unknown, ...optionalParams: unknown[]): void {
    console.error(message, ...optionalParams);
  }

  // Parameterized application lifecycle logs
  serverRunning(port: number, envName: string): void {
    console.log(logCatalog.serverRunning(this.getLogContext(), port, envName));
  }

  serverClosing(): void {
    console.log(logCatalog.serverClosing(this.getLogContext()));
  }

  internalError(err: unknown): void {
    console.error(logCatalog.internalServerError(this.getLogContext()), err);
  }

  auditFailed(entityOrTab?: string, err?: unknown): void {
    const tabKey = entityOrTab ? (ENTITY_TO_TAB[entityOrTab] || entityOrTab) : undefined;
    console.error(logCatalog.auditLogFailed(this.getLogContext(), tabKey), err ?? '');
  }

  tabOp(tabOrEntity: UIElementKey | string, action: string, details?: string): void {
    const tabKey = ENTITY_TO_TAB[tabOrEntity] || tabOrEntity;
    console.log(logCatalog.tabOperation(this.getLogContext(), tabKey, action, details));
  }

  // Parameterized database seeding logs
  seedStart(): void {
    console.log(logCatalog.seedStart(this.getLogContext()));
  }

  seedItemWithCount(count: number, entityKey: UIElementKey | string): void {
    console.log(logCatalog.seedItemWithCount(this.getLogContext(), count, entityKey));
  }

  seedItem(entityKey: UIElementKey | string): void {
    console.log(logCatalog.seedItem(this.getLogContext(), entityKey));
  }

  seedAdmin(email: string): void {
    console.log(logCatalog.seedAdminUser(this.getLogContext(), email));
  }

  seedSuccess(): void {
    console.log(logCatalog.seedSuccess(this.getLogContext()));
  }

  seedFailed(err: unknown): void {
    console.error(logCatalog.seedFailed(this.getLogContext()), err);
  }
}

export const logger = new Logger();
