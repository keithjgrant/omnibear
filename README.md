# Omnibear

For general usage information, see https://omnibear.com.

## Development

After cloning the repository, run `npm install` to install dependencies.

* `npm run build`: build into the `/dist` directory.
* `npm run watch`: to automatically watch for changes and rebuild.
* `npm test`: run tests. `npm test -- --watch` will watch for changes and re-run tests every time. If you have issues, make sure you are using node 6.9.5 (the LTS version).

## Installing from the repository

To install in Chrome from the repository:

1. Navigate to chrome://extensions/
2. Check the “Developer mode” box
3. Click “Load unpacked extension” and select the `/dist` directory of the repository


To install in Firefox from the repository:

1. Navigate to about:debugging
2. Click “Load Temporary Add-On”
3. Navigate to the `/dist` directory and select the `manifest.json` file

## Overview

Omnibear is run by three scripts:

* `src/background.js` — Runs in a [background page](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_scripts). This keeps track of which tab currently has the user's focus and handles communication between the page script and omnibear popup script.
* `src/page.js` — A [content script](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Content_scripts) that runs in all pages (tabs). This highlights selected entries when the user right-clicks them and sends that. It alerts the background script whenever its tab recieves user focus. And it watches when the browser navigates to the authentication successful page on omnibear.com.
* `src/index.js` — The main script of the [popup page](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Sidebars_popups_options_pages). This is a small webapp built in [Preact](https://preactjs.com/) that includes the posting form and settings screen.

Authentication details and user settings are stored in Omnibear’s localStorage.
