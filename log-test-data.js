function formatDate(date) {
  const day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
  return `${time} ${day}`;
}

var log = [{
  message: 'An info log',
  type: 'info',
  timestamp: formatDate(new Date())
}, {
  message: 'An warning log',
  type: 'warning',
  timestamp: formatDate(new Date())
}, {
  message: 'An error log',
  type: 'error',
  data: new Error('oh my'),
  timestamp: formatDate(new Date())
}, {
  message: 'An log with data',
  type: 'info',
  data: {
    foo: 'bar',
    baz: 'whatevs'
  },
  timestamp: formatDate(new Date())
}]
localStorage.setItem('log', JSON.stringify(log));
