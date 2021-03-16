const fs = require('fs');
const path = require('path');

(async() => {

    const APP_NAME = 'rro-ssr'; // TODO: change this!
    const DIST_FOLDER = './dist';
    const BROWSER_FOLDER = path.join(DIST_FOLDER, APP_NAME, 'browser');
    await fs.renameSync(path.join(BROWSER_FOLDER, 'index.html'), path.join(BROWSER_FOLDER, 'index.original.html'));

})();