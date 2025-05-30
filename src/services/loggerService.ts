import type { Logger } from '../types/logger';

const isDev = import.meta.env.DEV;

export const logger: Logger = {
  debug(message, ...args) {
    if (isDev) console.debug(`[DEBUG] ${message}`, ...args);
  },
  info(message, ...args) {
    if (isDev) console.info(`[INFO] ${message}`, ...args);
  },
  warn(message, ...args) {
    if (isDev) console.warn(`[WARN] ${message}`, ...args);
  },
  error(message, ...args) {
    if (isDev) console.error(`[ERROR] ${message}`, ...args);
  },
};
