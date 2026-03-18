module.exports = {
  '*.{vue,js,ts,jsx,tsx,cjs,mjs}': ['eslint --fix'],
  '*.{vue,css,scss,less}': ['stylelint --fix'],
  '*.{js,ts,vue,jsx,tsx,cjs,mjs,css,scss,less,json,md}': ['prettier --write'],
};
