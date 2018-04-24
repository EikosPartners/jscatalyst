# jest-environment-jsdom-external-scripts

>  A Jest environment which loads and runs external scripts

## Install

```
$ npm install --save-dev @mediaeventservices/jest-environment-jsdom-external-scripts
```

## Usage

In `package.json`:

```
"scripts": {
  "test": "jest prefix --env @mediaeventservices/jest-environment-jsdom-external-scripts"
},
```
## Motivation

Loading and execution of external scripts is not enabled by default in `JSDom`,
and `Jest` [currently does not expose a way to control this setting](https://github.com/facebook/jest/issues/2460).

This environment adds the following two `JSDom` config options on initialization:
{
    runScripts: "dangerously",
    resources: "usable"
}

The build script is as close as possible from the one of Facebook's [Jest repo](https://github.com/facebook/jest).
More on Jest environments: [http://facebook.github.io/jest/docs/configuration.html#testenvironment-string](http://facebook.github.io/jest/docs/configuration.html#testenvironment-string

## Credits

Based on [jest-environment-jsdom-latest](https://github.com/dmnsgn/jest-environment-jsdom-latest) by [Damien Seguin](https://github.com/dmnsgn)

## License

MIT © [MediaEvent Services GmbH & Co. KG](https://github.com/mes), originally [Damien Seguin](https://github.com/dmnsgn)
