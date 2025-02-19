const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

(async () => {
  try {
    const css = await fs.promises.readFile('styles.css', 'utf8');
    const result = await postcss([autoprefixer, cssnano]).process(css, { from: 'styles.css', to: 'styles.min.css' });
    await fs.promises.writeFile('styles.min.css', result.css);
    console.log('CSS build completed successfully.');
  } catch (error) {
    console.error('Error building CSS:', error);
    process.exit(1);
  }
})();
