# Omnibear

For usage information, see https://omnibear.com.

## Development

After cloning the repository, run `npm install` to install dependencies.

* `npm run build`: build into the `/dist` directory.
* `npm run watch`: to automatically watch for changes and rebuild.
* `npm test`: run tests. `npm test -- --watch` will watch for changes and re-run tests every time. If you have issues, make sure you are using node 6.9.5 (the LTS version).


To install in Chrome from the repository:

* Navigate to chrome://extensions/
* Check the “Developer mode” box
* Click “Load unpacked extension” and select the `/dist` directory of the repository


To install in Firefox from the repository:

* Navigate to about:debugging
* Click “Load Temporary Add-On”
* Navigate to the `/dist` directory and select the `manifest.json` file
