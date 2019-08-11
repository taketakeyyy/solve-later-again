# solve-later-again
Chrome extension.

You can manage problems you want to solve later again on AtCoderProblems.

![Screenshot](https://github.com/taketakeyyy/solve-later-again/blob/master/solve-later-again/img/screenshot1_1280x800.png "Screenshot")

## Getting Started

[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/solve-later-again/emndffmnlppiaelhdneheagpaancfahk).


1. When installed, the AtCoderProblems Table page will have a "Solve Later Again" table.

2. Checking a checkbox of a problem which you think "It would be better to try again🤔" will add the problem to the "Solve Later Again" table.

3. When you solved the problem, check the "Solved 1" check box. Then the date you solve is printed.

4. After 7 days, "Solved 2" will be highlighted, so try again to solve.

5. After 30 days, "Solved 3" will be highlighted, so try again to solve.

6. Omg, you would ...
    * never mistake similar problems😎.
    * become a strong strong man💪.


# For Devs
## Project Files
* `solve-later-again/dst/`
    * Files to publish for chrome extension.
* `solve-later-again/src/`
    * Files for `solve-later-again/dst/content.js`. They are built with webpack.

## Development Environment Installation
### node.js
10.16.0 LTS

* Dowonload for Windows: https://nodejs.org/ja/

### Install Development Environment

Now, your current directory is the same to `solve-later-again/package.json`. Type following:

`> npm ci`

(If got errors and failed to run, type `> npm install`.)


#### webpack 4
* Installation: In the above "Install Development Environment" section, it should already be installed.  If not, see [webpack - Installation](https://webpack.js.org/guides/installation/).

* Version: See `solve-later-again/package.json` or `solve-later-again/package-lock.json`.

### How to develop
All files to publish are `solve-later-again/dst/*`. But only `content.js` file is built with webpack.

#### content.js
Now, your current directory is the same to `solve-later-again/node_modules` (This is generated when "Install Development Environment" section). Type following:

`> ./node_modules/webpack-cli/bin/cli.js --mode=development -w`

Then, fix and append codes in `solve-later-again/src/*.js`. When built with webpack, `resolve-later-again/dst/content.js` is updated.

Production build is:

`> ./node_modules/webpack-cli/bin/cli.js --mode=production`


#### Other files

Modify directly.


#### Publish

The final files to publish are `solve-later-again/dst/*`.

Zip `solve-later-again/dst/` and publish on the Chrome Web Store.
