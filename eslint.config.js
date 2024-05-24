import globals from "globals"
import pluginJs from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  eslintConfigPrettier,
  {
    rules: {
      "vue/no-multiple-template-root": "off",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          caughtErrors: "all",
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false,
          "no-undef": "error",
        },
      ],
    },
  },
]
