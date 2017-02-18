
function router (routes, path) {
  var path = trimPath(path);
  if (path == '_generated_background_page') {
    path = 'background';
  }
  if (routes[path]) {
    routes[path]();
  } else if (routes.default) {
    routes.default();
  }
}

function trimPath (path) {
  if (path.startsWith('/')) {
    path = path.substr(1);
  }
  if (path.endsWith('.html')) {
    path = path.substr(0, path.length - 5);
  }
  return path;
}

module.exports = {
  router: router,
  trimPath: trimPath
};
