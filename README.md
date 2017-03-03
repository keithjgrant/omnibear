# Omnibear

For usage information, see http://omnibear.com (work in progress).

## Development

After cloning the repository, run `npm install` to install dependencies.

* `npm run build`: build into the `/dist` directory. I recommend `npm run build -- --watch` to automatically watch for changes and rebuild.
* `npm test`: run tests. `npm test -- --watch` will watch for changes and re-run tests every time. If you have issues, make sure you are using node 6.9.5 (the LTS version).


To install in Chrome from the repository:

* Navigate to chrome://extensions/
* Check the “Developer mode” box
* Click “Load unpacked extension” and select the `/dist` directory of the repository
