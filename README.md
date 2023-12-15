# Speedrun QA automation of hacker-challenge
- We're using different tools/frameworks to automate the tasks within the hacker-challenge.
- All challenges should be completed as closely to human interaction as possible.
- Feel free to execute your tests against a locally hosted version of the hacker-challenge, see below.


Original hosted at: https://hacker-challenge.netlify.app/

Forked from Github: https://github.com/jessicard/hacker-challenge

## Contribution to Speedrun QA Automation challenge
- Create a subfolder for your automation tool/framework of choice and automate all challenges.
- All automation solutions should include hints on test execution (i.e. package.json or separate Readme)
- Include a github workflow file that runs on PRs and can be triggered manually
- A dedicated step in your workflow that executes the tests makes test execution times compareable to some extend

## Running hacker-challenge locally
To run locally use `python -m SimpleHTTPServer` in your terminal and then open `http://localhost:8000` (or similiar, check terminal output) in your browser.

Or use Python 3 `python3 -m http.server` to run the hacker-challenge.


- NOTE: Playwright test execution includes the local start of the webserver, see playwright.config.ts.

## Execute Playwright  Tests

- Go to playwright directory
- Install the dependencies using `npm ci`
- Start server on localhost, see above 
- To execute tests run scripts from package.json

## Execute Cypress Tests

- Go to cypress-automation directory
- Install the dependencies using `npm ci`
- Start server on localhost, see above 
- To execute tests headed or headlessley using the following commands:

```shell
    npm run cypress-headed              # run all tests on headed browsers
    npm run cypress-headless            # run all tests on electron headlessly
    npx cypress open  --browser=chrome  # run the tests on headed chrome browser
```
