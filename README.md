## Discord GIF Exporter
Userscript and Node.js script for exporting GIFs from Discord as files.

<br>

### Installation
- Userscript:
    1. Install a userscript manager browser extension like [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey.](https://www.tampermonkey.net/)
    2. [Click here to install the userscript.](./ExporterUserscript.user.js)
- Node.js script:
    1. Install [Node.js.](https://nodejs.org/)
    2. Clone this repository or download and extract it.

<br>

### Usage
1. Open Discord in your browser, log in, and navigate to any chat.
2. Open the "Favorite" GIFs panel (also works with any other GIF panels that are opened until the tab is refreshed).
3. Semi-slowly scroll down until all GIFs were loaded.
4. Click the userscript manager extension's icon somewhere in the browser toolbar.
5. Select "Export to file" to save the file as `gifs.json`.
6. Move the `gifs.json` file to the project directory where the Node.js script is, so it sits next to `package.json`.
7. Open a terminal window in the Node.js script's directory and run the command `node .`
8. The exported GIFs will be saved in the `./output/` folder.
