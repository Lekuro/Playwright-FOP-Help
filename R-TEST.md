# Playwright testing

## Run test

```
npx playwright test
```

### Run tests in UI mode

```
npx playwright test --ui
```

### Run tests in headed mode

```
npx playwright test --headed
```

### Run tests on different browsers

```
  npx playwright test --project=chromium
```

```
npx playwright test --project webkit --project firefox
```

### Run specific tests

To run a single test file, pass in the test file name that you want to run.

```
npx playwright test landing-page.spec.ts
```

To run a set of test files from different directories, pass in the directory names that you want to run the tests in.

```
npx playwright test tests/todo-page/ tests/landing-page/
```

To run files that have landing or login in the file name, simply pass in these keywords to the CLI.

```
npx playwright test landing login
```

To run a test with a specific title, use the -g flag followed by the title of the test.

```
npx playwright test -g "add a todo item"
```

### Run last failed tests

To run only the tests that failed in the last test run, first run your tests and then run them again with the --last-failed flag.

```
npx playwright test --last-failed
```

### Run tests in VS Code

install playwright extension

### Debug tests with the Playwright Inspector

```
npx playwright test --debug
```

To debug one test file, run the Playwright test command with the test file name that you want to debug followed by the --debug flag.

```
npx playwright test example.spec.ts --debug
```

To debug a specific test from the line number where the test(.. is defined, add a colon followed by the line number at the end of the test file name, followed by the --debug flag.

```
npx playwright test example.spec.ts:10 --debug
```

## HTML Test Reports

```
npx playwright show-report
```

## Auto generate tests with Codegen.

```
  npx playwright codegen
```
