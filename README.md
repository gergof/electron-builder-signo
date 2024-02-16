# electron-builder-signo

[![NPM Version](https://img.shields.io/npm/v/electron-builder-signo)](https://www.npmjs.com/package/electron-builder-signo)
![NPM Type Definitions](https://img.shields.io/npm/types/electron-builder-signo)
[![Build Status](https://ci.systest.eu/api/badges/gergof/electron-builder-signo/status.svg)](https://ci.systest.eu/gergof/electron-builder-signo)
[![GitHub License](https://img.shields.io/github/license/gergof/electron-builder-signo)](https://github.com/gergof/electron-builder-signo/blob/master/LICENSE)

Simplify signing Windows executables using electron-builder with signo

### Usage

1. You have to install electron-builder-signo.

```bash
npm install --save-dev electron-builder-signo
```

2. To sign windows executables using signo you have to make the following changes to your electron-builder config:

```json
{
	"win": {
		"signingHashAlgorithms": ["sha256"],
		"sign": "electron-builder-signo"
	}
}
```

You need to set signingHashAlgorithms to sha256, but signo will already double sign it with sha1 as well out of the box.

3. You need to set up some environment variables:

- `SIGNO_SERVER`: Url pointing to your signo server (ex: _https://signo.example.com/_)
- `SIGNO_SIGNEE`: Signee ID (ex: _14_)
- `SIGNO_SECRET`: Secret of the client (ex: _8fE1+NqqVG..._)
- `SIGNO_ENGINE`: Engine ID to use for signing (ex: _3_)

### Learn more

[Signo](https://github.com/gergof/signo) is a managed signing solution that can be used to share a physical PKCS#11 security token through the internet.
