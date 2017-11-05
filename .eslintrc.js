module.exports = {
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier"],
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "prettier/prettier": [
      "error", 
      { 
        "tabWidth": 2,
        "useTabs": false,
        "singleQuote": true, 
        "bracketSpacing": true,
        "trailingComma": "es5"
      }
    ]
  }
};
