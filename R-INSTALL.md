## Install Playwright

```
npm init playwright@latest
```

Initializing project in '.'  
√ Do you want to use TypeScript or JavaScript? · TypeScript  
√ Where to put your end-to-end tests? · tests  
√ Add a GitHub Actions workflow? (Y/n) · true  
√ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true

### Create README.md and .gitignore if there weren't

### Create tsconfig.json file. Enter data from file in project.

### Create eslint.config.mjs file. Enter data from file in project.

### Create .prettierrc file. Enter data from file in project.

### Install packages for linter.

```
npm i -D typescript ts-node eslint typescript-eslint @eslint/js @stylistic/eslint-plugin @stylistic/eslint-plugin-ts eslint-plugin-prettier eslint-plugin-unicorn prettier globals
```

### Install dotenv for using .env file

```
npm i -D dotenv
```

## Install MCP

```
npx playwright init-agents --loop=vscode
```

### Updating Playwright

```
npm install -D @playwright/test@latest
npx playwright install --with-deps
npx playwright --version
```

## Reporters

### Install allure

```
npm i -D allure-commandline allure-playwright
```

### change `playwright.config.ts` file

```
export default defineConfig({
  // ...
  reporter: [
    ['allure-playwright',{resultsDir: "allure-html-results"}],
    ['list'],
    ['json', { outputFile: 'playwright-reports/json-playwright-report.json' }],
    ['html', { outputFolder: 'playwright-reports/html-playwright-report' }],
    ['junit', { outputFile: 'playwright-reports/xmls-playwright-report.xml' }]
  ],
});
```

### Generate allure-report folder with single file useful for CI. Could add to script in package.json

```
npx allure generate --single-file allure-results --clean -o allure-report
```

## Add script to package.json

```
"test": "eslint && npx playwright test && npx allure generate --single-file allure-results --clean -o allure-report"
```
