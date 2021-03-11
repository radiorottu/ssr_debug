// copy files from src/dist folder to functions/dist folder in order to serve them via Firebase Cloud Functions

const fs = require('fs-extra');

(async() => {

    const src = '../dist';
    const copy = './dist';

    await fs.remove(copy);
    await fs.copy(src, copy);
    
    // finally remove the original dist folder
    await fs.remove(src);

})();