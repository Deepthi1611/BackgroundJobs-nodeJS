/*
 *  Application Logger.
 *
 *  Docs: https://github.com/winstonjs/winston
 *
 *  @example
 *
 *  const logger = require('./lib/logger')
 *
 *  logger.info('info message')
 *  logger.warn('warn message')
 *  logger.error(err)
 *  logger.info({ person_id: 1, action: "create"})
 */

const winston = require("winston");
//to generate log files
const DailyRotateFile = require("winston-daily-rotate-file");
//transforms  events into JSON format
const newrelicFormatter = require("@newrelic/winston-enricher");
const loggerConfig = require("./loggerConfig.json");
const newrelicWinstonFormatter = newrelicFormatter(winston);

// Create a custom format to include the correlationId in the log message for file transport
const fileFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}] ${message}`;
});

const createLogger = (logName) => {
  const loggerTransports = [];
  const logConfig = loggerConfig[logName];

  loggerTransports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        fileFormat,
      ),
    }),
  );

  const filename = logConfig.filename.replace(
    "%ENVIRONMENT%",
    process.env.NODE_ENV || "development",
  );

  loggerTransports.push(
    new DailyRotateFile({
      filename,
      datePattern: logConfig.datePattern,
      zippedArchive: logConfig.zippedArchive,
      maxSize: logConfig.maxSize,
      maxFiles: logConfig.maxFiles,
      format: winston.format.combine(winston.format.timestamp(), fileFormat),
    }),
  );

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      newrelicWinstonFormatter(),
    ),
    transports: loggerTransports,
  });

  return logger;
};

const logger = createLogger("logger");

module.exports = logger;