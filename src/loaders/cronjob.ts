/**
 * Cronjob loader
 * @packageDocumentation
 */

import config from '../config';
import Chatible from '../services/chatible';
import https from 'https';

const every15mins = async (): Promise<void> => {
  https.request(
    {
      hostname: 'http://api.allorigins.win/get?url=https://' + config.APP_NAME + '.herokuapp.com/',
      port: 80,
      method: 'GET',
    },
    (res) => {
      console.log('StatusCode:', res.statusCode);
    },
  );
};
/**
 * Run cronjob every minute.
 * Remove timeout users from wait room.
 */
const cronjobLoader = async (): Promise<void> => {
  if (config.MAX_WAIT_TIME_MINUTES > 0) {
    setInterval(Chatible.removeTimeoutUser, 60000);
  }
  if (config.APP_NAME && config.KEEP_APP_ALWAYS_ON) {
    setInterval(every15mins, 15 * 60000);
  }
};

export default cronjobLoader;
