# Gulp Riot babel webpack boilerplate

---

### TODO
- [ ] Middleware option for anybody who wants to mess with meta-tags(express, or php will do the job)
- [ ] Unit Testing with Jasmine

---

> A starter Kit for front-end developer including [Gulp](http://gulpjs.com), [JQuery](https://github.com/jquery/jquery), [Bootstrap 4](https://v4-alpha.getbootstrap.com), [font-awesome](http://fontawesome.io), [Sass](http://sass-lang.com), [Jade](http://jade-lang.com), [Babel](https://babeljs.io), [ES2015](https://babeljs.io/docs/learn-es2015/), [webpack](http://webpack.github.io), [Karma](https://karma-runner.github.io/)

This seed repo is a starter kit for front-end developer that needs an environment allowing them to speed up development while ensuring good practice and overall quality.

* Best practice for HTML5, CSS and JavaScript organization
* Using Riot.js for component based development
* Code validation (HTML, JS, CSS)
* HTML Templating
* CSS Preprocessing

## Quick start
### Pre-requirements
* Node version >= 4
* NPM or Yarn
* Sass `gem install sass`

```bash
# clone the repo
git clone https://github.com/no-wa-ke/riot-gulp-webpack-babel.git

# change directory to the repo
cd riot-gulp-webpack-babel

# install the repo with npm or yarn
npm install
OR
yarn install
# You might want to run node-sass depending on your env
npm rebuild node-sass
# start the server
gulp
```
go to [http://localhost:3000](http://localhost:3000) in your browser

---

# Table of Contents
* [File structure](#file-structure)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
* [Configuration](#configuration)
* [License](#license)

# File structure
```
gulp-webpack-es2015-stack/
 ├──config/                          * configuration files and Gulp taks
 │   ├──gulp/                        * Gulp tasks descriptions
 │   ├──.htmlhintrc                  * htmlhint configuration file
 │   ├──.eslintrc.json               * eslint configuration file
 │   ├──.sass-lint.yml               * sasslint configuration file (Yaml format)
 │   ├──config.json                  * variables used got Gulp tasks
 │   ├──karma.conf.js                * Karma configuration file
 │   └──webpack.conf.js              * Webpack configuration file
 │
 ├──src/                             * our source files that will be compiled to javascript
 │   ├──index.pug                    * our index.html
 │   │
 │   ├──html/                        * where you keep your pug templates
 │   │   └──layout.pug               * the main pug layout
 │   │
 │   ├──app/                         * JavaScript/ES2015 files
 │   │
 │   ├──static/                      * files that will be copied to the root of the compiled site (robots.txt, favicon, ...)
 │   │
 │   └──assets/                      * static assets are served here
 │       ├──img/                     * images
 │       └──scss/                    * Sass files
 │           ├──app.scss             * Main Sass files
 │           └──common/              * Sass common files
 │               ├──_mixins.scss     * for you own Sass mixins here
 │               └──_variables.scss  * for your sass variables
 │
 ├──test/                            * Testing directory
 │    └──spec/                       * Jasmine test definitions
 │
 │
 ├──gulpfile.js                      * gulp main configuration file
 └──package.json                     * what npm/yarn uses to manage it's dependencies
```
# Getting Started
## Dependencies
You need to install the following on you system
* `node` and `npm` (`brew install node`) or `yarn` (`brew install yarn`)
* Ensure you running Node version >= 4.0.0
* ruby (`brew install ruby`)

Then install tools you'll need to run the app
* sass (`gem install sass`)
* gulp (`npm install gulp -g`)
* gulp (`npm install riot -g`)
* karma (`npm install karma-cli -g`)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `gulp` to start the dev server

## Running the app
After all dependencies are installed, just run `gulp` to start a local server using `browser-sync` which will watch your files and build them.
browser-sync will display the address and port of your server (by default, `http://0.0.0.0:3000`).

### Gulp commands
#### Server
```bash
# build files then launch the server and watch files
gulp
# compiled version
gulp run:compile
```
#### Build files
```bash
# build files in ./build/ (Webpack, Sass, Jade) and validate them
gulp build
# "compile" files in ./compile/
# minify and concatenate every css and js including
# Optimize images compression
# Site ready for production
gulp compile
```
#### Validate files
```bash
# runs the validations htmlhint, eslint, csslint, sasslint, TsLint
gulp validate
```
#### Package site
```bash
# compile files then get the last git tag and create a zip named after it
gulp delivery
```
#### Deploy site
```bash
# compile the site then send it to a given server path over scp
gulp deploy
```
# Configuration
Most of the configuration files are in ./config
* `config.json`: contains the paths to the various kind of files used by Gulp
* `.eslintrc.json`: eslint config file
* `.sass-lint.yml`: sasslint config file
* `webpack.conf.json`: Webpack config file

# License
[MIT](/LICENSE.md)
