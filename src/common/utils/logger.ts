/* eslint-disable no-console */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

class Logger {
  private logLevel: LogLevel;
  private logLevelPriority: Record<LogLevel, number> = {
    [LogLevel.ERROR]: 0,
    [LogLevel.WARN]: 1,
    [LogLevel.INFO]: 2,
    [LogLevel.DEBUG]: 3,
  };

  constructor() {
    // Get log level from environment variable or default to 'info'
    const envLogLevel = process.env.LOG_LEVEL as LogLevel;
    this.logLevel = envLogLevel || LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.logLevelPriority[level] <= this.logLevelPriority[this.logLevel];
  }

  private formatMessage(level: LogLevel, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const formattedMeta = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${formattedMeta}`;
  }

  public debug(message: string, meta?: unknown): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, meta));
    }
  }

  public info(message: string, meta?: unknown): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(LogLevel.INFO, message, meta));
    }
  }

  public warn(message: string, meta?: unknown): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message, meta));
    }
  }

  public error(message: string, error?: Error | unknown): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      if (error instanceof Error) {
        console.error(
          this.formatMessage(LogLevel.ERROR, message, {
            message: error.message,
            stack: error.stack,
          }),
        );
      } else if (error) {
        console.error(this.formatMessage(LogLevel.ERROR, message, error));
      } else {
        console.error(this.formatMessage(LogLevel.ERROR, message));
      }
    }
  }
}

export const logger = new Logger();
