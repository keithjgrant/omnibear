import {getSettings} from './settings';

const INFO = 'info';
const WARNING = 'warning';
const ERROR = 'error';

export function getLogs() {
  const log = JSON.parse(localStorage.getItem('log'));
  if (log) {
    return log;
  }
  return [];
}

function saveLog(log) {
  localStorage.setItem('log', JSON.stringify(log));
}

export function clearLogs() {
  localStorage.setItem('log', '[]');
}

function formatDate(date) {
  const day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
  return `${day} ${time}`;
}

function append(message, data, type) {
  if (!logsEnabled() && type !== ERROR) {
    return;
  }
  const log = getLogs();
  if (log.length > 100) {
    log.unshift();
  }
  const entry = {
    message,
    type,
    timestamp: formatDate(new Date()),
  };
  if (data) {
    if (data instanceof Error) {
      entry.data = serializeError(data);
    } else {
      entry.data = data;
    }
  }
  log.push(entry);
  saveLog(log);
}

function serializeError(err) {
  return {
    message: err.message,
    stack: err.stack.trim().split('\n'),
  };
}

export function info(message, data) {
  append(message, data, INFO);
}
export default info;

export function warning(message, data) {
  append(message, data, WARNING);
}

export function error(message, data) {
  append(message, data, ERROR);
}

function logsEnabled() {
  const settings = getSettings();
  return settings.debugLog;
}
