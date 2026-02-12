## Discord GIF Exporter
Userscript and Node.js script for exporting GIFs from Discord as files.

<br>

### Installation
- Userscript:
    1. Install a userscript manager browser extension like [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey.](https://www.tampermonkey.net/)
    2. [Click here to install the userscript.](https://github.com/Sv443/DiscordGifExport/raw/refs/heads/main/ExporterUserscript.user.js)
- Node.js script:
    1. Install [Node.js.](https://nodejs.org/)
    2. Clone this repository with Git or download and extract it.

<br>

### Usage
1. [**Open Discord in your browser**](https://discord.com/app), log in, and navigate to any chat.
2. Open the "Favorite" GIFs panel (also records any other GIF panel that is opened, until the tab is closed or refreshed).
3. Semi-slowly scroll down until all GIFs were loaded to record them.  
  They don't have to fully load, just the rectangular frame needs to exist.
4. Click the userscript manager extension's icon somewhere in the browser toolbar.
5. Select "Export to file" to download all GIF URLs as a `gifs.json` file. Don't rename this file.
6. Move the `gifs.json` file to the project directory where the Node.js script is, so it sits in the same folder as `package.json`
7. Open a terminal window in the Node.js script's directory and run the command `node .`
8. The exported GIFs will be saved to a newly created `./output/` folder.  
  Running the command again will not delete the existing `./output/` folder, but will overwrite any existing files in the same position and the same file name.

<br>

### Legal
Copyright © 2026 Sv443, see [license.](./LICENSE.txt)  
  
Powered by:
- [CoreUtils](https://github.com/Sv443-Network/CoreUtils)
- [UserUtils](https://github.com/Sv443-Network/UserUtils)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
