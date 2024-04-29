const clipboardy = require('clipboardy');

// Read text from the clipboard
const copiedText = clipboardy.readSync();

console.log('Copied text from clipboard:', copiedText);
