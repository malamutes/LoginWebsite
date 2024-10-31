// add-js-extensions.js
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'dist');

function addJsExtensions(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('Could not list the directory.', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (error, stat) => {
                if (error) {
                    console.error('Error stating file.', error);
                    return;
                }

                if (stat.isFile() && file.endsWith('.js')) {
                    // Read the content of the .js file
                    fs.readFile(filePath, 'utf8', (readErr, data) => {
                        if (readErr) {
                            console.error('Error reading file.', readErr);
                            return;
                        }

                        // Replace import statements to add .js extensions only if they are your own modules
                        const modifiedData = data.replace(/(import .* from ['"])(?!.*node_modules)(.*?)(['"])/g, (match, p1, p2, p3) => {
                            return `${p1}${p2}.js${p3}`;
                        });

                        // Write the modified content back to the file if changes were made
                        if (modifiedData !== data) {
                            fs.writeFile(filePath, modifiedData, 'utf8', (writeErr) => {
                                if (writeErr) {
                                    console.error('Error writing file.', writeErr);
                                } else {
                                    console.log(`Updated imports in ${filePath}`);
                                }
                            });
                        }
                    });
                } else if (stat.isDirectory()) {
                    addJsExtensions(filePath); // Recurse into subdirectories
                }
            });
        });
    });
}

// Start the process
addJsExtensions(directoryPath);
