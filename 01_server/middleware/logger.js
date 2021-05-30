 /**
 * Configurations of logger.
 */
  const { createLogger, transports } = require('winston');
  
  let logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'info.log', level: 'info' })
      ]
  });

module.exports = {
  'logger': logger
};