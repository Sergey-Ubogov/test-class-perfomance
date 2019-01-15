/*eslint-env node*/

module.exports = {
    "parser": "babel-eslint",
    env: {
      "browser": true,
      "node": true,
      "es6": true
    },
    plugins: [
        'sort-imports-es6-autofix',
        "react",
        "eslint-plugin-react"
    ],
    parserOptions: {
      "ecmaVersion": 2017,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true,
          "experimentalObjectRestSpread": true
      }
    }
};
