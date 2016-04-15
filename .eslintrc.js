module.exports = {
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb"
  ],
  "plugins": [
      "react"
  ],
  "rules": {
    "comma-dangle": ["error", "never"]
  },
  "env": {
    "browser": true
}
};
