const path = require('path');

const watchFolders = [path.join(__dirname, '../..')];
console.log(watchFolders);
module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    watchFolders,
};
