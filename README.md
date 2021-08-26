# Javascript Coding Challenge

The idea of this challenge is to refactor existing code.

There is a failing test to be fixed, but keep in mind that the most important aspect is **rewriting** code.

Avoid doing only changes that would be suggested by simple linters, we would like to see how can you express the same logic in your own code.

## Challenge Instructions

- Fork this repo to your own github account
- After setting up the project, keep your browser with [http://localhost:3000](http://localhost:3000) open as well as Jest tests running on the background
- Start opening the [buildFullUrl](lib/buildFullUrl.ts) file and:
  - Fix the failing test and commit the quick fix
  - Refactor the file the way you'd like, keeping the tests green
- After you're done send us a link to your repository. **DO NOT** send a PR.

## Rules

- You can use any data munging library that you like, like lodash, ramda, etc;
- Think twice before adding external dependencies. Don't use a library that does URL parsing like you're intented to do;
- Keep the [index](pages/index.tsx) and [test file](lib/__tests__/buildFullUrl.test.js) untouched, if you want to create more tests and extract the code into smaller functions, create other test file and test those functions in separate;

**We hope you have fun doing this exercise 😉**


## Installation

First, run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running tests

In another terminal tab, keep the tests running:

```bash
npm run test
# or
yarn test
```
