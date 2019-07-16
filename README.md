# solve-later-again
Chrome extension which generates a "Solve Later Again" section on AtCoder Problems.


# For Devs
## Project Files
* dst directory
  - chrome extension package.

## Development Environment Installation
### node.js
10.16.0 LTS

* Dowonload for Windows: https://nodejs.org/ja/

### Install Development Environment

Now, your current directory is the same to `solve-later-again/package.json`. Type following:

`> npm install`


#### webpack 4
* Installation: In the above "Install Development Environment" section, it should already be installed.  If not, see [webpack - Installation](https://webpack.js.org/guides/installation/).

* Version: See `solve-later-again/package.json` or `solve-later-again/package-lock.json`.

### How to develop
#### Step1
Now, your current directory is the same to `solve-later-again/package.json`. Type following:

`> ./node_modules/webpack-cli/bin/cli.js --mode=development -w`

Then, fix and append codes in `solve-later-again/src/*.js`. When built with webpack, `resolve-later-again/dst/content.js` is updated.

Production build is:

`> ./node_modules/webpack-cli/bin/cli.js --mode=production`

#### Step2

The final codes to publish are `solve-later-again/dst/*`.

Zip the files and publish on the Chrome Web Store.