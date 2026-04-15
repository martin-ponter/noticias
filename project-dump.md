# Estructura del proyecto

```txt
.
+-- .gitignore
+-- astro.config.mjs
+-- package.json
+-- package-lock.json
+-- README.md
\-- tsconfig.json
```

## Variables de entorno detectadas

- BITRIX_WEBHOOK_BASE=***OCULTO***

# Archivos

## `.gitignore`

```
# build output
dist/
# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*


# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/
.vercel
```

## `astro.config.mjs`

```
// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
```

## `package.json`

`$lang
{
  "name": "dispositivos-perifericos",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/react": "^5.0.3",
    "@astrojs/vercel": "^10.0.4",
    "@tailwindcss/vite": "^4.2.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "astro": "^6.1.4",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwindcss": "^4.2.2"
  }
}
```

## `package-lock.json`

`$lang
{
  "name": "dispositivos-perifericos",
  "version": "0.0.1",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "dispositivos-perifericos",
      "version": "0.0.1",
      "dependencies": {
        "@astrojs/react": "^5.0.3",
        "@astrojs/vercel": "^10.0.4",
        "@tailwindcss/vite": "^4.2.2",
        "@types/react": "^19.2.14",
        "@types/react-dom": "^19.2.3",
        "astro": "^6.1.4",
        "react": "^19.2.4",
        "react-dom": "^19.2.4",
        "tailwindcss": "^4.2.2"
      },
      "engines": {
        "node": ">=22.12.0"
      }
    },
    "node_modules/@astrojs/compiler": {
      "version": "3.0.1",
      "resolved": "https://registry.npmmirror.com/@astrojs/compiler/-/compiler-3.0.1.tgz",
      "integrity": "sha512-z97oYbdebO5aoWzuJ/8q5hLK232+17KcLZ7cJ8BCWk6+qNzVxn/gftC0KzMBUTD8WAaBkPpNSQK6PXLnNrZ0CA==",
      "license": "MIT"
    },
    "node_modules/@astrojs/internal-helpers": {
      "version": "0.8.0",
      "resolved": "https://registry.npmmirror.com/@astrojs/internal-helpers/-/internal-helpers-0.8.0.tgz",
      "integrity": "sha512-J56GrhEiV+4dmrGLPNOl2pZjpHXAndWVyiVDYGDuw6MWKpBSEMLdFxHzeM/6sqaknw9M+HFfHZAcvi3OfT3D/w==",
      "license": "MIT",
      "dependencies": {
        "picomatch": "^4.0.3"
      }
    },
    "node_modules/@astrojs/markdown-remark": {
      "version": "7.1.0",
      "resolved": "https://registry.npmmirror.com/@astrojs/markdown-remark/-/markdown-remark-7.1.0.tgz",
      "integrity": "sha512-P+HnCsu2js3BoTc8kFmu+E9gOcFeMdPris75g+Zl4sY8+bBRbSQV6xzcBDbZ27eE7yBGEGQoqjpChx+KJYIPYQ==",
      "license": "MIT",
      "dependencies": {
        "@astrojs/internal-helpers": "0.8.0",
        "@astrojs/prism": "4.0.1",
        "github-slugger": "^2.0.0",
        "hast-util-from-html": "^2.0.3",
        "hast-util-to-text": "^4.0.2",
        "js-yaml": "^4.1.1",
        "mdast-util-definitions": "^6.0.0",
        "rehype-raw": "^7.0.0",
        "rehype-stringify": "^10.0.1",
        "remark-gfm": "^4.0.1",
        "remark-parse": "^11.0.0",
        "remark-rehype": "^11.1.2",
        "remark-smartypants": "^3.0.2",
        "retext-smartypants": "^6.2.0",
        "shiki": "^4.0.0",
        "smol-toml": "^1.6.0",
        "unified": "^11.0.5",
        "unist-util-remove-position": "^5.0.0",
        "unist-util-visit": "^5.1.0",
        "unist-util-visit-parents": "^6.0.2",
        "vfile": "^6.0.3"
      }
    },
    "node_modules/@astrojs/prism": {
      "version": "4.0.1",
      "resolved": "https://registry.npmmirror.com/@astrojs/prism/-/prism-4.0.1.tgz",
      "integrity": "sha512-nksZQVjlferuWzhPsBpQ1JE5XuKAf1id1/9Hj4a9KG4+ofrlzxUUwX4YGQF/SuDiuiGKEnzopGOt38F3AnVWsQ==",
      "license": "MIT",
      "dependencies": {
        "prismjs": "^1.30.0"
      },
      "engines": {
        "node": ">=22.12.0"
      }
    },
    "node_modules/@astrojs/react": {
      "version": "5.0.3",
      "resolved": "https://registry.npmmirror.com/@astrojs/react/-/react-5.0.3.tgz",
      "integrity": "sha512-z6JXjgADH4/7e0hqcRj+dO9UQlrKmsm2ZJoVT1GzOTYY0ThQ3Znpfr8tY8XKlEHWSTUlT9LP5u4v6QpEJwLz5A==",
      "license": "MIT",
      "dependencies": {
        "@astrojs/internal-helpers": "0.8.0",
        "@vitejs/plugin-react": "^5.2.0",
        "devalue": "^5.6.4",
        "ultrahtml": "^1.6.0",
        "vite": "^7.3.1"
      },
      "engines": {
        "node": ">=22.12.0"
      },
      "peerDependencies": {
        "@types/react": "^17.0.50 || ^18.0.21 || ^19.0.0",
        "@types/react-dom": "^17.0.17 || ^18.0.6 || ^19.0.0",
        "react": "^17.0.2 || ^18.0.0 || ^19.0.0",
        "react-dom": "^17.0.2 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/@astrojs/telemetry": {
      "version": "3.3.0",
      "resolved": "https://registry.npmmirror.com/@astrojs/telemetry/-/telemetry-3.3.0.tgz",
      "integrity": "sha512-UFBgfeldP06qu6khs/yY+q1cDAaArM2/7AEIqQ9Cuvf7B1hNLq0xDrZkct+QoIGyjq56y8IaE2I3CTvG99mlhQ==",
      "license": "MIT",
      "dependencies": {
        "ci-info": "^4.2.0",
        "debug": "^4.4.0",
        "dlv": "^1.1.3",
        "dset": "^3.1.4",
        "is-docker": "^3.0.0",
        "is-wsl": "^3.1.0",
        "which-pm-runs": "^1.1.0"
      },
      "engines": {
        "node": "18.20.8 || ^20.3.0 || >=22.0.0"
      }
    },
    "node_modules/@astrojs/vercel": {
      "version": "10.0.4",
      "resolved": "https://registry.npmmirror.com/@astrojs/vercel/-/vercel-10.0.4.tgz",
      "integrity": "sha512-+kxbLKCimr9ivqXTldE3JyXB6Ks7WU6C8jcZGt+CLM9N1IVCWck9ustz3Hd/OGROQpzRATLVvrlbwyeM7Gycpw==",
      "license": "MIT",
      "dependencies": {
        "@astrojs/internal-helpers": "0.8.0",
        "@vercel/analytics": "^1.6.1",
        "@vercel/functions": "^3.4.3",
        "@vercel/nft": "^1.3.2",
        "@vercel/routing-utils": "^5.3.3",
        "esbuild": "^0.27.3",
        "tinyglobby": "^0.2.15"
      },
      "peerDependencies": {
        "astro": "^6.0.0"
      }
    },
    "node_modules/@astrojs/vercel/node_modules/@vercel/analytics": {
      "version": "1.6.1",
      "resolved": "https://registry.npmmirror.com/@vercel/analytics/-/analytics-1.6.1.tgz",
      "integrity": "sha512-oH9He/bEM+6oKlv3chWuOOcp8Y6fo6/PSro8hEkgCW3pu9/OiCXiUpRUogDh3Fs3LH2sosDrx8CxeOLBEE+afg==",
      "license": "MPL-2.0",
      "peerDependencies": {
        "@remix-run/react": "^2",
        "@sveltejs/kit": "^1 || ^2",
        "next": ">= 13",
        "react": "^18 || ^19 || ^19.0.0-rc",
        "svelte": ">= 4",
        "vue": "^3",
        "vue-router": "^4"
      },
      "peerDependenciesMeta": {
        "@remix-run/react": {
          "optional": true
        },
        "@sveltejs/kit": {
          "optional": true
        },
        "next": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "svelte": {
          "optional": true
        },
        "vue": {
          "optional": true
        },
        "vue-router": {
          "optional": true
        }
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmmirror.com/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmmirror.com/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmmirror.com/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/core/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmmirror.com/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmmirror.com/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmmirror.com/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets/node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmmirror.com/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/@babel/helper-compilation-targets/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmmirror.com/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmmirror.com/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmmirror.com/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmmirror.com/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmmirror.com/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmmirror.com/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmmirror.com/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmmirror.com/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.2",
      "resolved": "https://registry.npmmirror.com/@babel/helpers/-/helpers-7.29.2.tgz",
      "integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.2",
      "resolved": "https://registry.npmmirror.com/@babel/parser/-/parser-7.29.2.tgz",
      "integrity": "sha512-4GgRzy/+fsBa72/RZVJmGKPmZu9Byn8o4MoLpmNe1m8ZfYnz5emHLQz3U4gLud6Zwl0RZIcgiLD7Uq7ySFuDLA==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmmirror.com/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmmirror.com/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmmirror.com/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmmirror.com/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmmirror.com/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@capsizecss/unpack": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/@capsizecss/unpack/-/unpack-4.0.0.tgz",
      "integrity": "sha512-VERIM64vtTP1C4mxQ5thVT9fK0apjPFobqybMtA1UdUujWka24ERHbRHFGmpbbhp73MhV+KSsHQH9C6uOTdEQA==",
      "license": "MIT",
      "dependencies": {
        "fontkitten": "^1.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@clack/core": {
      "version": "1.2.0",
      "resolved": "https://registry.npmmirror.com/@clack/core/-/core-1.2.0.tgz",
      "integrity": "sha512-qfxof/3T3t9DPU/Rj3OmcFyZInceqj/NVtO9rwIuJqCUgh32gwPjpFQQp/ben07qKlhpwq7GzfWpST4qdJ5Drg==",
      "license": "MIT",
      "dependencies": {
        "fast-wrap-ansi": "^0.1.3",
        "sisteransi": "^1.0.5"
      }
    },
    "node_modules/@clack/prompts": {
      "version": "1.2.0",
      "resolved": "https://registry.npmmirror.com/@clack/prompts/-/prompts-1.2.0.tgz",
      "integrity": "sha512-4jmztR9fMqPMjz6H/UZXj0zEmE43ha1euENwkckKKel4XpSfokExPo5AiVStdHSAlHekz4d0CA/r45Ok1E4D3w==",
      "license": "MIT",
      "dependencies": {
        "@clack/core": "1.2.0",
        "fast-string-width": "^1.1.0",
        "fast-wrap-ansi": "^0.1.3",
        "sisteransi": "^1.0.5"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.9.2",
      "resolved": "https://registry.npmmirror.com/@emnapi/runtime/-/runtime-1.9.2.tgz",
      "integrity": "sha512-3U4+MIWHImeyu1wnmVygh5WlgfYDtyf0k8AbLhMFxOipihf6nrWC4syIm/SwEeec0mNSafiiNnMJwbza/Is6Lw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/aix-ppc64/-/aix-ppc64-0.27.7.tgz",
      "integrity": "sha512-EKX3Qwmhz1eMdEJokhALr0YiD0lhQNwDqkPYyPhiSwKrh7/4KRjQc04sZ8db+5DVVnZ1LmbNDI1uAMPEUBnQPg==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/android-arm/-/android-arm-0.27.7.tgz",
      "integrity": "sha512-jbPXvB4Yj2yBV7HUfE2KHe4GJX51QplCN1pGbYjvsyCZbQmies29EoJbkEc+vYuU5o45AfQn37vZlyXy4YJ8RQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/android-arm64/-/android-arm64-0.27.7.tgz",
      "integrity": "sha512-62dPZHpIXzvChfvfLJow3q5dDtiNMkwiRzPylSCfriLvZeq0a1bWChrGx/BbUbPwOrsWKMn8idSllklzBy+dgQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/android-x64/-/android-x64-0.27.7.tgz",
      "integrity": "sha512-x5VpMODneVDb70PYV2VQOmIUUiBtY3D3mPBG8NxVk5CogneYhkR7MmM3yR/uMdITLrC1ml/NV1rj4bMJuy9MCg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/darwin-arm64/-/darwin-arm64-0.27.7.tgz",
      "integrity": "sha512-5lckdqeuBPlKUwvoCXIgI2D9/ABmPq3Rdp7IfL70393YgaASt7tbju3Ac+ePVi3KDH6N2RqePfHnXkaDtY9fkw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/darwin-x64/-/darwin-x64-0.27.7.tgz",
      "integrity": "sha512-rYnXrKcXuT7Z+WL5K980jVFdvVKhCHhUwid+dDYQpH+qu+TefcomiMAJpIiC2EM3Rjtq0sO3StMV/+3w3MyyqQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/freebsd-arm64/-/freebsd-arm64-0.27.7.tgz",
      "integrity": "sha512-B48PqeCsEgOtzME2GbNM2roU29AMTuOIN91dsMO30t+Ydis3z/3Ngoj5hhnsOSSwNzS+6JppqWsuhTp6E82l2w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/freebsd-x64/-/freebsd-x64-0.27.7.tgz",
      "integrity": "sha512-jOBDK5XEjA4m5IJK3bpAQF9/Lelu/Z9ZcdhTRLf4cajlB+8VEhFFRjWgfy3M1O4rO2GQ/b2dLwCUGpiF/eATNQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-arm/-/linux-arm-0.27.7.tgz",
      "integrity": "sha512-RkT/YXYBTSULo3+af8Ib0ykH8u2MBh57o7q/DAs3lTJlyVQkgQvlrPTnjIzzRPQyavxtPtfg0EopvDyIt0j1rA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-arm64/-/linux-arm64-0.27.7.tgz",
      "integrity": "sha512-RZPHBoxXuNnPQO9rvjh5jdkRmVizktkT7TCDkDmQ0W2SwHInKCAV95GRuvdSvA7w4VMwfCjUiPwDi0ZO6Nfe9A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-ia32/-/linux-ia32-0.27.7.tgz",
      "integrity": "sha512-GA48aKNkyQDbd3KtkplYWT102C5sn/EZTY4XROkxONgruHPU72l+gW+FfF8tf2cFjeHaRbWpOYa/uRBz/Xq1Pg==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-loong64/-/linux-loong64-0.27.7.tgz",
      "integrity": "sha512-a4POruNM2oWsD4WKvBSEKGIiWQF8fZOAsycHOt6JBpZ+JN2n2JH9WAv56SOyu9X5IqAjqSIPTaJkqN8F7XOQ5Q==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-mips64el/-/linux-mips64el-0.27.7.tgz",
      "integrity": "sha512-KabT5I6StirGfIz0FMgl1I+R1H73Gp0ofL9A3nG3i/cYFJzKHhouBV5VWK1CSgKvVaG4q1RNpCTR2LuTVB3fIw==",
      "cpu": [
        "mips64el"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-ppc64/-/linux-ppc64-0.27.7.tgz",
      "integrity": "sha512-gRsL4x6wsGHGRqhtI+ifpN/vpOFTQtnbsupUF5R5YTAg+y/lKelYR1hXbnBdzDjGbMYjVJLJTd2OFmMewAgwlQ==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-riscv64/-/linux-riscv64-0.27.7.tgz",
      "integrity": "sha512-hL25LbxO1QOngGzu2U5xeXtxXcW+/GvMN3ejANqXkxZ/opySAZMrc+9LY/WyjAan41unrR3YrmtTsUpwT66InQ==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-s390x/-/linux-s390x-0.27.7.tgz",
      "integrity": "sha512-2k8go8Ycu1Kb46vEelhu1vqEP+UeRVj2zY1pSuPdgvbd5ykAw82Lrro28vXUrRmzEsUV0NzCf54yARIK8r0fdw==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/linux-x64/-/linux-x64-0.27.7.tgz",
      "integrity": "sha512-hzznmADPt+OmsYzw1EE33ccA+HPdIqiCRq7cQeL1Jlq2gb1+OyWBkMCrYGBJ+sxVzve2ZJEVeePbLM2iEIZSxA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/netbsd-arm64/-/netbsd-arm64-0.27.7.tgz",
      "integrity": "sha512-b6pqtrQdigZBwZxAn1UpazEisvwaIDvdbMbmrly7cDTMFnw/+3lVxxCTGOrkPVnsYIosJJXAsILG9XcQS+Yu6w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/netbsd-x64/-/netbsd-x64-0.27.7.tgz",
      "integrity": "sha512-OfatkLojr6U+WN5EDYuoQhtM+1xco+/6FSzJJnuWiUw5eVcicbyK3dq5EeV/QHT1uy6GoDhGbFpprUiHUYggrw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/openbsd-arm64/-/openbsd-arm64-0.27.7.tgz",
      "integrity": "sha512-AFuojMQTxAz75Fo8idVcqoQWEHIXFRbOc1TrVcFSgCZtQfSdc1RXgB3tjOn/krRHENUB4j00bfGjyl2mJrU37A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/openbsd-x64/-/openbsd-x64-0.27.7.tgz",
      "integrity": "sha512-+A1NJmfM8WNDv5CLVQYJ5PshuRm/4cI6WMZRg1by1GwPIQPCTs1GLEUHwiiQGT5zDdyLiRM/l1G0Pv54gvtKIg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/openharmony-arm64/-/openharmony-arm64-0.27.7.tgz",
      "integrity": "sha512-+KrvYb/C8zA9CU/g0sR6w2RBw7IGc5J2BPnc3dYc5VJxHCSF1yNMxTV5LQ7GuKteQXZtspjFbiuW5/dOj7H4Yw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/sunos-x64/-/sunos-x64-0.27.7.tgz",
      "integrity": "sha512-ikktIhFBzQNt/QDyOL580ti9+5mL/YZeUPKU2ivGtGjdTYoqz6jObj6nOMfhASpS4GU4Q/Clh1QtxWAvcYKamA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/win32-arm64/-/win32-arm64-0.27.7.tgz",
      "integrity": "sha512-7yRhbHvPqSpRUV7Q20VuDwbjW5kIMwTHpptuUzV+AA46kiPze5Z7qgt6CLCK3pWFrHeNfDd1VKgyP4O+ng17CA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/win32-ia32/-/win32-ia32-0.27.7.tgz",
      "integrity": "sha512-SmwKXe6VHIyZYbBLJrhOoCJRB/Z1tckzmgTLfFYOfpMAx63BJEaL9ExI8x7v0oAO3Zh6D/Oi1gVxEYr5oUCFhw==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/@esbuild/win32-x64/-/win32-x64-0.27.7.tgz",
      "integrity": "sha512-56hiAJPhwQ1R4i+21FVF7V8kSD5zZTdHcVuRFMW0hn753vVfQN8xlx4uOPT4xoGH0Z/oVATuR82AiqSTDIpaHg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmmirror.com/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.34.5.tgz",
      "integrity": "sha512-imtQ3WMJXbMY4fxb/Ndp6HBTNVtWCUI0WdobyheGf5+ad6xX8VIDO8u2xE4qc/fr08CKG/7dDseFtn6M6g/r3w==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.34.5.tgz",
      "integrity": "sha512-YNEFAF/4KQ/PeW0N+r+aVVsoIY0/qxxikF2SWdp+NRkmMB7y9LBZAVqQ4yhGCm/H3H270OSykqmQMKLBhBJDEw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.2.4.tgz",
      "integrity": "sha512-zqjjo7RatFfFoP0MkQ51jfuFZBnVE2pRiaydKJ1G/rHZvnsrHAOcQALIi9sA5co5xenQdTugCvtb1cuf78Vf4g==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.2.4.tgz",
      "integrity": "sha512-1IOd5xfVhlGwX+zXv2N93k0yMONvUlANylbJw1eTah8K/Jtpi15KC+WSiaX/nBmbm2HxRM1gZ0nSdjSsrZbGKg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.2.4.tgz",
      "integrity": "sha512-bFI7xcKFELdiNCVov8e44Ia4u2byA+l3XtsAj+Q8tfCwO6BQ8iDojYdvoPMqsKDkuoOo+X6HZA0s0q11ANMQ8A==",
      "cpu": [
        "arm"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.2.4.tgz",
      "integrity": "sha512-excjX8DfsIcJ10x1Kzr4RcWe1edC9PquDRRPx3YVCvQv+U5p7Yin2s32ftzikXojb1PIFc/9Mt28/y+iRklkrw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.2.4.tgz",
      "integrity": "sha512-FMuvGijLDYG6lW+b/UvyilUWu5Ayu+3r2d1S8notiGCIyYU/76eig1UfMmkZ7vwgOrzKzlQbFSuQfgm7GYUPpA==",
      "cpu": [
        "ppc64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.2.4.tgz",
      "integrity": "sha512-oVDbcR4zUC0ce82teubSm+x6ETixtKZBh/qbREIOcI3cULzDyb18Sr/Wcyx7NRQeQzOiHTNbZFF1UwPS2scyGA==",
      "cpu": [
        "riscv64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.2.4.tgz",
      "integrity": "sha512-qmp9VrzgPgMoGZyPvrQHqk02uyjA0/QrTO26Tqk6l4ZV0MPWIW6LTkqOIov+J1yEu7MbFQaDpwdwJKhbJvuRxQ==",
      "cpu": [
        "s390x"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.2.4.tgz",
      "integrity": "sha512-tJxiiLsmHc9Ax1bz3oaOYBURTXGIRDODBqhveVHonrHJ9/+k89qbLl0bcJns+e4t4rvaNBxaEZsFtSfAdquPrw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.2.4.tgz",
      "integrity": "sha512-FVQHuwx1IIuNow9QAbYUzJ+En8KcVm9Lk5+uGUQJHaZmMECZmOlix9HnH7n1TRkXMS0pGxIJokIVB9SuqZGGXw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmmirror.com/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.2.4.tgz",
      "integrity": "sha512-+LpyBk7L44ZIXwz/VYfglaX/okxezESc6UxDSoyo2Ks6Jxc4Y7sGjpgU9s4PMgqgjj1gZCylTieNamqA1MF7Dg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-arm/-/sharp-linux-arm-0.34.5.tgz",
      "integrity": "sha512-9dLqsvwtg1uuXBGZKsxem9595+ujv0sJ6Vi8wcTANSFpwV/GONat5eCkzQo/1O6zRIkh0m/8+5BjrRr7jDUSZw==",
      "cpu": [
        "arm"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.34.5.tgz",
      "integrity": "sha512-bKQzaJRY/bkPOXyKx5EVup7qkaojECG6NLYswgktOZjaXecSAeCWiZwwiFf3/Y+O1HrauiE3FVsGxFg8c24rZg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.34.5.tgz",
      "integrity": "sha512-7zznwNaqW6YtsfrGGDA6BRkISKAAE1Jo0QdpNYXNMHu2+0dTrPflTLNkpc8l7MUP5M16ZJcUvysVWWrMefZquA==",
      "cpu": [
        "ppc64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.34.5.tgz",
      "integrity": "sha512-51gJuLPTKa7piYPaVs8GmByo7/U7/7TZOq+cnXJIHZKavIRHAP77e3N2HEl3dgiqdD/w0yUfiJnII77PuDDFdw==",
      "cpu": [
        "riscv64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.34.5.tgz",
      "integrity": "sha512-nQtCk0PdKfho3eC5MrbQoigJ2gd1CgddUMkabUj+rBevs8tZ2cULOx46E7oyX+04WGfABgIwmMC0VqieTiR4jg==",
      "cpu": [
        "s390x"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linux-x64/-/sharp-linux-x64-0.34.5.tgz",
      "integrity": "sha512-MEzd8HPKxVxVenwAa+JRPwEC7QFjoPWuS5NZnBt6B3pu7EG2Ge0id1oLHZpPJdn3OQK+BQDiw9zStiHBTJQQQQ==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.34.5.tgz",
      "integrity": "sha512-fprJR6GtRsMt6Kyfq44IsChVZeGN97gTD331weR1ex1c1rypDEABN6Tm2xa1wE6lYb5DdEnk03NZPqA7Id21yg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.34.5.tgz",
      "integrity": "sha512-Jg8wNT1MUzIvhBFxViqrEhWDGzqymo3sV7z7ZsaWbZNDLXRJZoRGrjulp60YYtV4wfY8VIKcWidjojlLcWrd8Q==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-wasm32/-/sharp-wasm32-0.34.5.tgz",
      "integrity": "sha512-OdWTEiVkY2PHwqkbBI8frFxQQFekHaSSkUIJkwzclWZe64O1X4UlUjqqqLaPbUpMOQk6FBu/HtlGXNblIs0huw==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.7.0"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.34.5.tgz",
      "integrity": "sha512-WQ3AgWCWYSb2yt+IG8mnC6Jdk9Whs7O0gxphblsLvdhSpSTtmu69ZG1Gkb6NuvxsNACwiPV6cNSZNzt0KPsw7g==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.34.5.tgz",
      "integrity": "sha512-FV9m/7NmeCmSHDD5j4+4pNI8Cp3aW+JvLoXcTUo0IqyjSfAZJ8dIUmijx1qaJsIiU+Hosw6xM5KijAWRJCSgNg==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/@img/sharp-win32-x64/-/sharp-win32-x64-0.34.5.tgz",
      "integrity": "sha512-+29YMsqY2/9eFEiW93eqWnuLcWcufowXewwSNIT6UwZdUUCrM3oFjMWH/Z6/TMmb4hlFenmfAVbpWeup2jryCw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@isaacs/fs-minipass": {
      "version": "4.0.1",
      "resolved": "https://registry.npmmirror.com/@isaacs/fs-minipass/-/fs-minipass-4.0.1.tgz",
      "integrity": "sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==",
      "license": "ISC",
      "dependencies": {
        "minipass": "^7.0.4"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmmirror.com/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmmirror.com/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmmirror.com/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmmirror.com/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmmirror.com/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@mapbox/node-pre-gyp": {
      "version": "2.0.3",
      "resolved": "https://registry.npmmirror.com/@mapbox/node-pre-gyp/-/node-pre-gyp-2.0.3.tgz",
      "integrity": "sha512-uwPAhccfFJlsfCxMYTwOdVfOz3xqyj8xYL3zJj8f0pb30tLohnnFPhLuqp4/qoEz8sNxe4SESZedcBojRefIzg==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "consola": "^3.2.3",
        "detect-libc": "^2.0.0",
        "https-proxy-agent": "^7.0.5",
        "node-fetch": "^2.6.7",
        "nopt": "^8.0.0",
        "semver": "^7.5.3",
        "tar": "^7.4.0"
      },
      "bin": {
        "node-pre-gyp": "bin/node-pre-gyp"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@oslojs/encoding": {
      "version": "1.1.0",
      "resolved": "https://registry.npmmirror.com/@oslojs/encoding/-/encoding-1.1.0.tgz",
      "integrity": "sha512-70wQhgYmndg4GCPxPPxPGevRKqTIJ2Nh4OkiMWmDAVYsTQ+Ta7Sq+rPevXyXGdzr30/qZBnyOalCszoMxlyldQ==",
      "license": "MIT"
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.3",
      "resolved": "https://registry.npmmirror.com/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.3.tgz",
      "integrity": "sha512-eybk3TjzzzV97Dlj5c+XrBFW57eTNhzod66y9HrBlzJ6NsCrWCp/2kaPS3K9wJmurBC0Tdw4yPjXKZqlznim3Q==",
      "license": "MIT"
    },
    "node_modules/@rollup/pluginutils": {
      "version": "5.3.0",
      "resolved": "https://registry.npmmirror.com/@rollup/pluginutils/-/pluginutils-5.3.0.tgz",
      "integrity": "sha512-5EdhGZtnu3V88ces7s53hhfK5KSASnJZv8Lulpc04cWO3REESroJXg73DFsOmgbU2BhwV0E20bu2IDZb3VKW4Q==",
      "license": "MIT",
      "dependencies": {
        "@types/estree": "^1.0.0",
        "estree-walker": "^2.0.2",
        "picomatch": "^4.0.2"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "rollup": "^1.20.0||^2.0.0||^3.0.0||^4.0.0"
      },
      "peerDependenciesMeta": {
        "rollup": {
          "optional": true
        }
      }
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.60.1.tgz",
      "integrity": "sha512-d6FinEBLdIiK+1uACUttJKfgZREXrF0Qc2SmLII7W2AD8FfiZ9Wjd+rD/iRuf5s5dWrr1GgwXCvPqOuDquOowA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.60.1.tgz",
      "integrity": "sha512-YjG/EwIDvvYI1YvYbHvDz/BYHtkY4ygUIXHnTdLhG+hKIQFBiosfWiACWortsKPKU/+dUwQQCKQM3qrDe8c9BA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.60.1.tgz",
      "integrity": "sha512-mjCpF7GmkRtSJwon+Rq1N8+pI+8l7w5g9Z3vWj4T7abguC4Czwi3Yu/pFaLvA3TTeMVjnu3ctigusqWUfjZzvw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.60.1.tgz",
      "integrity": "sha512-haZ7hJ1JT4e9hqkoT9R/19XW2QKqjfJVv+i5AGg57S+nLk9lQnJ1F/eZloRO3o9Scy9CM3wQ9l+dkXtcBgN5Ew==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.60.1.tgz",
      "integrity": "sha512-czw90wpQq3ZsAVBlinZjAYTKduOjTywlG7fEeWKUA7oCmpA8xdTkxZZlwNJKWqILlq0wehoZcJYfBvOyhPTQ6w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.60.1.tgz",
      "integrity": "sha512-KVB2rqsxTHuBtfOeySEyzEOB7ltlB/ux38iu2rBQzkjbwRVlkhAGIEDiiYnO2kFOkJp+Z7pUXKyrRRFuFUKt+g==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.60.1.tgz",
      "integrity": "sha512-L+34Qqil+v5uC0zEubW7uByo78WOCIrBvci69E7sFASRl0X7b/MB6Cqd1lky/CtcSVTydWa2WZwFuWexjS5o6g==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.60.1.tgz",
      "integrity": "sha512-n83O8rt4v34hgFzlkb1ycniJh7IR5RCIqt6mz1VRJD6pmhRi0CXdmfnLu9dIUS6buzh60IvACM842Ffb3xd6Gg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.60.1.tgz",
      "integrity": "sha512-Nql7sTeAzhTAja3QXeAI48+/+GjBJ+QmAH13snn0AJSNL50JsDqotyudHyMbO2RbJkskbMbFJfIJKWA6R1LCJQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.60.1.tgz",
      "integrity": "sha512-+pUymDhd0ys9GcKZPPWlFiZ67sTWV5UU6zOJat02M1+PiuSGDziyRuI/pPue3hoUwm2uGfxdL+trT6Z9rxnlMA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.60.1.tgz",
      "integrity": "sha512-VSvgvQeIcsEvY4bKDHEDWcpW4Yw7BtlKG1GUT4FzBUlEKQK0rWHYBqQt6Fm2taXS+1bXvJT6kICu5ZwqKCnvlQ==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.60.1.tgz",
      "integrity": "sha512-4LqhUomJqwe641gsPp6xLfhqWMbQV04KtPp7/dIp0nzPxAkNY1AbwL5W0MQpcalLYk07vaW9Kp1PBhdpZYYcEw==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.60.1.tgz",
      "integrity": "sha512-tLQQ9aPvkBxOc/EUT6j3pyeMD6Hb8QF2BTBnCQWP/uu1lhc9AIrIjKnLYMEroIz/JvtGYgI9dF3AxHZNaEH0rw==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.60.1.tgz",
      "integrity": "sha512-RMxFhJwc9fSXP6PqmAz4cbv3kAyvD1etJFjTx4ONqFP9DkTkXsAMU4v3Vyc5BgzC+anz7nS/9tp4obsKfqkDHg==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.60.1.tgz",
      "integrity": "sha512-QKgFl+Yc1eEk6MmOBfRHYF6lTxiiiV3/z/BRrbSiW2I7AFTXoBFvdMEyglohPj//2mZS4hDOqeB0H1ACh3sBbg==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.60.1.tgz",
      "integrity": "sha512-RAjXjP/8c6ZtzatZcA1RaQr6O1TRhzC+adn8YZDnChliZHviqIjmvFwHcxi4JKPSDAt6Uhf/7vqcBzQJy0PDJg==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.60.1.tgz",
      "integrity": "sha512-wcuocpaOlaL1COBYiA89O6yfjlp3RwKDeTIA0hM7OpmhR1Bjo9j31G1uQVpDlTvwxGn2nQs65fBFL5UFd76FcQ==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.60.1.tgz",
      "integrity": "sha512-77PpsFQUCOiZR9+LQEFg9GClyfkNXj1MP6wRnzYs0EeWbPcHs02AXu4xuUbM1zhwn3wqaizle3AEYg5aeoohhg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.60.1.tgz",
      "integrity": "sha512-5cIATbk5vynAjqqmyBjlciMJl1+R/CwX9oLk/EyiFXDWd95KpHdrOJT//rnUl4cUcskrd0jCCw3wpZnhIHdD9w==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.60.1.tgz",
      "integrity": "sha512-cl0w09WsCi17mcmWqqglez9Gk8isgeWvoUZ3WiJFYSR3zjBQc2J5/ihSjpl+VLjPqjQ/1hJRcqBfLjssREQILw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.60.1.tgz",
      "integrity": "sha512-4Cv23ZrONRbNtbZa37mLSueXUCtN7MXccChtKpUnQNgF010rjrjfHx3QxkS2PI7LqGT5xXyYs1a7LbzAwT0iCA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.60.1.tgz",
      "integrity": "sha512-i1okWYkA4FJICtr7KpYzFpRTHgy5jdDbZiWfvny21iIKky5YExiDXP+zbXzm3dUcFpkEeYNHgQ5fuG236JPq0g==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.60.1.tgz",
      "integrity": "sha512-u09m3CuwLzShA0EYKMNiFgcjjzwqtUMLmuCJLeZWjjOYA3IT2Di09KaxGBTP9xVztWyIWjVdsB2E9goMjZvTQg==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.60.1.tgz",
      "integrity": "sha512-k+600V9Zl1CM7eZxJgMyTUzmrmhB/0XZnF4pRypKAlAgxmedUA+1v9R+XOFv56W4SlHEzfeMtzujLJD22Uz5zg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.60.1.tgz",
      "integrity": "sha512-lWMnixq/QzxyhTV6NjQJ4SFo1J6PvOX8vUx5Wb4bBPsEb+8xZ89Bz6kOXpfXj9ak9AHTQVQzlgzBEc1SyM27xQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@shikijs/core": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/core/-/core-4.0.2.tgz",
      "integrity": "sha512-hxT0YF4ExEqB8G/qFdtJvpmHXBYJ2lWW7qTHDarVkIudPFE6iCIrqdgWxGn5s+ppkGXI0aEGlibI0PAyzP3zlw==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/primitive": "4.0.2",
        "@shikijs/types": "4.0.2",
        "@shikijs/vscode-textmate": "^10.0.2",
        "@types/hast": "^3.0.4",
        "hast-util-to-html": "^9.0.5"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@shikijs/engine-javascript": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/engine-javascript/-/engine-javascript-4.0.2.tgz",
      "integrity": "sha512-7PW0Nm49DcoUIQEXlJhNNBHyoGMjalRETTCcjMqEaMoJRLljy1Bi/EGV3/qLBgLKQejdspiiYuHGQW6dX94Nag==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/types": "4.0.2",
        "@shikijs/vscode-textmate": "^10.0.2",
        "oniguruma-to-es": "^4.3.4"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@shikijs/engine-oniguruma": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/engine-oniguruma/-/engine-oniguruma-4.0.2.tgz",
      "integrity": "sha512-UpCB9Y2sUKlS9z8juFSKz7ZtysmeXCgnRF0dlhXBkmQnek7lAToPte8DkxmEYGNTMii72zU/lyXiCB6StuZeJg==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/types": "4.0.2",
        "@shikijs/vscode-textmate": "^10.0.2"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@shikijs/langs": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/langs/-/langs-4.0.2.tgz",
      "integrity": "sha512-KaXby5dvoeuZzN0rYQiPMjFoUrz4hgwIE+D6Du9owcHcl6/g16/yT5BQxSW5cGt2MZBz6Hl0YuRqf12omRfUUg==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/types": "4.0.2"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@shikijs/primitive": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/primitive/-/primitive-4.0.2.tgz",
      "integrity": "sha512-M6UMPrSa3fN5ayeJwFVl9qWofl273wtK1VG8ySDZ1mQBfhCpdd8nEx7nPZ/tk7k+TYcpqBZzj/AnwxT9lO+HJw==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/types": "4.0.2",
        "@shikijs/vscode-textmate": "^10.0.2",
        "@types/hast": "^3.0.4"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@shikijs/themes": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/themes/-/themes-4.0.2.tgz",
      "integrity": "sha512-mjCafwt8lJJaVSsQvNVrJumbnnj1RI8jbUKrPKgE6E3OvQKxnuRoBaYC51H4IGHePsGN/QtALglWBU7DoKDFnA==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/types": "4.0.2"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@shikijs/types": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/types/-/types-4.0.2.tgz",
      "integrity": "sha512-qzbeRooUTPnLE+sHD/Z8DStmaDgnbbc/pMrU203950aRqjX/6AFHeDYT+j00y2lPdz0ywJKx7o/7qnqTivtlXg==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/vscode-textmate": "^10.0.2",
        "@types/hast": "^3.0.4"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@shikijs/vscode-textmate": {
      "version": "10.0.2",
      "resolved": "https://registry.npmmirror.com/@shikijs/vscode-textmate/-/vscode-textmate-10.0.2.tgz",
      "integrity": "sha512-83yeghZ2xxin3Nj8z1NMd/NCuca+gsYXswywDy5bHvwlWL8tpTQmzGeUuHd9FC3E/SBEMvzJRwWEOz5gGes9Qg==",
      "license": "MIT"
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/node/-/node-4.2.2.tgz",
      "integrity": "sha512-pXS+wJ2gZpVXqFaUEjojq7jzMpTGf8rU6ipJz5ovJV6PUGmlJ+jvIwGrzdHdQ80Sg+wmQxUFuoW1UAAwHNEdFA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.19.0",
        "jiti": "^2.6.1",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide/-/oxide-4.2.2.tgz",
      "integrity": "sha512-qEUA07+E5kehxYp9BVMpq9E8vnJuBHfJEC0vPC5e7iL/hw7HR61aDKoVoKzrG+QKp56vhNZe4qwkRmMC0zDLvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-x64": "4.2.2",
        "@tailwindcss/oxide-freebsd-x64": "4.2.2",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-musl": "4.2.2",
        "@tailwindcss/oxide-linux-x64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-x64-musl": "4.2.2",
        "@tailwindcss/oxide-wasm32-wasi": "4.2.2",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.2.2",
        "@tailwindcss/oxide-win32-x64-msvc": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.2.2.tgz",
      "integrity": "sha512-dXGR1n+P3B6748jZO/SvHZq7qBOqqzQ+yFrXpoOWWALWndF9MoSKAT3Q0fYgAzYzGhxNYOoysRvYlpixRBBoDg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.2.2.tgz",
      "integrity": "sha512-iq9Qjr6knfMpZHj55/37ouZeykwbDqF21gPFtfnhCCKGDcPI/21FKC9XdMO/XyBM7qKORx6UIhGgg6jLl7BZlg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.2.2.tgz",
      "integrity": "sha512-BlR+2c3nzc8f2G639LpL89YY4bdcIdUmiOOkv2GQv4/4M0vJlpXEa0JXNHhCHU7VWOKWT/CjqHdTP8aUuDJkuw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.2.2.tgz",
      "integrity": "sha512-YUqUgrGMSu2CDO82hzlQ5qSb5xmx3RUrke/QgnoEx7KvmRJHQuZHZmZTLSuuHwFf0DJPybFMXMYf+WJdxHy/nQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.2.2.tgz",
      "integrity": "sha512-FPdhvsW6g06T9BWT0qTwiVZYE2WIFo2dY5aCSpjG/S/u1tby+wXoslXS0kl3/KXnULlLr1E3NPRRw0g7t2kgaQ==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.2.2.tgz",
      "integrity": "sha512-4og1V+ftEPXGttOO7eCmW7VICmzzJWgMx+QXAJRAhjrSjumCwWqMfkDrNu1LXEQzNAwz28NCUpucgQPrR4S2yw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.2.2.tgz",
      "integrity": "sha512-oCfG/mS+/+XRlwNjnsNLVwnMWYH7tn/kYPsNPh+JSOMlnt93mYNCKHYzylRhI51X+TbR+ufNhhKKzm6QkqX8ag==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.2.2.tgz",
      "integrity": "sha512-rTAGAkDgqbXHNp/xW0iugLVmX62wOp2PoE39BTCGKjv3Iocf6AFbRP/wZT/kuCxC9QBh9Pu8XPkv/zCZB2mcMg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.2.2.tgz",
      "integrity": "sha512-XW3t3qwbIwiSyRCggeO2zxe3KWaEbM0/kW9e8+0XpBgyKU4ATYzcVSMKteZJ1iukJ3HgHBjbg9P5YPRCVUxlnQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.2.2.tgz",
      "integrity": "sha512-eKSztKsmEsn1O5lJ4ZAfyn41NfG7vzCg496YiGtMDV86jz1q/irhms5O0VrY6ZwTUkFy/EKG3RfWgxSI3VbZ8Q==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.8.1",
        "@emnapi/runtime": "^1.8.1",
        "@emnapi/wasi-threads": "^1.1.0",
        "@napi-rs/wasm-runtime": "^1.1.1",
        "@tybys/wasm-util": "^0.10.1",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.2.2.tgz",
      "integrity": "sha512-qPmaQM4iKu5mxpsrWZMOZRgZv1tOZpUm+zdhhQP0VhJfyGGO3aUKdbh3gDZc/dPLQwW4eSqWGrrcWNBZWUWaXQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.2.2.tgz",
      "integrity": "sha512-1T/37VvI7WyH66b+vqHj/cLwnCxt7Qt3WFu5Q8hk65aOvlwAhs7rAp1VkulBJw/N4tMirXjVnylTR72uI0HGcA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/@tailwindcss/vite/-/vite-4.2.2.tgz",
      "integrity": "sha512-mEiF5HO1QqCLXoNEfXVA1Tzo+cYsrqV7w9Juj2wdUFyW07JRenqMG225MvPwr3ZD9N1bFQj46X7r33iHxLUW0w==",
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.2.2",
        "@tailwindcss/oxide": "4.2.2",
        "tailwindcss": "4.2.2"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7 || ^8"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmmirror.com/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmmirror.com/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmmirror.com/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmmirror.com/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/debug": {
      "version": "4.1.13",
      "resolved": "https://registry.npmmirror.com/@types/debug/-/debug-4.1.13.tgz",
      "integrity": "sha512-KSVgmQmzMwPlmtljOomayoR89W4FynCAi3E8PPs7vmDVPe84hT+vGPKkJfThkmXs0x0jAaa9U8uW8bbfyS2fWw==",
      "license": "MIT",
      "dependencies": {
        "@types/ms": "*"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmmirror.com/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "license": "MIT"
    },
    "node_modules/@types/hast": {
      "version": "3.0.4",
      "resolved": "https://registry.npmmirror.com/@types/hast/-/hast-3.0.4.tgz",
      "integrity": "sha512-WPs+bbQw5aCj+x6laNGWLH3wviHtoCv/P3+otBhbOhJgG8qtpdAMlTCxLtsTWA7LH1Oh/bFCHsBn0TPS5m30EQ==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "*"
      }
    },
    "node_modules/@types/mdast": {
      "version": "4.0.4",
      "resolved": "https://registry.npmmirror.com/@types/mdast/-/mdast-4.0.4.tgz",
      "integrity": "sha512-kGaNbPh1k7AFzgpud/gMdvIm5xuECykRR+JnWKQno9TAXVa6WIVCGTPvYGekIDL4uwCZQSYbUxNBSb1aUo79oA==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "*"
      }
    },
    "node_modules/@types/ms": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/@types/ms/-/ms-2.1.0.tgz",
      "integrity": "sha512-GsCCIZDE/p3i96vtEqx+7dBUGXrc7zeSK3wwPHIaRThS+9OhWIXRqzs4d6k1SVU8g91DrNRWxWUGhp5KXQb2VA==",
      "license": "MIT"
    },
    "node_modules/@types/nlcst": {
      "version": "2.0.3",
      "resolved": "https://registry.npmmirror.com/@types/nlcst/-/nlcst-2.0.3.tgz",
      "integrity": "sha512-vSYNSDe6Ix3q+6Z7ri9lyWqgGhJTmzRjZRqyq15N0Z/1/UnVsno9G/N40NBijoYx2seFDIl0+B2mgAb9mezUCA==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "*"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmmirror.com/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmmirror.com/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "license": "MIT",
      "peer": true,
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/unist": {
      "version": "3.0.3",
      "resolved": "https://registry.npmmirror.com/@types/unist/-/unist-3.0.3.tgz",
      "integrity": "sha512-ko/gIFJRv177XgZsZcBwnqJN5x/Gien8qNOn0D5bQU/zAzVf9Zt3BlcUiLqhV9y4ARk0GbT3tnUiPNgnTXzc/Q==",
      "license": "MIT"
    },
    "node_modules/@ungap/structured-clone": {
      "version": "1.3.0",
      "resolved": "https://registry.npmmirror.com/@ungap/structured-clone/-/structured-clone-1.3.0.tgz",
      "integrity": "sha512-WmoN8qaIAo7WTYWbAZuG8PYEhn5fkz7dZrqTBZ7dtt//lL2Gwms1IcnQ5yHqjDfX8Ft5j4YzDM23f87zBfDe9g==",
      "license": "ISC"
    },
    "node_modules/@vercel/functions": {
      "version": "3.4.3",
      "resolved": "https://registry.npmmirror.com/@vercel/functions/-/functions-3.4.3.tgz",
      "integrity": "sha512-kA14KIUVgAY6VXbhZ5jjY+s0883cV3cZqIU3WhrSRxuJ9KvxatMjtmzl0K23HK59oOUjYl7HaE/eYMmhmqpZzw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@vercel/oidc": "3.2.0"
      },
      "engines": {
        "node": ">= 20"
      },
      "peerDependencies": {
        "@aws-sdk/credential-provider-web-identity": "*"
      },
      "peerDependenciesMeta": {
        "@aws-sdk/credential-provider-web-identity": {
          "optional": true
        }
      }
    },
    "node_modules/@vercel/nft": {
      "version": "1.5.0",
      "resolved": "https://registry.npmmirror.com/@vercel/nft/-/nft-1.5.0.tgz",
      "integrity": "sha512-IWTDeIoWhQ7ZtRO/JRKH+jhmeQvZYhtGPmzw/QGDY+wDCQqfm25P9yIdoAFagu4fWsK4IwZXDFIjrmp5rRm/sA==",
      "license": "MIT",
      "dependencies": {
        "@mapbox/node-pre-gyp": "^2.0.0",
        "@rollup/pluginutils": "^5.1.3",
        "acorn": "^8.6.0",
        "acorn-import-attributes": "^1.9.5",
        "async-sema": "^3.1.1",
        "bindings": "^1.4.0",
        "estree-walker": "2.0.2",
        "glob": "^13.0.0",
        "graceful-fs": "^4.2.9",
        "node-gyp-build": "^4.2.2",
        "picomatch": "^4.0.2",
        "resolve-from": "^5.0.0"
      },
      "bin": {
        "nft": "out/cli.js"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/@vercel/oidc": {
      "version": "3.2.0",
      "resolved": "https://registry.npmmirror.com/@vercel/oidc/-/oidc-3.2.0.tgz",
      "integrity": "sha512-UycprH3T6n3jH0k44NHMa7pnFHGu/N05MjojYr+Mc6I7obkoLIJujSWwin1pCvdy/eOxrI/l3uDLQsmcrOb4ug==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@vercel/routing-utils": {
      "version": "5.3.3",
      "resolved": "https://registry.npmmirror.com/@vercel/routing-utils/-/routing-utils-5.3.3.tgz",
      "integrity": "sha512-KYm2sLNUD48gDScv8ob4ejc3Gww2jcJyW80hTdYlenAPz/5BQar1Gyh38xrUuZ532TUwSb5mV1uRbAuiykq0EQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "path-to-regexp": "6.1.0",
        "path-to-regexp-updated": "npm:path-to-regexp@6.3.0"
      },
      "optionalDependencies": {
        "ajv": "^6.12.3"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "5.2.0",
      "resolved": "https://registry.npmmirror.com/@vitejs/plugin-react/-/plugin-react-5.2.0.tgz",
      "integrity": "sha512-YmKkfhOAi3wsB1PhJq5Scj3GXMn3WvtQ/JC0xoopuHoXSdmtdStOpFrYaT1kie2YgFBcIe64ROzMYRjCrYOdYw==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.29.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-rc.3",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.18.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/abbrev": {
      "version": "3.0.1",
      "resolved": "https://registry.npmmirror.com/abbrev/-/abbrev-3.0.1.tgz",
      "integrity": "sha512-AO2ac6pjRB3SJmGJo+v5/aK6Omggp6fsLrs6wN9bd35ulu4cCwaAU9+7ZhXjeqHVkaHThLuzH0nZr0YpCDhygg==",
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmmirror.com/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "license": "MIT",
      "peer": true,
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-import-attributes": {
      "version": "1.9.5",
      "resolved": "https://registry.npmmirror.com/acorn-import-attributes/-/acorn-import-attributes-1.9.5.tgz",
      "integrity": "sha512-n02Vykv5uA3eHGM/Z2dQrcD56kL8TyDb2p1+0P83PClMnC/nc+anbQRhIOWnSq4Ke/KvDPrY3C9hDtC/A3eHnQ==",
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^8"
      }
    },
    "node_modules/agent-base": {
      "version": "7.1.4",
      "resolved": "https://registry.npmmirror.com/agent-base/-/agent-base-7.1.4.tgz",
      "integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/ajv": {
      "version": "6.14.0",
      "resolved": "https://registry.npmmirror.com/ajv/-/ajv-6.14.0.tgz",
      "integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmmirror.com/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/anymatch/node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmmirror.com/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "license": "Python-2.0"
    },
    "node_modules/aria-query": {
      "version": "5.3.2",
      "resolved": "https://registry.npmmirror.com/aria-query/-/aria-query-5.3.2.tgz",
      "integrity": "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/array-iterate": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/array-iterate/-/array-iterate-2.0.1.tgz",
      "integrity": "sha512-I1jXZMjAgCMmxT4qxXfPXa6SthSoE8h6gkSI9BGGNv8mP8G/v0blc+qFnZu6K42vTOiuME596QaLO0TP3Lk0xg==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/astro": {
      "version": "6.1.4",
      "resolved": "https://registry.npmmirror.com/astro/-/astro-6.1.4.tgz",
      "integrity": "sha512-SRy1bONuCHkGWhI5JiWCQKVDVbeaXOikjAVZs/Nz+lvUvubtdLoZfnacmuZHQ9RL2IOkU54M8/qZYm9ypJDKrg==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@astrojs/compiler": "^3.0.1",
        "@astrojs/internal-helpers": "0.8.0",
        "@astrojs/markdown-remark": "7.1.0",
        "@astrojs/telemetry": "3.3.0",
        "@capsizecss/unpack": "^4.0.0",
        "@clack/prompts": "^1.1.0",
        "@oslojs/encoding": "^1.1.0",
        "@rollup/pluginutils": "^5.3.0",
        "aria-query": "^5.3.2",
        "axobject-query": "^4.1.0",
        "ci-info": "^4.4.0",
        "clsx": "^2.1.1",
        "common-ancestor-path": "^2.0.0",
        "cookie": "^1.1.1",
        "devalue": "^5.6.3",
        "diff": "^8.0.3",
        "dlv": "^1.1.3",
        "dset": "^3.1.4",
        "es-module-lexer": "^2.0.0",
        "esbuild": "^0.27.3",
        "flattie": "^1.1.1",
        "fontace": "~0.4.1",
        "github-slugger": "^2.0.0",
        "html-escaper": "3.0.3",
        "http-cache-semantics": "^4.2.0",
        "js-yaml": "^4.1.1",
        "magic-string": "^0.30.21",
        "magicast": "^0.5.2",
        "mrmime": "^2.0.1",
        "neotraverse": "^0.6.18",
        "obug": "^2.1.1",
        "p-limit": "^7.3.0",
        "p-queue": "^9.1.0",
        "package-manager-detector": "^1.6.0",
        "piccolore": "^0.1.3",
        "picomatch": "^4.0.3",
        "rehype": "^13.0.2",
        "semver": "^7.7.4",
        "shiki": "^4.0.2",
        "smol-toml": "^1.6.0",
        "svgo": "^4.0.1",
        "tinyclip": "^0.1.12",
        "tinyexec": "^1.0.4",
        "tinyglobby": "^0.2.15",
        "tsconfck": "^3.1.6",
        "ultrahtml": "^1.6.0",
        "unifont": "~0.7.4",
        "unist-util-visit": "^5.1.0",
        "unstorage": "^1.17.4",
        "vfile": "^6.0.3",
        "vite": "^7.3.1",
        "vitefu": "^1.1.2",
        "xxhash-wasm": "^1.1.0",
        "yargs-parser": "^22.0.0",
        "zod": "^4.3.6"
      },
      "bin": {
        "astro": "bin/astro.mjs"
      },
      "engines": {
        "node": ">=22.12.0",
        "npm": ">=9.6.5",
        "pnpm": ">=7.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/astrodotbuild"
      },
      "optionalDependencies": {
        "sharp": "^0.34.0"
      }
    },
    "node_modules/async-sema": {
      "version": "3.1.1",
      "resolved": "https://registry.npmmirror.com/async-sema/-/async-sema-3.1.1.tgz",
      "integrity": "sha512-tLRNUXati5MFePdAk8dw7Qt7DpxPB60ofAgn8WRhW6a2rcimZnYBP9oxHiv0OHy+Wz7kPMG+t4LGdt31+4EmGg==",
      "license": "MIT"
    },
    "node_modules/axobject-query": {
      "version": "4.1.0",
      "resolved": "https://registry.npmmirror.com/axobject-query/-/axobject-query-4.1.0.tgz",
      "integrity": "sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/bail": {
      "version": "2.0.2",
      "resolved": "https://registry.npmmirror.com/bail/-/bail-2.0.2.tgz",
      "integrity": "sha512-0xO6mYd7JB2YesxDKplafRpsiOzPt9V02ddPCLbY1xYGPOX24NTyN50qnUxgCPcSoYMhKpAuBTjQoRZCAkUDRw==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmmirror.com/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.16",
      "resolved": "https://registry.npmmirror.com/baseline-browser-mapping/-/baseline-browser-mapping-2.10.16.tgz",
      "integrity": "sha512-Lyf3aK28zpsD1yQMiiHD4RvVb6UdMoo8xzG2XzFIfR9luPzOpcBlAsT/qfB1XWS1bxWT+UtE4WmQgsp297FYOA==",
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/bindings": {
      "version": "1.5.0",
      "resolved": "https://registry.npmmirror.com/bindings/-/bindings-1.5.0.tgz",
      "integrity": "sha512-p2q/t/mhvuOj/UeLlV6566GD/guowlr0hHxClI0W9m7MWYkL1F0hLo+0Aexs9HSPCtR1SXQ0TD3MMKrXZajbiQ==",
      "license": "MIT",
      "dependencies": {
        "file-uri-to-path": "1.0.0"
      }
    },
    "node_modules/boolbase": {
      "version": "1.0.0",
      "resolved": "https://registry.npmmirror.com/boolbase/-/boolbase-1.0.0.tgz",
      "integrity": "sha512-JZOSA7Mo9sNGB8+UjSgzdLtokWAky1zbztM3WRLCbZ70/3cTANmQmOdR7y2g+J0e2WXywy1yS468tY+IruqEww==",
      "license": "ISC"
    },
    "node_modules/brace-expansion": {
      "version": "5.0.5",
      "resolved": "https://registry.npmmirror.com/brace-expansion/-/brace-expansion-5.0.5.tgz",
      "integrity": "sha512-VZznLgtwhn+Mact9tfiwx64fA9erHH/MCXEUfB/0bX/6Fz6ny5EGTXYltMocqg4xFAQZtnO3DHWWXi8RiuN7cQ==",
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmmirror.com/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001786",
      "resolved": "https://registry.npmmirror.com/caniuse-lite/-/caniuse-lite-1.0.30001786.tgz",
      "integrity": "sha512-4oxTZEvqmLLrERwxO76yfKM7acZo310U+v4kqexI2TL1DkkUEMT8UijrxxcnVdxR3qkVf5awGRX+4Z6aPHVKrA==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/ccount": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/ccount/-/ccount-2.0.1.tgz",
      "integrity": "sha512-eyrF0jiFpY+3drT6383f1qhkbGsLSifNAjA61IUjZjmLCWjItY6LB9ft9YhoDgwfmclB2zhu51Lc7+95b8NRAg==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/character-entities": {
      "version": "2.0.2",
      "resolved": "https://registry.npmmirror.com/character-entities/-/character-entities-2.0.2.tgz",
      "integrity": "sha512-shx7oQ0Awen/BRIdkjkvz54PnEEI/EjwXDSIZp86/KKdbafHh1Df/RYGBhn4hbe2+uKC9FnT5UCEdyPz3ai9hQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/character-entities-html4": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/character-entities-html4/-/character-entities-html4-2.1.0.tgz",
      "integrity": "sha512-1v7fgQRj6hnSwFpq1Eu0ynr/CDEw0rXo2B61qXrLNdHZmPKgb7fqS1a2JwF0rISo9q77jDI8VMEHoApn8qDoZA==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/character-entities-legacy": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/character-entities-legacy/-/character-entities-legacy-3.0.0.tgz",
      "integrity": "sha512-RpPp0asT/6ufRm//AJVwpViZbGM/MkjQFxJccQRHmISF/22NBtsHqAWmL+/pmkPWoIUJdWyeVleTl1wydHATVQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/chokidar": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/chokidar/-/chokidar-5.0.0.tgz",
      "integrity": "sha512-TQMmc3w+5AxjpL8iIiwebF73dRDF4fBIieAqGn9RGCWaEVwQ6Fb2cGe31Yns0RRIzii5goJ1Y7xbMwo1TxMplw==",
      "license": "MIT",
      "dependencies": {
        "readdirp": "^5.0.0"
      },
      "engines": {
        "node": ">= 20.19.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/chownr": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/chownr/-/chownr-3.0.0.tgz",
      "integrity": "sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/ci-info": {
      "version": "4.4.0",
      "resolved": "https://registry.npmmirror.com/ci-info/-/ci-info-4.4.0.tgz",
      "integrity": "sha512-77PSwercCZU2Fc4sX94eF8k8Pxte6JAwL4/ICZLFjJLqegs7kCuAsqqj/70NQF6TvDpgFjkubQB2FW2ZZddvQg==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/sibiraj-s"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmmirror.com/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/comma-separated-tokens": {
      "version": "2.0.3",
      "resolved": "https://registry.npmmirror.com/comma-separated-tokens/-/comma-separated-tokens-2.0.3.tgz",
      "integrity": "sha512-Fu4hJdvzeylCfQPp9SGWidpzrMs7tTrlu6Vb8XGaRGck8QSNZJJp538Wrb60Lax4fPwR64ViY468OIUTbRlGZg==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/commander": {
      "version": "11.1.0",
      "resolved": "https://registry.npmmirror.com/commander/-/commander-11.1.0.tgz",
      "integrity": "sha512-yPVavfyCcRhmorC7rWlkHn15b4wDVgVmBA7kV4QVBsF7kv/9TKJAbAXVTxvTnwP8HHKjRCJDClKbciiYS7p0DQ==",
      "license": "MIT",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/common-ancestor-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/common-ancestor-path/-/common-ancestor-path-2.0.0.tgz",
      "integrity": "sha512-dnN3ibLeoRf2HNC+OlCiNc5d2zxbLJXOtiZUudNFSXZrNSydxcCsSpRzXwfu7BBWCIfHPw+xTayeBvJCP/D8Ng==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/consola": {
      "version": "3.4.2",
      "resolved": "https://registry.npmmirror.com/consola/-/consola-3.4.2.tgz",
      "integrity": "sha512-5IKcdX0nnYavi6G7TtOhwkYzyjfJlatbjMjuLSfE2kYT5pMDOilZ4OvMhi637CcDICTmz3wARPoyhqyX1Y+XvA==",
      "license": "MIT",
      "engines": {
        "node": "^14.18.0 || >=16.10.0"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmmirror.com/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cookie-es": {
      "version": "1.2.3",
      "resolved": "https://registry.npmmirror.com/cookie-es/-/cookie-es-1.2.3.tgz",
      "integrity": "sha512-lXVyvUvrNXblMqzIRrxHb57UUVmqsSWlxqt3XIjCkUP0wDAf6uicO6KMbEgYrMNtEvWgWHwe42CKxPu9MYAnWw==",
      "license": "MIT"
    },
    "node_modules/crossws": {
      "version": "0.3.5",
      "resolved": "https://registry.npmmirror.com/crossws/-/crossws-0.3.5.tgz",
      "integrity": "sha512-ojKiDvcmByhwa8YYqbQI/hg7MEU0NC03+pSdEq4ZUnZR9xXpwk7E43SMNGkn+JxJGPFtNvQ48+vV2p+P1ml5PA==",
      "license": "MIT",
      "dependencies": {
        "uncrypto": "^0.1.3"
      }
    },
    "node_modules/css-select": {
      "version": "5.2.2",
      "resolved": "https://registry.npmmirror.com/css-select/-/css-select-5.2.2.tgz",
      "integrity": "sha512-TizTzUddG/xYLA3NXodFM0fSbNizXjOKhqiQQwvhlspadZokn1KDy0NZFS0wuEubIYAV5/c1/lAr0TaaFXEXzw==",
      "license": "BSD-2-Clause",
      "dependencies": {
        "boolbase": "^1.0.0",
        "css-what": "^6.1.0",
        "domhandler": "^5.0.2",
        "domutils": "^3.0.1",
        "nth-check": "^2.0.1"
      },
      "funding": {
        "url": "https://github.com/sponsors/fb55"
      }
    },
    "node_modules/css-tree": {
      "version": "3.2.1",
      "resolved": "https://registry.npmmirror.com/css-tree/-/css-tree-3.2.1.tgz",
      "integrity": "sha512-X7sjQzceUhu1u7Y/ylrRZFU2FS6LRiFVp6rKLPg23y3x3c3DOKAwuXGDp+PAGjh6CSnCjYeAul8pcT8bAl+lSA==",
      "license": "MIT",
      "dependencies": {
        "mdn-data": "2.27.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12.20.0 || ^14.13.0 || >=15.0.0"
      }
    },
    "node_modules/css-what": {
      "version": "6.2.2",
      "resolved": "https://registry.npmmirror.com/css-what/-/css-what-6.2.2.tgz",
      "integrity": "sha512-u/O3vwbptzhMs3L1fQE82ZSLHQQfto5gyZzwteVIEyeaY5Fc7R4dapF/BvRoSYFeqfBk4m0V1Vafq5Pjv25wvA==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">= 6"
      },
      "funding": {
        "url": "https://github.com/sponsors/fb55"
      }
    },
    "node_modules/csso": {
      "version": "5.0.5",
      "resolved": "https://registry.npmmirror.com/csso/-/csso-5.0.5.tgz",
      "integrity": "sha512-0LrrStPOdJj+SPCCrGhzryycLjwcgUSHBtxNA8aIDxf0GLsRh1cKYhB00Gd1lDOS4yGH69+SNn13+TWbVHETFQ==",
      "license": "MIT",
      "dependencies": {
        "css-tree": "~2.2.0"
      },
      "engines": {
        "node": "^10 || ^12.20.0 || ^14.13.0 || >=15.0.0",
        "npm": ">=7.0.0"
      }
    },
    "node_modules/csso/node_modules/css-tree": {
      "version": "2.2.1",
      "resolved": "https://registry.npmmirror.com/css-tree/-/css-tree-2.2.1.tgz",
      "integrity": "sha512-OA0mILzGc1kCOCSJerOeqDxDQ4HOh+G8NbOJFOTgOCzpw7fCBubk0fEyxp8AgOL/jvLgYA/uV0cMbe43ElF1JA==",
      "license": "MIT",
      "dependencies": {
        "mdn-data": "2.0.28",
        "source-map-js": "^1.0.1"
      },
      "engines": {
        "node": "^10 || ^12.20.0 || ^14.13.0 || >=15.0.0",
        "npm": ">=7.0.0"
      }
    },
    "node_modules/csso/node_modules/mdn-data": {
      "version": "2.0.28",
      "resolved": "https://registry.npmmirror.com/mdn-data/-/mdn-data-2.0.28.tgz",
      "integrity": "sha512-aylIc7Z9y4yzHYAJNuESG3hfhC+0Ibp/MAMiaOZgNv4pmEdFyfZhhhny4MNiAfWdBQ1RQ2mfDWmM1x8SvGyp8g==",
      "license": "CC0-1.0"
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmmirror.com/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmmirror.com/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decode-named-character-reference": {
      "version": "1.3.0",
      "resolved": "https://registry.npmmirror.com/decode-named-character-reference/-/decode-named-character-reference-1.3.0.tgz",
      "integrity": "sha512-GtpQYB283KrPp6nRw50q3U9/VfOutZOe103qlN7BPP6Ad27xYnOIWv4lPzo8HCAL+mMZofJ9KEy30fq6MfaK6Q==",
      "license": "MIT",
      "dependencies": {
        "character-entities": "^2.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/defu": {
      "version": "6.1.7",
      "resolved": "https://registry.npmmirror.com/defu/-/defu-6.1.7.tgz",
      "integrity": "sha512-7z22QmUWiQ/2d0KkdYmANbRUVABpZ9SNYyH5vx6PZ+nE5bcC0l7uFvEfHlyld/HcGBFTL536ClDt3DEcSlEJAQ==",
      "license": "MIT"
    },
    "node_modules/dequal": {
      "version": "2.0.3",
      "resolved": "https://registry.npmmirror.com/dequal/-/dequal-2.0.3.tgz",
      "integrity": "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/destr": {
      "version": "2.0.5",
      "resolved": "https://registry.npmmirror.com/destr/-/destr-2.0.5.tgz",
      "integrity": "sha512-ugFTXCtDZunbzasqBxrK93Ik/DRYsO6S/fedkWEMKqt04xZ4csmnmwGDBAb07QWNaGMAmnTIemsYZCksjATwsA==",
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmmirror.com/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/devalue": {
      "version": "5.7.0",
      "resolved": "https://registry.npmmirror.com/devalue/-/devalue-5.7.0.tgz",
      "integrity": "sha512-qCvc8m7cImp1QDCsiY+C2EdSBWSj7Ucfoq87scSdYboDiIKdvMtFbH1U2VReBls6WMhMaUOoK3ZJEDNG/7zm3w==",
      "license": "MIT"
    },
    "node_modules/devlop": {
      "version": "1.1.0",
      "resolved": "https://registry.npmmirror.com/devlop/-/devlop-1.1.0.tgz",
      "integrity": "sha512-RWmIqhcFf1lRYBvNmr7qTNuyCt/7/ns2jbpp1+PalgE/rDQcBT0fioSMUpJ93irlUhC5hrg4cYqe6U+0ImW0rA==",
      "license": "MIT",
      "dependencies": {
        "dequal": "^2.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/diff": {
      "version": "8.0.4",
      "resolved": "https://registry.npmmirror.com/diff/-/diff-8.0.4.tgz",
      "integrity": "sha512-DPi0FmjiSU5EvQV0++GFDOJ9ASQUVFh5kD+OzOnYdi7n3Wpm9hWWGfB/O2blfHcMVTL5WkQXSnRiK9makhrcnw==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.3.1"
      }
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmmirror.com/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "license": "MIT"
    },
    "node_modules/dom-serializer": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/dom-serializer/-/dom-serializer-2.0.0.tgz",
      "integrity": "sha512-wIkAryiqt/nV5EQKqQpo3SToSOV9J0DnbJqwK7Wv/Trc92zIAYZ4FlMu+JPFW1DfGFt81ZTCGgDEabffXeLyJg==",
      "license": "MIT",
      "dependencies": {
        "domelementtype": "^2.3.0",
        "domhandler": "^5.0.2",
        "entities": "^4.2.0"
      },
      "funding": {
        "url": "https://github.com/cheeriojs/dom-serializer?sponsor=1"
      }
    },
    "node_modules/dom-serializer/node_modules/entities": {
      "version": "4.5.0",
      "resolved": "https://registry.npmmirror.com/entities/-/entities-4.5.0.tgz",
      "integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/domelementtype": {
      "version": "2.3.0",
      "resolved": "https://registry.npmmirror.com/domelementtype/-/domelementtype-2.3.0.tgz",
      "integrity": "sha512-OLETBj6w0OsagBwdXnPdN0cnMfF9opN69co+7ZrbfPGrdpPVNBUj02spi6B1N7wChLQiPn4CSH/zJvXw56gmHw==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/fb55"
        }
      ],
      "license": "BSD-2-Clause"
    },
    "node_modules/domhandler": {
      "version": "5.0.3",
      "resolved": "https://registry.npmmirror.com/domhandler/-/domhandler-5.0.3.tgz",
      "integrity": "sha512-cgwlv/1iFQiFnU96XXgROh8xTeetsnJiDsTc7TYCLFd9+/WNkIqPTxiM/8pSd8VIrhXGTf1Ny1q1hquVqDJB5w==",
      "license": "BSD-2-Clause",
      "dependencies": {
        "domelementtype": "^2.3.0"
      },
      "engines": {
        "node": ">= 4"
      },
      "funding": {
        "url": "https://github.com/fb55/domhandler?sponsor=1"
      }
    },
    "node_modules/domutils": {
      "version": "3.2.2",
      "resolved": "https://registry.npmmirror.com/domutils/-/domutils-3.2.2.tgz",
      "integrity": "sha512-6kZKyUajlDuqlHKVX1w7gyslj9MPIXzIFiz/rGu35uC1wMi+kMhQwGhl4lt9unC9Vb9INnY9Z3/ZA3+FhASLaw==",
      "license": "BSD-2-Clause",
      "dependencies": {
        "dom-serializer": "^2.0.0",
        "domelementtype": "^2.3.0",
        "domhandler": "^5.0.3"
      },
      "funding": {
        "url": "https://github.com/fb55/domutils?sponsor=1"
      }
    },
    "node_modules/dset": {
      "version": "3.1.4",
      "resolved": "https://registry.npmmirror.com/dset/-/dset-3.1.4.tgz",
      "integrity": "sha512-2QF/g9/zTaPDc3BjNcVTGoBbXBgYfMTTceLaYcFJ/W9kggFUkhxD/hMEeuLKbugyef9SqAx8cpgwlIP/jinUTA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.332",
      "resolved": "https://registry.npmmirror.com/electron-to-chromium/-/electron-to-chromium-1.5.332.tgz",
      "integrity": "sha512-7OOtytmh/rINMLwaFTbcMVvYXO3AUm029X0LcyfYk0B557RlPkdpTpnH9+htMlfu5dKwOmT0+Zs2Aw+lnn6TeQ==",
      "license": "ISC"
    },
    "node_modules/enhanced-resolve": {
      "version": "5.20.1",
      "resolved": "https://registry.npmmirror.com/enhanced-resolve/-/enhanced-resolve-5.20.1.tgz",
      "integrity": "sha512-Qohcme7V1inbAfvjItgw0EaxVX5q2rdVEZHRBrEQdRZTssLDGsL8Lwrznl8oQ/6kuTJONLaDcGjkNP247XEhcA==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.0"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/entities": {
      "version": "6.0.1",
      "resolved": "https://registry.npmmirror.com/entities/-/entities-6.0.1.tgz",
      "integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/es-module-lexer": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/es-module-lexer/-/es-module-lexer-2.0.0.tgz",
      "integrity": "sha512-5POEcUuZybH7IdmGsD8wlf0AI55wMecM9rVBTI/qEAy2c1kTOm3DjFYjrBdI2K3BaJjJYfYFeRtM0t9ssnRuxw==",
      "license": "MIT"
    },
    "node_modules/esbuild": {
      "version": "0.27.7",
      "resolved": "https://registry.npmmirror.com/esbuild/-/esbuild-0.27.7.tgz",
      "integrity": "sha512-IxpibTjyVnmrIQo5aqNpCgoACA/dTKLTlhMHihVHhdkxKyPO1uBBthumT0rdHmcsk9uMonIWS0m4FljWzILh3w==",
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.27.7",
        "@esbuild/android-arm": "0.27.7",
        "@esbuild/android-arm64": "0.27.7",
        "@esbuild/android-x64": "0.27.7",
        "@esbuild/darwin-arm64": "0.27.7",
        "@esbuild/darwin-x64": "0.27.7",
        "@esbuild/freebsd-arm64": "0.27.7",
        "@esbuild/freebsd-x64": "0.27.7",
        "@esbuild/linux-arm": "0.27.7",
        "@esbuild/linux-arm64": "0.27.7",
        "@esbuild/linux-ia32": "0.27.7",
        "@esbuild/linux-loong64": "0.27.7",
        "@esbuild/linux-mips64el": "0.27.7",
        "@esbuild/linux-ppc64": "0.27.7",
        "@esbuild/linux-riscv64": "0.27.7",
        "@esbuild/linux-s390x": "0.27.7",
        "@esbuild/linux-x64": "0.27.7",
        "@esbuild/netbsd-arm64": "0.27.7",
        "@esbuild/netbsd-x64": "0.27.7",
        "@esbuild/openbsd-arm64": "0.27.7",
        "@esbuild/openbsd-x64": "0.27.7",
        "@esbuild/openharmony-arm64": "0.27.7",
        "@esbuild/sunos-x64": "0.27.7",
        "@esbuild/win32-arm64": "0.27.7",
        "@esbuild/win32-ia32": "0.27.7",
        "@esbuild/win32-x64": "0.27.7"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmmirror.com/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/escape-string-regexp/-/escape-string-regexp-5.0.0.tgz",
      "integrity": "sha512-/veY75JbMK4j1yjvuUxuVsiS/hr/4iHs9FTT6cgTexxdE0Ly/glccBAkloH/DofkjRbZU3bnoj38mOmhkZ0lHw==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/estree-walker": {
      "version": "2.0.2",
      "resolved": "https://registry.npmmirror.com/estree-walker/-/estree-walker-2.0.2.tgz",
      "integrity": "sha512-Rfkk/Mp/DL7JVje3u18FxFujQlTNR2q6QfMSMB7AvCBx91NGj/ba3kCfza0f6dVDbw7YlRf/nDrn7pQrCCyQ/w==",
      "license": "MIT"
    },
    "node_modules/eventemitter3": {
      "version": "5.0.4",
      "resolved": "https://registry.npmmirror.com/eventemitter3/-/eventemitter3-5.0.4.tgz",
      "integrity": "sha512-mlsTRyGaPBjPedk6Bvw+aqbsXDtoAyAzm5MO7JgU+yVRyMQ5O8bD4Kcci7BS85f93veegeCPkL8R4GLClnjLFw==",
      "license": "MIT"
    },
    "node_modules/extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmmirror.com/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==",
      "license": "MIT"
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmmirror.com/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/fast-string-truncated-width": {
      "version": "1.2.1",
      "resolved": "https://registry.npmmirror.com/fast-string-truncated-width/-/fast-string-truncated-width-1.2.1.tgz",
      "integrity": "sha512-Q9acT/+Uu3GwGj+5w/zsGuQjh9O1TyywhIwAxHudtWrgF09nHOPrvTLhQevPbttcxjr/SNN7mJmfOw/B1bXgow==",
      "license": "MIT"
    },
    "node_modules/fast-string-width": {
      "version": "1.1.0",
      "resolved": "https://registry.npmmirror.com/fast-string-width/-/fast-string-width-1.1.0.tgz",
      "integrity": "sha512-O3fwIVIH5gKB38QNbdg+3760ZmGz0SZMgvwJbA1b2TGXceKE6A2cOlfogh1iw8lr049zPyd7YADHy+B7U4W9bQ==",
      "license": "MIT",
      "dependencies": {
        "fast-string-truncated-width": "^1.2.0"
      }
    },
    "node_modules/fast-wrap-ansi": {
      "version": "0.1.6",
      "resolved": "https://registry.npmmirror.com/fast-wrap-ansi/-/fast-wrap-ansi-0.1.6.tgz",
      "integrity": "sha512-HlUwET7a5gqjURj70D5jl7aC3Zmy4weA1SHUfM0JFI0Ptq987NH2TwbBFLoERhfwk+E+eaq4EK3jXoT+R3yp3w==",
      "license": "MIT",
      "dependencies": {
        "fast-string-width": "^1.1.0"
      }
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmmirror.com/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/file-uri-to-path": {
      "version": "1.0.0",
      "resolved": "https://registry.npmmirror.com/file-uri-to-path/-/file-uri-to-path-1.0.0.tgz",
      "integrity": "sha512-0Zt+s3L7Vf1biwWZ29aARiVYLx7iMGnEUl9x33fbB/j3jR81u/O2LbqK+Bm1CDSNDKVtJ/YjwY7TUd5SkeLQLw==",
      "license": "MIT"
    },
    "node_modules/flattie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmmirror.com/flattie/-/flattie-1.1.1.tgz",
      "integrity": "sha512-9UbaD6XdAL97+k/n+N7JwX46K/M6Zc6KcFYskrYL8wbBV/Uyk0CTAMY0VT+qiK5PM7AIc9aTWYtq65U7T+aCNQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fontace": {
      "version": "0.4.1",
      "resolved": "https://registry.npmmirror.com/fontace/-/fontace-0.4.1.tgz",
      "integrity": "sha512-lDMvbAzSnHmbYMTEld5qdtvNH2/pWpICOqpean9IgC7vUbUJc3k+k5Dokp85CegamqQpFbXf0rAVkbzpyTA8aw==",
      "license": "MIT",
      "dependencies": {
        "fontkitten": "^1.0.2"
      }
    },
    "node_modules/fontkitten": {
      "version": "1.0.3",
      "resolved": "https://registry.npmmirror.com/fontkitten/-/fontkitten-1.0.3.tgz",
      "integrity": "sha512-Wp1zXWPVUPBmfoa3Cqc9ctaKuzKAV6uLstRqlR56kSjplf5uAce+qeyYym7F+PHbGTk+tCEdkCW6RD7DX/gBZw==",
      "license": "MIT",
      "dependencies": {
        "tiny-inflate": "^1.0.3"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmmirror.com/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmmirror.com/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/github-slugger": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/github-slugger/-/github-slugger-2.0.0.tgz",
      "integrity": "sha512-IaOQ9puYtjrkq7Y0Ygl9KDZnrf/aiUJYUpVf89y8kyaxbRG7Y1SrX/jaumrv81vc61+kiMempujsM3Yw7w5qcw==",
      "license": "ISC"
    },
    "node_modules/glob": {
      "version": "13.0.6",
      "resolved": "https://registry.npmmirror.com/glob/-/glob-13.0.6.tgz",
      "integrity": "sha512-Wjlyrolmm8uDpm/ogGyXZXb1Z+Ca2B8NbJwqBVg0axK9GbBeoS7yGV6vjXnYdGm6X53iehEuxxbyiKp8QmN4Vw==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "minimatch": "^10.2.2",
        "minipass": "^7.1.3",
        "path-scurry": "^2.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmmirror.com/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/h3": {
      "version": "1.15.11",
      "resolved": "https://registry.npmmirror.com/h3/-/h3-1.15.11.tgz",
      "integrity": "sha512-L3THSe2MPeBwgIZVSH5zLdBBU90TOxarvhK9d04IDY2AmVS8j2Jz2LIWtwsGOU3lu2I5jCN7FNvVfY2+XyF+mg==",
      "license": "MIT",
      "dependencies": {
        "cookie-es": "^1.2.3",
        "crossws": "^0.3.5",
        "defu": "^6.1.6",
        "destr": "^2.0.5",
        "iron-webcrypto": "^1.2.1",
        "node-mock-http": "^1.0.4",
        "radix3": "^1.1.2",
        "ufo": "^1.6.3",
        "uncrypto": "^0.1.3"
      }
    },
    "node_modules/hast-util-from-html": {
      "version": "2.0.3",
      "resolved": "https://registry.npmmirror.com/hast-util-from-html/-/hast-util-from-html-2.0.3.tgz",
      "integrity": "sha512-CUSRHXyKjzHov8yKsQjGOElXy/3EKpyX56ELnkHH34vDVw1N1XSQ1ZcAvTyAPtGqLTuKP/uxM+aLkSPqF/EtMw==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "devlop": "^1.1.0",
        "hast-util-from-parse5": "^8.0.0",
        "parse5": "^7.0.0",
        "vfile": "^6.0.0",
        "vfile-message": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-from-parse5": {
      "version": "8.0.3",
      "resolved": "https://registry.npmmirror.com/hast-util-from-parse5/-/hast-util-from-parse5-8.0.3.tgz",
      "integrity": "sha512-3kxEVkEKt0zvcZ3hCRYI8rqrgwtlIOFMWkbclACvjlDw8Li9S2hk/d51OI0nr/gIpdMHNepwgOKqZ/sy0Clpyg==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "@types/unist": "^3.0.0",
        "devlop": "^1.0.0",
        "hastscript": "^9.0.0",
        "property-information": "^7.0.0",
        "vfile": "^6.0.0",
        "vfile-location": "^5.0.0",
        "web-namespaces": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-is-element": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/hast-util-is-element/-/hast-util-is-element-3.0.0.tgz",
      "integrity": "sha512-Val9mnv2IWpLbNPqc/pUem+a7Ipj2aHacCwgNfTiK0vJKl0LF+4Ba4+v1oPHFpf3bLYmreq0/l3Gud9S5OH42g==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-parse-selector": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/hast-util-parse-selector/-/hast-util-parse-selector-4.0.0.tgz",
      "integrity": "sha512-wkQCkSYoOGCRKERFWcxMVMOcYE2K1AaNLU8DXS9arxnLOUEWbOXKXiJUNzEpqZ3JOKpnha3jkFrumEjVliDe7A==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-raw": {
      "version": "9.1.0",
      "resolved": "https://registry.npmmirror.com/hast-util-raw/-/hast-util-raw-9.1.0.tgz",
      "integrity": "sha512-Y8/SBAHkZGoNkpzqqfCldijcuUKh7/su31kEBp67cFY09Wy0mTRgtsLYsiIxMJxlu0f6AA5SUTbDR8K0rxnbUw==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "@types/unist": "^3.0.0",
        "@ungap/structured-clone": "^1.0.0",
        "hast-util-from-parse5": "^8.0.0",
        "hast-util-to-parse5": "^8.0.0",
        "html-void-elements": "^3.0.0",
        "mdast-util-to-hast": "^13.0.0",
        "parse5": "^7.0.0",
        "unist-util-position": "^5.0.0",
        "unist-util-visit": "^5.0.0",
        "vfile": "^6.0.0",
        "web-namespaces": "^2.0.0",
        "zwitch": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-to-html": {
      "version": "9.0.5",
      "resolved": "https://registry.npmmirror.com/hast-util-to-html/-/hast-util-to-html-9.0.5.tgz",
      "integrity": "sha512-OguPdidb+fbHQSU4Q4ZiLKnzWo8Wwsf5bZfbvu7//a9oTYoqD/fWpe96NuHkoS9h0ccGOTe0C4NGXdtS0iObOw==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "@types/unist": "^3.0.0",
        "ccount": "^2.0.0",
        "comma-separated-tokens": "^2.0.0",
        "hast-util-whitespace": "^3.0.0",
        "html-void-elements": "^3.0.0",
        "mdast-util-to-hast": "^13.0.0",
        "property-information": "^7.0.0",
        "space-separated-tokens": "^2.0.0",
        "stringify-entities": "^4.0.0",
        "zwitch": "^2.0.4"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-to-parse5": {
      "version": "8.0.1",
      "resolved": "https://registry.npmmirror.com/hast-util-to-parse5/-/hast-util-to-parse5-8.0.1.tgz",
      "integrity": "sha512-MlWT6Pjt4CG9lFCjiz4BH7l9wmrMkfkJYCxFwKQic8+RTZgWPuWxwAfjJElsXkex7DJjfSJsQIt931ilUgmwdA==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "comma-separated-tokens": "^2.0.0",
        "devlop": "^1.0.0",
        "property-information": "^7.0.0",
        "space-separated-tokens": "^2.0.0",
        "web-namespaces": "^2.0.0",
        "zwitch": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-to-text": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/hast-util-to-text/-/hast-util-to-text-4.0.2.tgz",
      "integrity": "sha512-KK6y/BN8lbaq654j7JgBydev7wuNMcID54lkRav1P0CaE1e47P72AWWPiGKXTJU271ooYzcvTAn/Zt0REnvc7A==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "@types/unist": "^3.0.0",
        "hast-util-is-element": "^3.0.0",
        "unist-util-find-after": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hast-util-whitespace": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/hast-util-whitespace/-/hast-util-whitespace-3.0.0.tgz",
      "integrity": "sha512-88JUN06ipLwsnv+dVn+OIYOvAuvBMy/Qoi6O7mQHxdPXpjy+Cd6xRkWwux7DKO+4sYILtLBRIKgsdpS2gQc7qw==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/hastscript": {
      "version": "9.0.1",
      "resolved": "https://registry.npmmirror.com/hastscript/-/hastscript-9.0.1.tgz",
      "integrity": "sha512-g7df9rMFX/SPi34tyGCyUBREQoKkapwdY/T04Qn9TDWfHhAYt4/I0gMVirzK5wEzeUqIjEB+LXC/ypb7Aqno5w==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "comma-separated-tokens": "^2.0.0",
        "hast-util-parse-selector": "^4.0.0",
        "property-information": "^7.0.0",
        "space-separated-tokens": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/html-escaper": {
      "version": "3.0.3",
      "resolved": "https://registry.npmmirror.com/html-escaper/-/html-escaper-3.0.3.tgz",
      "integrity": "sha512-RuMffC89BOWQoY0WKGpIhn5gX3iI54O6nRA0yC124NYVtzjmFWBIiFd8M0x+ZdX0P9R4lADg1mgP8C7PxGOWuQ==",
      "license": "MIT"
    },
    "node_modules/html-void-elements": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/html-void-elements/-/html-void-elements-3.0.0.tgz",
      "integrity": "sha512-bEqo66MRXsUGxWHV5IP0PUiAWwoEjba4VCzg0LjFJBpchPaTfyfCKTG6bc5F8ucKec3q5y6qOdGyYTSBEvhCrg==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/http-cache-semantics": {
      "version": "4.2.0",
      "resolved": "https://registry.npmmirror.com/http-cache-semantics/-/http-cache-semantics-4.2.0.tgz",
      "integrity": "sha512-dTxcvPXqPvXBQpq5dUr6mEMJX4oIEFv6bwom3FDwKRDsuIjjJGANqhBuoAn9c1RQJIdAKav33ED65E2ys+87QQ==",
      "license": "BSD-2-Clause"
    },
    "node_modules/https-proxy-agent": {
      "version": "7.0.6",
      "resolved": "https://registry.npmmirror.com/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
      "integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/iron-webcrypto": {
      "version": "1.2.1",
      "resolved": "https://registry.npmmirror.com/iron-webcrypto/-/iron-webcrypto-1.2.1.tgz",
      "integrity": "sha512-feOM6FaSr6rEABp/eDfVseKyTMDt+KGpeB35SkVn9Tyn0CqvVsY3EwI0v5i8nMHyJnzCIQf7nsy3p41TPkJZhg==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/brc-dd"
      }
    },
    "node_modules/is-docker": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/is-docker/-/is-docker-3.0.0.tgz",
      "integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
      "license": "MIT",
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-inside-container": {
      "version": "1.0.0",
      "resolved": "https://registry.npmmirror.com/is-inside-container/-/is-inside-container-1.0.0.tgz",
      "integrity": "sha512-KIYLCCJghfHZxqjYBE7rEy0OBuTd5xCHS7tHVgvCLkx7StIoaxwNW3hCALgEUjFfeRk+MG/Qxmp/vtETEF3tRA==",
      "license": "MIT",
      "dependencies": {
        "is-docker": "^3.0.0"
      },
      "bin": {
        "is-inside-container": "cli.js"
      },
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-plain-obj": {
      "version": "4.1.0",
      "resolved": "https://registry.npmmirror.com/is-plain-obj/-/is-plain-obj-4.1.0.tgz",
      "integrity": "sha512-+Pgi+vMuUNkJyExiMBt5IlFoMyKnr5zhJ4Uspz58WOhBF5QoIZkFyNHIbBAtHwzVAgk5RtndVNsDRN61/mmDqg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-wsl": {
      "version": "3.1.1",
      "resolved": "https://registry.npmmirror.com/is-wsl/-/is-wsl-3.1.1.tgz",
      "integrity": "sha512-e6rvdUCiQCAuumZslxRJWR/Doq4VpPR82kqclvcS0efgt430SlGIk05vdCN58+VrzgtIcfNODjozVielycD4Sw==",
      "license": "MIT",
      "dependencies": {
        "is-inside-container": "^1.0.0"
      },
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/jiti": {
      "version": "2.6.1",
      "resolved": "https://registry.npmmirror.com/jiti/-/jiti-2.6.1.tgz",
      "integrity": "sha512-ekilCSN1jwRvIbgeg/57YFh8qQDNbwDb9xT/qu2DAHbFFZUicIl4ygVaAvzveMhMVr3LnpSKTNnwt8PoOfmKhQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.1",
      "resolved": "https://registry.npmmirror.com/js-yaml/-/js-yaml-4.1.1.tgz",
      "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmmirror.com/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmmirror.com/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmmirror.com/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmmirror.com/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/longest-streak": {
      "version": "3.1.0",
      "resolved": "https://registry.npmmirror.com/longest-streak/-/longest-streak-3.1.0.tgz",
      "integrity": "sha512-9Ri+o0JYgehTaVBBDoMqIl8GXtbWg711O3srftcHhZ0dqnETqLaoIK0x17fUw9rFSlK/0NlsKe0Ahhyl5pXE2g==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/lru-cache": {
      "version": "11.3.2",
      "resolved": "https://registry.npmmirror.com/lru-cache/-/lru-cache-11.3.2.tgz",
      "integrity": "sha512-wgWa6FWQ3QRRJbIjbsldRJZxdxYngT/dO0I5Ynmlnin8qy7tC6xYzbcJjtN4wHLXtkbVwHzk0C+OejVw1XM+DQ==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": "20 || >=22"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmmirror.com/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/magicast": {
      "version": "0.5.2",
      "resolved": "https://registry.npmmirror.com/magicast/-/magicast-0.5.2.tgz",
      "integrity": "sha512-E3ZJh4J3S9KfwdjZhe2afj6R9lGIN5Pher1pF39UGrXRqq/VDaGVIGN13BjHd2u8B61hArAGOnso7nBOouW3TQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "source-map-js": "^1.2.1"
      }
    },
    "node_modules/markdown-table": {
      "version": "3.0.4",
      "resolved": "https://registry.npmmirror.com/markdown-table/-/markdown-table-3.0.4.tgz",
      "integrity": "sha512-wiYz4+JrLyb/DqW2hkFJxP7Vd7JuTDm77fvbM8VfEQdmSMqcImWeeRbHwZjBjIFki/VaMK2BhFi7oUUZeM5bqw==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/mdast-util-definitions": {
      "version": "6.0.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-definitions/-/mdast-util-definitions-6.0.0.tgz",
      "integrity": "sha512-scTllyX6pnYNZH/AIp/0ePz6s4cZtARxImwoPJ7kS42n+MnVsI4XbnG6d4ibehRIldYMWM2LD7ImQblVhUejVQ==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "@types/unist": "^3.0.0",
        "unist-util-visit": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-find-and-replace": {
      "version": "3.0.2",
      "resolved": "https://registry.npmmirror.com/mdast-util-find-and-replace/-/mdast-util-find-and-replace-3.0.2.tgz",
      "integrity": "sha512-Tmd1Vg/m3Xz43afeNxDIhWRtFZgM2VLyaf4vSTYwudTyeuTneoL3qtWMA5jeLyz/O1vDJmmV4QuScFCA2tBPwg==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "escape-string-regexp": "^5.0.0",
        "unist-util-is": "^6.0.0",
        "unist-util-visit-parents": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-from-markdown": {
      "version": "2.0.3",
      "resolved": "https://registry.npmmirror.com/mdast-util-from-markdown/-/mdast-util-from-markdown-2.0.3.tgz",
      "integrity": "sha512-W4mAWTvSlKvf8L6J+VN9yLSqQ9AOAAvHuoDAmPkz4dHf553m5gVj2ejadHJhoJmcmxEnOv6Pa8XJhpxE93kb8Q==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "@types/unist": "^3.0.0",
        "decode-named-character-reference": "^1.0.0",
        "devlop": "^1.0.0",
        "mdast-util-to-string": "^4.0.0",
        "micromark": "^4.0.0",
        "micromark-util-decode-numeric-character-reference": "^2.0.0",
        "micromark-util-decode-string": "^2.0.0",
        "micromark-util-normalize-identifier": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0",
        "unist-util-stringify-position": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm": {
      "version": "3.1.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-gfm/-/mdast-util-gfm-3.1.0.tgz",
      "integrity": "sha512-0ulfdQOM3ysHhCJ1p06l0b0VKlhU0wuQs3thxZQagjcjPrlFRqY215uZGHHJan9GEAXd9MbfPjFJz+qMkVR6zQ==",
      "license": "MIT",
      "dependencies": {
        "mdast-util-from-markdown": "^2.0.0",
        "mdast-util-gfm-autolink-literal": "^2.0.0",
        "mdast-util-gfm-footnote": "^2.0.0",
        "mdast-util-gfm-strikethrough": "^2.0.0",
        "mdast-util-gfm-table": "^2.0.0",
        "mdast-util-gfm-task-list-item": "^2.0.0",
        "mdast-util-to-markdown": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-autolink-literal": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-autolink-literal/-/mdast-util-gfm-autolink-literal-2.0.1.tgz",
      "integrity": "sha512-5HVP2MKaP6L+G6YaxPNjuL0BPrq9orG3TsrZ9YXbA3vDw/ACI4MEsnoDpn6ZNm7GnZgtAcONJyPhOP8tNJQavQ==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "ccount": "^2.0.0",
        "devlop": "^1.0.0",
        "mdast-util-find-and-replace": "^3.0.0",
        "micromark-util-character": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-footnote": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-footnote/-/mdast-util-gfm-footnote-2.1.0.tgz",
      "integrity": "sha512-sqpDWlsHn7Ac9GNZQMeUzPQSMzR6Wv0WKRNvQRg0KqHh02fpTz69Qc1QSseNX29bhz1ROIyNyxExfawVKTm1GQ==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "devlop": "^1.1.0",
        "mdast-util-from-markdown": "^2.0.0",
        "mdast-util-to-markdown": "^2.0.0",
        "micromark-util-normalize-identifier": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-strikethrough": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-strikethrough/-/mdast-util-gfm-strikethrough-2.0.0.tgz",
      "integrity": "sha512-mKKb915TF+OC5ptj5bJ7WFRPdYtuHv0yTRxK2tJvi+BDqbkiG7h7u/9SI89nRAYcmap2xHQL9D+QG/6wSrTtXg==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "mdast-util-from-markdown": "^2.0.0",
        "mdast-util-to-markdown": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-table": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-table/-/mdast-util-gfm-table-2.0.0.tgz",
      "integrity": "sha512-78UEvebzz/rJIxLvE7ZtDd/vIQ0RHv+3Mh5DR96p7cS7HsBhYIICDBCu8csTNWNO6tBWfqXPWekRuj2FNOGOZg==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "devlop": "^1.0.0",
        "markdown-table": "^3.0.0",
        "mdast-util-from-markdown": "^2.0.0",
        "mdast-util-to-markdown": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-gfm-task-list-item": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-gfm-task-list-item/-/mdast-util-gfm-task-list-item-2.0.0.tgz",
      "integrity": "sha512-IrtvNvjxC1o06taBAVJznEnkiHxLFTzgonUdy8hzFVeDun0uTjxxrRGVaNFqkU1wJR3RBPEfsxmU6jDWPofrTQ==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "devlop": "^1.0.0",
        "mdast-util-from-markdown": "^2.0.0",
        "mdast-util-to-markdown": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-phrasing": {
      "version": "4.1.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-phrasing/-/mdast-util-phrasing-4.1.0.tgz",
      "integrity": "sha512-TqICwyvJJpBwvGAMZjj4J2n0X8QWp21b9l0o7eXyVJ25YNWYbJDVIyD1bZXE6WtV6RmKJVYmQAKWa0zWOABz2w==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "unist-util-is": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-to-hast": {
      "version": "13.2.1",
      "resolved": "https://registry.npmmirror.com/mdast-util-to-hast/-/mdast-util-to-hast-13.2.1.tgz",
      "integrity": "sha512-cctsq2wp5vTsLIcaymblUriiTcZd0CwWtCbLvrOzYCDZoWyMNV8sZ7krj09FSnsiJi3WVsHLM4k6Dq/yaPyCXA==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "@types/mdast": "^4.0.0",
        "@ungap/structured-clone": "^1.0.0",
        "devlop": "^1.0.0",
        "micromark-util-sanitize-uri": "^2.0.0",
        "trim-lines": "^3.0.0",
        "unist-util-position": "^5.0.0",
        "unist-util-visit": "^5.0.0",
        "vfile": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-to-markdown": {
      "version": "2.1.2",
      "resolved": "https://registry.npmmirror.com/mdast-util-to-markdown/-/mdast-util-to-markdown-2.1.2.tgz",
      "integrity": "sha512-xj68wMTvGXVOKonmog6LwyJKrYXZPvlwabaryTjLh9LuvovB/KAH+kvi8Gjj+7rJjsFi23nkUxRQv1KqSroMqA==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "@types/unist": "^3.0.0",
        "longest-streak": "^3.0.0",
        "mdast-util-phrasing": "^4.0.0",
        "mdast-util-to-string": "^4.0.0",
        "micromark-util-classify-character": "^2.0.0",
        "micromark-util-decode-string": "^2.0.0",
        "unist-util-visit": "^5.0.0",
        "zwitch": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdast-util-to-string": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/mdast-util-to-string/-/mdast-util-to-string-4.0.0.tgz",
      "integrity": "sha512-0H44vDimn51F0YwvxSJSm0eCDOJTRlmN0R1yBh4HLj9wiV1Dn0QoXGbvFAWj2hSItVTlCmBF1hqKlIyUBVFLPg==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/mdn-data": {
      "version": "2.27.1",
      "resolved": "https://registry.npmmirror.com/mdn-data/-/mdn-data-2.27.1.tgz",
      "integrity": "sha512-9Yubnt3e8A0OKwxYSXyhLymGW4sCufcLG6VdiDdUGVkPhpqLxlvP5vl1983gQjJl3tqbrM731mjaZaP68AgosQ==",
      "license": "CC0-1.0"
    },
    "node_modules/micromark": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/micromark/-/micromark-4.0.2.tgz",
      "integrity": "sha512-zpe98Q6kvavpCr1NPVSCMebCKfD7CA2NqZ+rykeNhONIJBpc1tFKt9hucLGwha3jNTNI8lHpctWJWoimVF4PfA==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "@types/debug": "^4.0.0",
        "debug": "^4.0.0",
        "decode-named-character-reference": "^1.0.0",
        "devlop": "^1.0.0",
        "micromark-core-commonmark": "^2.0.0",
        "micromark-factory-space": "^2.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-chunked": "^2.0.0",
        "micromark-util-combine-extensions": "^2.0.0",
        "micromark-util-decode-numeric-character-reference": "^2.0.0",
        "micromark-util-encode": "^2.0.0",
        "micromark-util-normalize-identifier": "^2.0.0",
        "micromark-util-resolve-all": "^2.0.0",
        "micromark-util-sanitize-uri": "^2.0.0",
        "micromark-util-subtokenize": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-core-commonmark": {
      "version": "2.0.3",
      "resolved": "https://registry.npmmirror.com/micromark-core-commonmark/-/micromark-core-commonmark-2.0.3.tgz",
      "integrity": "sha512-RDBrHEMSxVFLg6xvnXmb1Ayr2WzLAWjeSATAoxwKYJV94TeNavgoIdA0a9ytzDSVzBy2YKFK+emCPOEibLeCrg==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "decode-named-character-reference": "^1.0.0",
        "devlop": "^1.0.0",
        "micromark-factory-destination": "^2.0.0",
        "micromark-factory-label": "^2.0.0",
        "micromark-factory-space": "^2.0.0",
        "micromark-factory-title": "^2.0.0",
        "micromark-factory-whitespace": "^2.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-chunked": "^2.0.0",
        "micromark-util-classify-character": "^2.0.0",
        "micromark-util-html-tag-name": "^2.0.0",
        "micromark-util-normalize-identifier": "^2.0.0",
        "micromark-util-resolve-all": "^2.0.0",
        "micromark-util-subtokenize": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-extension-gfm": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm/-/micromark-extension-gfm-3.0.0.tgz",
      "integrity": "sha512-vsKArQsicm7t0z2GugkCKtZehqUm31oeGBV/KVSorWSy8ZlNAv7ytjFhvaryUiCUJYqs+NoE6AFhpQvBTM6Q4w==",
      "license": "MIT",
      "dependencies": {
        "micromark-extension-gfm-autolink-literal": "^2.0.0",
        "micromark-extension-gfm-footnote": "^2.0.0",
        "micromark-extension-gfm-strikethrough": "^2.0.0",
        "micromark-extension-gfm-table": "^2.0.0",
        "micromark-extension-gfm-tagfilter": "^2.0.0",
        "micromark-extension-gfm-task-list-item": "^2.0.0",
        "micromark-util-combine-extensions": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-autolink-literal": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-autolink-literal/-/micromark-extension-gfm-autolink-literal-2.1.0.tgz",
      "integrity": "sha512-oOg7knzhicgQ3t4QCjCWgTmfNhvQbDDnJeVu9v81r7NltNCVmhPy1fJRX27pISafdjL+SVc4d3l48Gb6pbRypw==",
      "license": "MIT",
      "dependencies": {
        "micromark-util-character": "^2.0.0",
        "micromark-util-sanitize-uri": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-footnote": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-footnote/-/micromark-extension-gfm-footnote-2.1.0.tgz",
      "integrity": "sha512-/yPhxI1ntnDNsiHtzLKYnE3vf9JZ6cAisqVDauhp4CEHxlb4uoOTxOCJ+9s51bIB8U1N1FJ1RXOKTIlD5B/gqw==",
      "license": "MIT",
      "dependencies": {
        "devlop": "^1.0.0",
        "micromark-core-commonmark": "^2.0.0",
        "micromark-factory-space": "^2.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-normalize-identifier": "^2.0.0",
        "micromark-util-sanitize-uri": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-strikethrough": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-strikethrough/-/micromark-extension-gfm-strikethrough-2.1.0.tgz",
      "integrity": "sha512-ADVjpOOkjz1hhkZLlBiYA9cR2Anf8F4HqZUO6e5eDcPQd0Txw5fxLzzxnEkSkfnD0wziSGiv7sYhk/ktvbf1uw==",
      "license": "MIT",
      "dependencies": {
        "devlop": "^1.0.0",
        "micromark-util-chunked": "^2.0.0",
        "micromark-util-classify-character": "^2.0.0",
        "micromark-util-resolve-all": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-table": {
      "version": "2.1.1",
      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-table/-/micromark-extension-gfm-table-2.1.1.tgz",
      "integrity": "sha512-t2OU/dXXioARrC6yWfJ4hqB7rct14e8f7m0cbI5hUmDyyIlwv5vEtooptH8INkbLzOatzKuVbQmAYcbWoyz6Dg==",
      "license": "MIT",
      "dependencies": {
        "devlop": "^1.0.0",
        "micromark-factory-space": "^2.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-tagfilter": {
      "version": "2.0.0",
      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-tagfilter/-/micromark-extension-gfm-tagfilter-2.0.0.tgz",
      "integrity": "sha512-xHlTOmuCSotIA8TW1mDIM6X2O1SiX5P9IuDtqGonFhEK0qgRI4yeC6vMxEV2dgyr2TiD+2PQ10o+cOhdVAcwfg==",
      "license": "MIT",
      "dependencies": {
        "micromark-util-types": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-extension-gfm-task-list-item": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/micromark-extension-gfm-task-list-item/-/micromark-extension-gfm-task-list-item-2.1.0.tgz",
      "integrity": "sha512-qIBZhqxqI6fjLDYFTBIa4eivDMnP+OZqsNwmQ3xNLE4Cxwc+zfQEfbs6tzAo2Hjq+bh6q5F+Z8/cksrLFYWQQw==",
      "license": "MIT",
      "dependencies": {
        "devlop": "^1.0.0",
        "micromark-factory-space": "^2.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/micromark-factory-destination": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-factory-destination/-/micromark-factory-destination-2.0.1.tgz",
      "integrity": "sha512-Xe6rDdJlkmbFRExpTOmRj9N3MaWmbAgdpSrBQvCFqhezUn4AHqJHbaEnfbVYYiexVSs//tqOdY/DxhjdCiJnIA==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-character": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-factory-label": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-factory-label/-/micromark-factory-label-2.0.1.tgz",
      "integrity": "sha512-VFMekyQExqIW7xIChcXn4ok29YE3rnuyveW3wZQWWqF4Nv9Wk5rgJ99KzPvHjkmPXF93FXIbBp6YdW3t71/7Vg==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "devlop": "^1.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-factory-space": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-factory-space/-/micromark-factory-space-2.0.1.tgz",
      "integrity": "sha512-zRkxjtBxxLd2Sc0d+fbnEunsTj46SWXgXciZmHq0kDYGnck/ZSGj9/wULTV95uoeYiK5hRXP2mJ98Uo4cq/LQg==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-character": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-factory-title": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-factory-title/-/micromark-factory-title-2.0.1.tgz",
      "integrity": "sha512-5bZ+3CjhAd9eChYTHsjy6TGxpOFSKgKKJPJxr293jTbfry2KDoWkhBb6TcPVB4NmzaPhMs1Frm9AZH7OD4Cjzw==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-factory-space": "^2.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-factory-whitespace": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-factory-whitespace/-/micromark-factory-whitespace-2.0.1.tgz",
      "integrity": "sha512-Ob0nuZ3PKt/n0hORHyvoD9uZhr+Za8sFoP+OnMcnWK5lngSzALgQYKMr9RJVOWLqQYuyn6ulqGWSXdwf6F80lQ==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-factory-space": "^2.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-util-character": {
      "version": "2.1.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-character/-/micromark-util-character-2.1.1.tgz",
      "integrity": "sha512-wv8tdUTJ3thSFFFJKtpYKOYiGP2+v96Hvk4Tu8KpCAsTMs6yi+nVmGh1syvSCsaxz45J6Jbw+9DD6g97+NV67Q==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-util-chunked": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-chunked/-/micromark-util-chunked-2.0.1.tgz",
      "integrity": "sha512-QUNFEOPELfmvv+4xiNg2sRYeS/P84pTW0TCgP5zc9FpXetHY0ab7SxKyAQCNCc1eK0459uoLI1y5oO5Vc1dbhA==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-symbol": "^2.0.0"
      }
    },
    "node_modules/micromark-util-classify-character": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-classify-character/-/micromark-util-classify-character-2.0.1.tgz",
      "integrity": "sha512-K0kHzM6afW/MbeWYWLjoHQv1sgg2Q9EccHEDzSkxiP/EaagNzCm7T/WMKZ3rjMbvIpvBiZgwR3dKMygtA4mG1Q==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-character": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-util-combine-extensions": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-combine-extensions/-/micromark-util-combine-extensions-2.0.1.tgz",
      "integrity": "sha512-OnAnH8Ujmy59JcyZw8JSbK9cGpdVY44NKgSM7E9Eh7DiLS2E9RNQf0dONaGDzEG9yjEl5hcqeIsj4hfRkLH/Bg==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-chunked": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-util-decode-numeric-character-reference": {
      "version": "2.0.2",
      "resolved": "https://registry.npmmirror.com/micromark-util-decode-numeric-character-reference/-/micromark-util-decode-numeric-character-reference-2.0.2.tgz",
      "integrity": "sha512-ccUbYk6CwVdkmCQMyr64dXz42EfHGkPQlBj5p7YVGzq8I7CtjXZJrubAYezf7Rp+bjPseiROqe7G6foFd+lEuw==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-symbol": "^2.0.0"
      }
    },
    "node_modules/micromark-util-decode-string": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-decode-string/-/micromark-util-decode-string-2.0.1.tgz",
      "integrity": "sha512-nDV/77Fj6eH1ynwscYTOsbK7rR//Uj0bZXBwJZRfaLEJ1iGBR6kIfNmlNqaqJf649EP0F3NWNdeJi03elllNUQ==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "decode-named-character-reference": "^1.0.0",
        "micromark-util-character": "^2.0.0",
        "micromark-util-decode-numeric-character-reference": "^2.0.0",
        "micromark-util-symbol": "^2.0.0"
      }
    },
    "node_modules/micromark-util-encode": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-encode/-/micromark-util-encode-2.0.1.tgz",
      "integrity": "sha512-c3cVx2y4KqUnwopcO9b/SCdo2O67LwJJ/UyqGfbigahfegL9myoEFoDYZgkT7f36T0bLrM9hZTAaAyH+PCAXjw==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT"
    },
    "node_modules/micromark-util-html-tag-name": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-html-tag-name/-/micromark-util-html-tag-name-2.0.1.tgz",
      "integrity": "sha512-2cNEiYDhCWKI+Gs9T0Tiysk136SnR13hhO8yW6BGNyhOC4qYFnwF1nKfD3HFAIXA5c45RrIG1ub11GiXeYd1xA==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT"
    },
    "node_modules/micromark-util-normalize-identifier": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-normalize-identifier/-/micromark-util-normalize-identifier-2.0.1.tgz",
      "integrity": "sha512-sxPqmo70LyARJs0w2UclACPUUEqltCkJ6PhKdMIDuJ3gSf/Q+/GIe3WKl0Ijb/GyH9lOpUkRAO2wp0GVkLvS9Q==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-symbol": "^2.0.0"
      }
    },
    "node_modules/micromark-util-resolve-all": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-resolve-all/-/micromark-util-resolve-all-2.0.1.tgz",
      "integrity": "sha512-VdQyxFWFT2/FGJgwQnJYbe1jjQoNTS4RjglmSjTUlpUMa95Htx9NHeYW4rGDJzbjvCsl9eLjMQwGeElsqmzcHg==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-util-sanitize-uri": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-sanitize-uri/-/micromark-util-sanitize-uri-2.0.1.tgz",
      "integrity": "sha512-9N9IomZ/YuGGZZmQec1MbgxtlgougxTodVwDzzEouPKo3qFWvymFHWcnDi2vzV1ff6kas9ucW+o3yzJK9YB1AQ==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "micromark-util-character": "^2.0.0",
        "micromark-util-encode": "^2.0.0",
        "micromark-util-symbol": "^2.0.0"
      }
    },
    "node_modules/micromark-util-subtokenize": {
      "version": "2.1.0",
      "resolved": "https://registry.npmmirror.com/micromark-util-subtokenize/-/micromark-util-subtokenize-2.1.0.tgz",
      "integrity": "sha512-XQLu552iSctvnEcgXw6+Sx75GflAPNED1qx7eBJ+wydBb2KCbRZe+NwvIEEMM83uml1+2WSXpBAcp9IUCgCYWA==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "devlop": "^1.0.0",
        "micromark-util-chunked": "^2.0.0",
        "micromark-util-symbol": "^2.0.0",
        "micromark-util-types": "^2.0.0"
      }
    },
    "node_modules/micromark-util-symbol": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/micromark-util-symbol/-/micromark-util-symbol-2.0.1.tgz",
      "integrity": "sha512-vs5t8Apaud9N28kgCrRUdEed4UJ+wWNvicHLPxCa9ENlYuAY31M0ETy5y1vA33YoNPDFTghEbnh6efaE8h4x0Q==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT"
    },
    "node_modules/micromark-util-types": {
      "version": "2.0.2",
      "resolved": "https://registry.npmmirror.com/micromark-util-types/-/micromark-util-types-2.0.2.tgz",
      "integrity": "sha512-Yw0ECSpJoViF1qTU4DC6NwtC4aWGt1EkzaQB8KPPyCRR8z9TWeV0HbEFGTO+ZY1wB22zmxnJqhPyTpOVCpeHTA==",
      "funding": [
        {
          "type": "GitHub Sponsors",
          "url": "https://github.com/sponsors/unifiedjs"
        },
        {
          "type": "OpenCollective",
          "url": "https://opencollective.com/unified"
        }
      ],
      "license": "MIT"
    },
    "node_modules/minimatch": {
      "version": "10.2.5",
      "resolved": "https://registry.npmmirror.com/minimatch/-/minimatch-10.2.5.tgz",
      "integrity": "sha512-MULkVLfKGYDFYejP07QOurDLLQpcjk7Fw+7jXS2R2czRQzR56yHRveU5NDJEOviH+hETZKSkIk5c+T23GjFUMg==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.5"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.3",
      "resolved": "https://registry.npmmirror.com/minipass/-/minipass-7.1.3.tgz",
      "integrity": "sha512-tEBHqDnIoM/1rXME1zgka9g6Q2lcoCkxHLuc7ODJ5BxbP5d4c2Z5cGgtXAku59200Cx7diuHTOYfSBD8n6mm8A==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/minizlib": {
      "version": "3.1.0",
      "resolved": "https://registry.npmmirror.com/minizlib/-/minizlib-3.1.0.tgz",
      "integrity": "sha512-KZxYo1BUkWD2TVFLr0MQoM8vUUigWD3LlD83a/75BqC+4qE0Hb1Vo5v1FgcfaNXvfXzr+5EhQ6ing/CaBijTlw==",
      "license": "MIT",
      "dependencies": {
        "minipass": "^7.1.2"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/mrmime": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/mrmime/-/mrmime-2.0.1.tgz",
      "integrity": "sha512-Y3wQdFg2Va6etvQ5I82yUhGdsKrcYox6p7FfL1LbK2J4V01F9TGlepTIhnK24t7koZibmg82KGglhA1XK5IsLQ==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmmirror.com/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmmirror.com/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/neotraverse": {
      "version": "0.6.18",
      "resolved": "https://registry.npmmirror.com/neotraverse/-/neotraverse-0.6.18.tgz",
      "integrity": "sha512-Z4SmBUweYa09+o6pG+eASabEpP6QkQ70yHj351pQoEXIs8uHbaU2DWVmzBANKgflPa47A50PtB2+NgRpQvr7vA==",
      "license": "MIT",
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/nlcst-to-string": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/nlcst-to-string/-/nlcst-to-string-4.0.0.tgz",
      "integrity": "sha512-YKLBCcUYKAg0FNlOBT6aI91qFmSiFKiluk655WzPF+DDMA02qIyy8uiRqI8QXtcFpEvll12LpL5MXqEmAZ+dcA==",
      "license": "MIT",
      "dependencies": {
        "@types/nlcst": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/node-fetch": {
      "version": "2.7.0",
      "resolved": "https://registry.npmmirror.com/node-fetch/-/node-fetch-2.7.0.tgz",
      "integrity": "sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==",
      "license": "MIT",
      "dependencies": {
        "whatwg-url": "^5.0.0"
      },
      "engines": {
        "node": "4.x || >=6.0.0"
      },
      "peerDependencies": {
        "encoding": "^0.1.0"
      },
      "peerDependenciesMeta": {
        "encoding": {
          "optional": true
        }
      }
    },
    "node_modules/node-fetch-native": {
      "version": "1.6.7",
      "resolved": "https://registry.npmmirror.com/node-fetch-native/-/node-fetch-native-1.6.7.tgz",
      "integrity": "sha512-g9yhqoedzIUm0nTnTqAQvueMPVOuIY16bqgAJJC8XOOubYFNwz6IER9qs0Gq2Xd0+CecCKFjtdDTMA4u4xG06Q==",
      "license": "MIT"
    },
    "node_modules/node-gyp-build": {
      "version": "4.8.4",
      "resolved": "https://registry.npmmirror.com/node-gyp-build/-/node-gyp-build-4.8.4.tgz",
      "integrity": "sha512-LA4ZjwlnUblHVgq0oBF3Jl/6h/Nvs5fzBLwdEF4nuxnFdsfajde4WfxtJr3CaiH+F6ewcIB/q4jQ4UzPyid+CQ==",
      "license": "MIT",
      "bin": {
        "node-gyp-build": "bin.js",
        "node-gyp-build-optional": "optional.js",
        "node-gyp-build-test": "build-test.js"
      }
    },
    "node_modules/node-mock-http": {
      "version": "1.0.4",
      "resolved": "https://registry.npmmirror.com/node-mock-http/-/node-mock-http-1.0.4.tgz",
      "integrity": "sha512-8DY+kFsDkNXy1sJglUfuODx1/opAGJGyrTuFqEoN90oRc2Vk0ZbD4K2qmKXBBEhZQzdKHIVfEJpDU8Ak2NJEvQ==",
      "license": "MIT"
    },
    "node_modules/node-releases": {
      "version": "2.0.37",
      "resolved": "https://registry.npmmirror.com/node-releases/-/node-releases-2.0.37.tgz",
      "integrity": "sha512-1h5gKZCF+pO/o3Iqt5Jp7wc9rH3eJJ0+nh/CIoiRwjRxde/hAHyLPXYN4V3CqKAbiZPSeJFSWHmJsbkicta0Eg==",
      "license": "MIT"
    },
    "node_modules/nopt": {
      "version": "8.1.0",
      "resolved": "https://registry.npmmirror.com/nopt/-/nopt-8.1.0.tgz",
      "integrity": "sha512-ieGu42u/Qsa4TFktmaKEwM6MQH0pOWnaB3htzh0JRtx84+Mebc0cbZYN5bC+6WTZ4+77xrL9Pn5m7CV6VIkV7A==",
      "license": "ISC",
      "dependencies": {
        "abbrev": "^3.0.0"
      },
      "bin": {
        "nopt": "bin/nopt.js"
      },
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/nth-check": {
      "version": "2.1.1",
      "resolved": "https://registry.npmmirror.com/nth-check/-/nth-check-2.1.1.tgz",
      "integrity": "sha512-lqjrjmaOoAnWfMmBPL+XNnynZh2+swxiX3WUE0s4yEHI6m+AwrK2UZOimIRl3X/4QctVqS8AiZjFqyOGrMXb/w==",
      "license": "BSD-2-Clause",
      "dependencies": {
        "boolbase": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/fb55/nth-check?sponsor=1"
      }
    },
    "node_modules/obug": {
      "version": "2.1.1",
      "resolved": "https://registry.npmmirror.com/obug/-/obug-2.1.1.tgz",
      "integrity": "sha512-uTqF9MuPraAQ+IsnPf366RG4cP9RtUi7MLO1N3KEc+wb0a6yKpeL0lmk2IB1jY5KHPAlTc6T/JRdC/YqxHNwkQ==",
      "funding": [
        "https://github.com/sponsors/sxzz",
        "https://opencollective.com/debug"
      ],
      "license": "MIT"
    },
    "node_modules/ofetch": {
      "version": "1.5.1",
      "resolved": "https://registry.npmmirror.com/ofetch/-/ofetch-1.5.1.tgz",
      "integrity": "sha512-2W4oUZlVaqAPAil6FUg/difl6YhqhUR7x2eZY4bQCko22UXg3hptq9KLQdqFClV+Wu85UX7hNtdGTngi/1BxcA==",
      "license": "MIT",
      "dependencies": {
        "destr": "^2.0.5",
        "node-fetch-native": "^1.6.7",
        "ufo": "^1.6.1"
      }
    },
    "node_modules/ohash": {
      "version": "2.0.11",
      "resolved": "https://registry.npmmirror.com/ohash/-/ohash-2.0.11.tgz",
      "integrity": "sha512-RdR9FQrFwNBNXAr4GixM8YaRZRJ5PUWbKYbE5eOsrwAjJW0q2REGcf79oYPsLyskQCZG1PLN+S/K1V00joZAoQ==",
      "license": "MIT"
    },
    "node_modules/oniguruma-parser": {
      "version": "0.12.1",
      "resolved": "https://registry.npmmirror.com/oniguruma-parser/-/oniguruma-parser-0.12.1.tgz",
      "integrity": "sha512-8Unqkvk1RYc6yq2WBYRj4hdnsAxVze8i7iPfQr8e4uSP3tRv0rpZcbGUDvxfQQcdwHt/e9PrMvGCsa8OqG9X3w==",
      "license": "MIT"
    },
    "node_modules/oniguruma-to-es": {
      "version": "4.3.5",
      "resolved": "https://registry.npmmirror.com/oniguruma-to-es/-/oniguruma-to-es-4.3.5.tgz",
      "integrity": "sha512-Zjygswjpsewa0NLTsiizVuMQZbp0MDyM6lIt66OxsF21npUDlzpHi1Mgb/qhQdkb+dWFTzJmFbEWdvZgRho8eQ==",
      "license": "MIT",
      "dependencies": {
        "oniguruma-parser": "^0.12.1",
        "regex": "^6.1.0",
        "regex-recursion": "^6.0.2"
      }
    },
    "node_modules/p-limit": {
      "version": "7.3.0",
      "resolved": "https://registry.npmmirror.com/p-limit/-/p-limit-7.3.0.tgz",
      "integrity": "sha512-7cIXg/Z0M5WZRblrsOla88S4wAK+zOQQWeBYfV3qJuJXMr+LnbYjaadrFaS0JILfEDPVqHyKnZ1Z/1d6J9VVUw==",
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^1.2.1"
      },
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-queue": {
      "version": "9.1.2",
      "resolved": "https://registry.npmmirror.com/p-queue/-/p-queue-9.1.2.tgz",
      "integrity": "sha512-ktsDOALzTYTWWF1PbkNVg2rOt+HaOaMWJMUnt7T3qf5tvZ1L8dBW3tObzprBcXNMKkwj+yFSLqHso0x+UFcJXw==",
      "license": "MIT",
      "dependencies": {
        "eventemitter3": "^5.0.1",
        "p-timeout": "^7.0.0"
      },
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-timeout": {
      "version": "7.0.1",
      "resolved": "https://registry.npmmirror.com/p-timeout/-/p-timeout-7.0.1.tgz",
      "integrity": "sha512-AxTM2wDGORHGEkPCt8yqxOTMgpfbEHqF51f/5fJCmwFC3C/zNcGT63SymH2ttOAaiIws2zVg4+izQCjrakcwHg==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/package-manager-detector": {
      "version": "1.6.0",
      "resolved": "https://registry.npmmirror.com/package-manager-detector/-/package-manager-detector-1.6.0.tgz",
      "integrity": "sha512-61A5ThoTiDG/C8s8UMZwSorAGwMJ0ERVGj2OjoW5pAalsNOg15+iQiPzrLJ4jhZ1HJzmC2PIHT2oEiH3R5fzNA==",
      "license": "MIT"
    },
    "node_modules/parse-latin": {
      "version": "7.0.0",
      "resolved": "https://registry.npmmirror.com/parse-latin/-/parse-latin-7.0.0.tgz",
      "integrity": "sha512-mhHgobPPua5kZ98EF4HWiH167JWBfl4pvAIXXdbaVohtK7a6YBOy56kvhCqduqyo/f3yrHFWmqmiMg/BkBkYYQ==",
      "license": "MIT",
      "dependencies": {
        "@types/nlcst": "^2.0.0",
        "@types/unist": "^3.0.0",
        "nlcst-to-string": "^4.0.0",
        "unist-util-modify-children": "^4.0.0",
        "unist-util-visit-children": "^3.0.0",
        "vfile": "^6.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/parse5": {
      "version": "7.3.0",
      "resolved": "https://registry.npmmirror.com/parse5/-/parse5-7.3.0.tgz",
      "integrity": "sha512-IInvU7fabl34qmi9gY8XOVxhYyMyuH2xUNpb2q8/Y+7552KlejkRvqvD19nMoUW/uQGGbqNpA6Tufu5FL5BZgw==",
      "license": "MIT",
      "dependencies": {
        "entities": "^6.0.0"
      },
      "funding": {
        "url": "https://github.com/inikulin/parse5?sponsor=1"
      }
    },
    "node_modules/path-scurry": {
      "version": "2.0.2",
      "resolved": "https://registry.npmmirror.com/path-scurry/-/path-scurry-2.0.2.tgz",
      "integrity": "sha512-3O/iVVsJAPsOnpwWIeD+d6z/7PmqApyQePUtCndjatj/9I5LylHvt5qluFaBT3I5h3r1ejfR056c+FCv+NnNXg==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "lru-cache": "^11.0.0",
        "minipass": "^7.1.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "6.1.0",
      "resolved": "https://registry.npmmirror.com/path-to-regexp/-/path-to-regexp-6.1.0.tgz",
      "integrity": "sha512-h9DqehX3zZZDCEm+xbfU0ZmwCGFCAAraPJWMXJ4+v32NjZJilVg3k1TcKsRgIb8IQ/izZSaydDc1OhJCZvs2Dw==",
      "license": "MIT"
    },
    "node_modules/path-to-regexp-updated": {
      "name": "path-to-regexp",
      "version": "6.3.0",
      "resolved": "https://registry.npmmirror.com/path-to-regexp/-/path-to-regexp-6.3.0.tgz",
      "integrity": "sha512-Yhpw4T9C6hPpgPeA28us07OJeqZ5EzQTkbfwuhsUg0c237RomFoETJgmp2sa3F/41gfLE6G5cqcYwznmeEeOlQ==",
      "license": "MIT"
    },
    "node_modules/piccolore": {
      "version": "0.1.3",
      "resolved": "https://registry.npmmirror.com/piccolore/-/piccolore-0.1.3.tgz",
      "integrity": "sha512-o8bTeDWjE086iwKrROaDf31K0qC/BENdm15/uH9usSC/uZjJOKb2YGiVHfLY4GhwsERiPI1jmwI2XrA7ACOxVw==",
      "license": "ISC"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmmirror.com/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmmirror.com/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.8",
      "resolved": "https://registry.npmmirror.com/postcss/-/postcss-8.5.8.tgz",
      "integrity": "sha512-OW/rX8O/jXnm82Ey1k44pObPtdblfiuWnrd8X7GJ7emImCOstunGbXUpp7HdBrFQX6rJzn3sPT397Wp5aCwCHg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prismjs": {
      "version": "1.30.0",
      "resolved": "https://registry.npmmirror.com/prismjs/-/prismjs-1.30.0.tgz",
      "integrity": "sha512-DEvV2ZF2r2/63V+tK8hQvrR2ZGn10srHbXviTlcv7Kpzw8jWiNTqbVgjO3IY8RxrrOUF8VPMQQFysYYYv0YZxw==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/property-information": {
      "version": "7.1.0",
      "resolved": "https://registry.npmmirror.com/property-information/-/property-information-7.1.0.tgz",
      "integrity": "sha512-TwEZ+X+yCJmYfL7TPUOcvBZ4QfoT5YenQiJuX//0th53DE6w0xxLEtfK3iyryQFddXuvkIk51EEgrJQ0WJkOmQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmmirror.com/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/radix3": {
      "version": "1.1.2",
      "resolved": "https://registry.npmmirror.com/radix3/-/radix3-1.1.2.tgz",
      "integrity": "sha512-b484I/7b8rDEdSDKckSSBA8knMpcdsXudlE/LNL639wFoHKwLbEkQFZHWEYwDC0wa0FKUcCY+GAF73Z7wxNVFA==",
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.2.4",
      "resolved": "https://registry.npmmirror.com/react/-/react-19.2.4.tgz",
      "integrity": "sha512-9nfp2hYpCwOjAN+8TZFGhtWEwgvWHXqESH8qT89AT/lWklpLON22Lc8pEtnpsZz7VmawabSU0gCjnj8aC0euHQ==",
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.4",
      "resolved": "https://registry.npmmirror.com/react-dom/-/react-dom-19.2.4.tgz",
      "integrity": "sha512-AXJdLo8kgMbimY95O2aKQqsz2iWi9jMgKJhRBAxECE4IFxfcazB2LmzloIoibJI3C12IlY20+KFaLv+71bUJeQ==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.4"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.18.0",
      "resolved": "https://registry.npmmirror.com/react-refresh/-/react-refresh-0.18.0.tgz",
      "integrity": "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/readdirp": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/readdirp/-/readdirp-5.0.0.tgz",
      "integrity": "sha512-9u/XQ1pvrQtYyMpZe7DXKv2p5CNvyVwzUB6uhLAnQwHMSgKMBR62lc7AHljaeteeHXn11XTAaLLUVZYVZyuRBQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.0"
      },
      "funding": {
        "type": "individual",
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/regex": {
      "version": "6.1.0",
      "resolved": "https://registry.npmmirror.com/regex/-/regex-6.1.0.tgz",
      "integrity": "sha512-6VwtthbV4o/7+OaAF9I5L5V3llLEsoPyq9P1JVXkedTP33c7MfCG0/5NOPcSJn0TzXcG9YUrR0gQSWioew3LDg==",
      "license": "MIT",
      "dependencies": {
        "regex-utilities": "^2.3.0"
      }
    },
    "node_modules/regex-recursion": {
      "version": "6.0.2",
      "resolved": "https://registry.npmmirror.com/regex-recursion/-/regex-recursion-6.0.2.tgz",
      "integrity": "sha512-0YCaSCq2VRIebiaUviZNs0cBz1kg5kVS2UKUfNIx8YVs1cN3AV7NTctO5FOKBA+UT2BPJIWZauYHPqJODG50cg==",
      "license": "MIT",
      "dependencies": {
        "regex-utilities": "^2.3.0"
      }
    },
    "node_modules/regex-utilities": {
      "version": "2.3.0",
      "resolved": "https://registry.npmmirror.com/regex-utilities/-/regex-utilities-2.3.0.tgz",
      "integrity": "sha512-8VhliFJAWRaUiVvREIiW2NXXTmHs4vMNnSzuJVhscgmGav3g9VDxLrQndI3dZZVVdp0ZO/5v0xmX516/7M9cng==",
      "license": "MIT"
    },
    "node_modules/rehype": {
      "version": "13.0.2",
      "resolved": "https://registry.npmmirror.com/rehype/-/rehype-13.0.2.tgz",
      "integrity": "sha512-j31mdaRFrwFRUIlxGeuPXXKWQxet52RBQRvCmzl5eCefn/KGbomK5GMHNMsOJf55fgo3qw5tST5neDuarDYR2A==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "rehype-parse": "^9.0.0",
        "rehype-stringify": "^10.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/rehype-parse": {
      "version": "9.0.1",
      "resolved": "https://registry.npmmirror.com/rehype-parse/-/rehype-parse-9.0.1.tgz",
      "integrity": "sha512-ksCzCD0Fgfh7trPDxr2rSylbwq9iYDkSn8TCDmEJ49ljEUBxDVCzCHv7QNzZOfODanX4+bWQ4WZqLCRWYLfhag==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "hast-util-from-html": "^2.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/rehype-raw": {
      "version": "7.0.0",
      "resolved": "https://registry.npmmirror.com/rehype-raw/-/rehype-raw-7.0.0.tgz",
      "integrity": "sha512-/aE8hCfKlQeA8LmyeyQvQF3eBiLRGNlfBJEvWH7ivp9sBqs7TNqBL5X3v157rM4IFETqDnIOO+z5M/biZbo9Ww==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "hast-util-raw": "^9.0.0",
        "vfile": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/rehype-stringify": {
      "version": "10.0.1",
      "resolved": "https://registry.npmmirror.com/rehype-stringify/-/rehype-stringify-10.0.1.tgz",
      "integrity": "sha512-k9ecfXHmIPuFVI61B9DeLPN0qFHfawM6RsuX48hoqlaKSF61RskNjSm1lI8PhBEM0MRdLxVVm4WmTqJQccH9mA==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "hast-util-to-html": "^9.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-gfm": {
      "version": "4.0.1",
      "resolved": "https://registry.npmmirror.com/remark-gfm/-/remark-gfm-4.0.1.tgz",
      "integrity": "sha512-1quofZ2RQ9EWdeN34S79+KExV1764+wCUGop5CPL1WGdD0ocPpu91lzPGbwWMECpEpd42kJGQwzRfyov9j4yNg==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "mdast-util-gfm": "^3.0.0",
        "micromark-extension-gfm": "^3.0.0",
        "remark-parse": "^11.0.0",
        "remark-stringify": "^11.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-parse": {
      "version": "11.0.0",
      "resolved": "https://registry.npmmirror.com/remark-parse/-/remark-parse-11.0.0.tgz",
      "integrity": "sha512-FCxlKLNGknS5ba/1lmpYijMUzX2esxW5xQqjWxw2eHFfS2MSdaHVINFmhjo+qN1WhZhNimq0dZATN9pH0IDrpA==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "mdast-util-from-markdown": "^2.0.0",
        "micromark-util-types": "^2.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-rehype": {
      "version": "11.1.2",
      "resolved": "https://registry.npmmirror.com/remark-rehype/-/remark-rehype-11.1.2.tgz",
      "integrity": "sha512-Dh7l57ianaEoIpzbp0PC9UKAdCSVklD8E5Rpw7ETfbTl3FqcOOgq5q2LVDhgGCkaBv7p24JXikPdvhhmHvKMsw==",
      "license": "MIT",
      "dependencies": {
        "@types/hast": "^3.0.0",
        "@types/mdast": "^4.0.0",
        "mdast-util-to-hast": "^13.0.0",
        "unified": "^11.0.0",
        "vfile": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/remark-smartypants": {
      "version": "3.0.2",
      "resolved": "https://registry.npmmirror.com/remark-smartypants/-/remark-smartypants-3.0.2.tgz",
      "integrity": "sha512-ILTWeOriIluwEvPjv67v7Blgrcx+LZOkAUVtKI3putuhlZm84FnqDORNXPPm+HY3NdZOMhyDwZ1E+eZB/Df5dA==",
      "license": "MIT",
      "dependencies": {
        "retext": "^9.0.0",
        "retext-smartypants": "^6.0.0",
        "unified": "^11.0.4",
        "unist-util-visit": "^5.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/remark-stringify": {
      "version": "11.0.0",
      "resolved": "https://registry.npmmirror.com/remark-stringify/-/remark-stringify-11.0.0.tgz",
      "integrity": "sha512-1OSmLd3awB/t8qdoEOMazZkNsfVTeY4fTsgzcQFdXNq8ToTN4ZGwrMnlda4K6smTFKD+GRV6O48i6Z4iKgPPpw==",
      "license": "MIT",
      "dependencies": {
        "@types/mdast": "^4.0.0",
        "mdast-util-to-markdown": "^2.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/resolve-from": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/resolve-from/-/resolve-from-5.0.0.tgz",
      "integrity": "sha512-qYg9KP24dD5qka9J47d0aVky0N+b4fTU89LN9iDnjB5waksiC49rvMB0PrUJQGoTmH50XPiqOvAjDfaijGxYZw==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/retext": {
      "version": "9.0.0",
      "resolved": "https://registry.npmmirror.com/retext/-/retext-9.0.0.tgz",
      "integrity": "sha512-sbMDcpHCNjvlheSgMfEcVrZko3cDzdbe1x/e7G66dFp0Ff7Mldvi2uv6JkJQzdRcvLYE8CA8Oe8siQx8ZOgTcA==",
      "license": "MIT",
      "dependencies": {
        "@types/nlcst": "^2.0.0",
        "retext-latin": "^4.0.0",
        "retext-stringify": "^4.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/retext-latin": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/retext-latin/-/retext-latin-4.0.0.tgz",
      "integrity": "sha512-hv9woG7Fy0M9IlRQloq/N6atV82NxLGveq+3H2WOi79dtIYWN8OaxogDm77f8YnVXJL2VD3bbqowu5E3EMhBYA==",
      "license": "MIT",
      "dependencies": {
        "@types/nlcst": "^2.0.0",
        "parse-latin": "^7.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/retext-smartypants": {
      "version": "6.2.0",
      "resolved": "https://registry.npmmirror.com/retext-smartypants/-/retext-smartypants-6.2.0.tgz",
      "integrity": "sha512-kk0jOU7+zGv//kfjXEBjdIryL1Acl4i9XNkHxtM7Tm5lFiCog576fjNC9hjoR7LTKQ0DsPWy09JummSsH1uqfQ==",
      "license": "MIT",
      "dependencies": {
        "@types/nlcst": "^2.0.0",
        "nlcst-to-string": "^4.0.0",
        "unist-util-visit": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/retext-stringify": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/retext-stringify/-/retext-stringify-4.0.0.tgz",
      "integrity": "sha512-rtfN/0o8kL1e+78+uxPTqu1Klt0yPzKuQ2BfWwwfgIUSayyzxpM1PJzkKt4V8803uB9qSy32MvI7Xep9khTpiA==",
      "license": "MIT",
      "dependencies": {
        "@types/nlcst": "^2.0.0",
        "nlcst-to-string": "^4.0.0",
        "unified": "^11.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/rollup": {
      "version": "4.60.1",
      "resolved": "https://registry.npmmirror.com/rollup/-/rollup-4.60.1.tgz",
      "integrity": "sha512-VmtB2rFU/GroZ4oL8+ZqXgSA38O6GR8KSIvWmEFv63pQ0G6KaBH9s07PO8XTXP4vI+3UJUEypOfjkGfmSBBR0w==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.60.1",
        "@rollup/rollup-android-arm64": "4.60.1",
        "@rollup/rollup-darwin-arm64": "4.60.1",
        "@rollup/rollup-darwin-x64": "4.60.1",
        "@rollup/rollup-freebsd-arm64": "4.60.1",
        "@rollup/rollup-freebsd-x64": "4.60.1",
        "@rollup/rollup-linux-arm-gnueabihf": "4.60.1",
        "@rollup/rollup-linux-arm-musleabihf": "4.60.1",
        "@rollup/rollup-linux-arm64-gnu": "4.60.1",
        "@rollup/rollup-linux-arm64-musl": "4.60.1",
        "@rollup/rollup-linux-loong64-gnu": "4.60.1",
        "@rollup/rollup-linux-loong64-musl": "4.60.1",
        "@rollup/rollup-linux-ppc64-gnu": "4.60.1",
        "@rollup/rollup-linux-ppc64-musl": "4.60.1",
        "@rollup/rollup-linux-riscv64-gnu": "4.60.1",
        "@rollup/rollup-linux-riscv64-musl": "4.60.1",
        "@rollup/rollup-linux-s390x-gnu": "4.60.1",
        "@rollup/rollup-linux-x64-gnu": "4.60.1",
        "@rollup/rollup-linux-x64-musl": "4.60.1",
        "@rollup/rollup-openbsd-x64": "4.60.1",
        "@rollup/rollup-openharmony-arm64": "4.60.1",
        "@rollup/rollup-win32-arm64-msvc": "4.60.1",
        "@rollup/rollup-win32-ia32-msvc": "4.60.1",
        "@rollup/rollup-win32-x64-gnu": "4.60.1",
        "@rollup/rollup-win32-x64-msvc": "4.60.1",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/sax": {
      "version": "1.6.0",
      "resolved": "https://registry.npmmirror.com/sax/-/sax-1.6.0.tgz",
      "integrity": "sha512-6R3J5M4AcbtLUdZmRv2SygeVaM7IhrLXu9BmnOGmmACak8fiUtOsYNWUS4uK7upbmHIBbLBeFeI//477BKLBzA==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=11.0.0"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmmirror.com/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmmirror.com/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/sharp": {
      "version": "0.34.5",
      "resolved": "https://registry.npmmirror.com/sharp/-/sharp-0.34.5.tgz",
      "integrity": "sha512-Ou9I5Ft9WNcCbXrU9cMgPBcCK8LiwLqcbywW3t4oDV37n1pzpuNLsYiAV8eODnjbtQlSDwZ2cUEeQz4E54Hltg==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/colour": "^1.0.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.7.3"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.34.5",
        "@img/sharp-darwin-x64": "0.34.5",
        "@img/sharp-libvips-darwin-arm64": "1.2.4",
        "@img/sharp-libvips-darwin-x64": "1.2.4",
        "@img/sharp-libvips-linux-arm": "1.2.4",
        "@img/sharp-libvips-linux-arm64": "1.2.4",
        "@img/sharp-libvips-linux-ppc64": "1.2.4",
        "@img/sharp-libvips-linux-riscv64": "1.2.4",
        "@img/sharp-libvips-linux-s390x": "1.2.4",
        "@img/sharp-libvips-linux-x64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4",
        "@img/sharp-linux-arm": "0.34.5",
        "@img/sharp-linux-arm64": "0.34.5",
        "@img/sharp-linux-ppc64": "0.34.5",
        "@img/sharp-linux-riscv64": "0.34.5",
        "@img/sharp-linux-s390x": "0.34.5",
        "@img/sharp-linux-x64": "0.34.5",
        "@img/sharp-linuxmusl-arm64": "0.34.5",
        "@img/sharp-linuxmusl-x64": "0.34.5",
        "@img/sharp-wasm32": "0.34.5",
        "@img/sharp-win32-arm64": "0.34.5",
        "@img/sharp-win32-ia32": "0.34.5",
        "@img/sharp-win32-x64": "0.34.5"
      }
    },
    "node_modules/shiki": {
      "version": "4.0.2",
      "resolved": "https://registry.npmmirror.com/shiki/-/shiki-4.0.2.tgz",
      "integrity": "sha512-eAVKTMedR5ckPo4xne/PjYQYrU3qx78gtJZ+sHlXEg5IHhhoQhMfZVzetTYuaJS0L2Ef3AcCRzCHV8T0WI6nIQ==",
      "license": "MIT",
      "dependencies": {
        "@shikijs/core": "4.0.2",
        "@shikijs/engine-javascript": "4.0.2",
        "@shikijs/engine-oniguruma": "4.0.2",
        "@shikijs/langs": "4.0.2",
        "@shikijs/themes": "4.0.2",
        "@shikijs/types": "4.0.2",
        "@shikijs/vscode-textmate": "^10.0.2",
        "@types/hast": "^3.0.4"
      },
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/sisteransi": {
      "version": "1.0.5",
      "resolved": "https://registry.npmmirror.com/sisteransi/-/sisteransi-1.0.5.tgz",
      "integrity": "sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==",
      "license": "MIT"
    },
    "node_modules/smol-toml": {
      "version": "1.6.1",
      "resolved": "https://registry.npmmirror.com/smol-toml/-/smol-toml-1.6.1.tgz",
      "integrity": "sha512-dWUG8F5sIIARXih1DTaQAX4SsiTXhInKf1buxdY9DIg4ZYPZK5nGM1VRIYmEbDbsHt7USo99xSLFu5Q1IqTmsg==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "url": "https://github.com/sponsors/cyyynthia"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmmirror.com/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/space-separated-tokens": {
      "version": "2.0.2",
      "resolved": "https://registry.npmmirror.com/space-separated-tokens/-/space-separated-tokens-2.0.2.tgz",
      "integrity": "sha512-PEGlAwrG8yXGXRjW32fGbg66JAlOAwbObuqVoJpv/mRgoWDQfgH1wDPvtzWyUSNAXBGSk8h755YDbbcEy3SH2Q==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/stringify-entities": {
      "version": "4.0.4",
      "resolved": "https://registry.npmmirror.com/stringify-entities/-/stringify-entities-4.0.4.tgz",
      "integrity": "sha512-IwfBptatlO+QCJUo19AqvrPNqlVMpW9YEL2LIVY+Rpv2qsjCGxaDLNRgeGsQWJhfItebuJhsGSLjaBbNSQ+ieg==",
      "license": "MIT",
      "dependencies": {
        "character-entities-html4": "^2.0.0",
        "character-entities-legacy": "^3.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/svgo": {
      "version": "4.0.1",
      "resolved": "https://registry.npmmirror.com/svgo/-/svgo-4.0.1.tgz",
      "integrity": "sha512-XDpWUOPC6FEibaLzjfe0ucaV0YrOjYotGJO1WpF0Zd+n6ZGEQUsSugaoLq9QkEZtAfQIxT42UChcssDVPP3+/w==",
      "license": "MIT",
      "dependencies": {
        "commander": "^11.1.0",
        "css-select": "^5.1.0",
        "css-tree": "^3.0.1",
        "css-what": "^6.1.0",
        "csso": "^5.0.5",
        "picocolors": "^1.1.1",
        "sax": "^1.5.0"
      },
      "bin": {
        "svgo": "bin/svgo.js"
      },
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/svgo"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.2.2",
      "resolved": "https://registry.npmmirror.com/tailwindcss/-/tailwindcss-4.2.2.tgz",
      "integrity": "sha512-KWBIxs1Xb6NoLdMVqhbhgwZf2PGBpPEiwOqgI4pFIYbNTfBXiKYyWoTsXgBQ9WFg/OlhnvHaY+AEpW7wSmFo2Q==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.2",
      "resolved": "https://registry.npmmirror.com/tapable/-/tapable-2.3.2.tgz",
      "integrity": "sha512-1MOpMXuhGzGL5TTCZFItxCc0AARf1EZFQkGqMm7ERKj8+Hgr5oLvJOVFcC+lRmR8hCe2S3jC4T5D7Vg/d7/fhA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tar": {
      "version": "7.5.13",
      "resolved": "https://registry.npmmirror.com/tar/-/tar-7.5.13.tgz",
      "integrity": "sha512-tOG/7GyXpFevhXVh8jOPJrmtRpOTsYqUIkVdVooZYJS/z8WhfQUX8RJILmeuJNinGAMSu1veBr4asSHFt5/hng==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/fs-minipass": "^4.0.0",
        "chownr": "^3.0.0",
        "minipass": "^7.1.2",
        "minizlib": "^3.1.0",
        "yallist": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/tar/node_modules/yallist": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/yallist/-/yallist-5.0.0.tgz",
      "integrity": "sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/tiny-inflate": {
      "version": "1.0.3",
      "resolved": "https://registry.npmmirror.com/tiny-inflate/-/tiny-inflate-1.0.3.tgz",
      "integrity": "sha512-pkY1fj1cKHb2seWDy0B16HeWyczlJA9/WW3u3c4z/NiWDsO3DOU5D7nhTLE9CF0yXv/QZFY7sEJmj24dK+Rrqw==",
      "license": "MIT"
    },
    "node_modules/tinyclip": {
      "version": "0.1.12",
      "resolved": "https://registry.npmmirror.com/tinyclip/-/tinyclip-0.1.12.tgz",
      "integrity": "sha512-Ae3OVUqifDw0wBriIBS7yVaW44Dp6eSHQcyq4Igc7eN2TJH/2YsicswaW+J/OuMvhpDPOKEgpAZCjkb4hpoyeA==",
      "license": "MIT",
      "engines": {
        "node": "^16.14.0 || >= 17.3.0"
      }
    },
    "node_modules/tinyexec": {
      "version": "1.0.4",
      "resolved": "https://registry.npmmirror.com/tinyexec/-/tinyexec-1.0.4.tgz",
      "integrity": "sha512-u9r3uZC0bdpGOXtlxUIdwf9pkmvhqJdrVCH9fapQtgy/OeTTMZ1nqH7agtvEfmGui6e1XxjcdrlxvxJvc3sMqw==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.15",
      "resolved": "https://registry.npmmirror.com/tinyglobby/-/tinyglobby-0.2.15.tgz",
      "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmmirror.com/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",
      "license": "MIT"
    },
    "node_modules/trim-lines": {
      "version": "3.0.1",
      "resolved": "https://registry.npmmirror.com/trim-lines/-/trim-lines-3.0.1.tgz",
      "integrity": "sha512-kRj8B+YHZCc9kQYdWfJB2/oUl9rA99qbowYYBtr4ui4mZyAQ2JpvVBd/6U2YloATfqBhBTSMhTpgBHtU0Mf3Rg==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/trough": {
      "version": "2.2.0",
      "resolved": "https://registry.npmmirror.com/trough/-/trough-2.2.0.tgz",
      "integrity": "sha512-tmMpK00BjZiUyVyvrBK7knerNgmgvcV/KLVyuma/SC+TQN167GrMRciANTz09+k3zW8L8t60jWO1GpfkZdjTaw==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/tsconfck": {
      "version": "3.1.6",
      "resolved": "https://registry.npmmirror.com/tsconfck/-/tsconfck-3.1.6.tgz",
      "integrity": "sha512-ks6Vjr/jEw0P1gmOVwutM3B7fWxoWBL2KRDb1JfqGVawBmO5UsvmWOQFGHBPl5yxYz4eERr19E6L7NMv+Fej4w==",
      "license": "MIT",
      "bin": {
        "tsconfck": "bin/tsconfck.js"
      },
      "engines": {
        "node": "^18 || >=20"
      },
      "peerDependencies": {
        "typescript": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmmirror.com/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD",
      "optional": true
    },
    "node_modules/ufo": {
      "version": "1.6.3",
      "resolved": "https://registry.npmmirror.com/ufo/-/ufo-1.6.3.tgz",
      "integrity": "sha512-yDJTmhydvl5lJzBmy/hyOAA0d+aqCBuwl818haVdYCRrWV84o7YyeVm4QlVHStqNrrJSTb6jKuFAVqAFsr+K3Q==",
      "license": "MIT"
    },
    "node_modules/ultrahtml": {
      "version": "1.6.0",
      "resolved": "https://registry.npmmirror.com/ultrahtml/-/ultrahtml-1.6.0.tgz",
      "integrity": "sha512-R9fBn90VTJrqqLDwyMph+HGne8eqY1iPfYhPzZrvKpIfwkWZbcYlfpsb8B9dTvBfpy1/hqAD7Wi8EKfP9e8zdw==",
      "license": "MIT"
    },
    "node_modules/uncrypto": {
      "version": "0.1.3",
      "resolved": "https://registry.npmmirror.com/uncrypto/-/uncrypto-0.1.3.tgz",
      "integrity": "sha512-Ql87qFHB3s/De2ClA9e0gsnS6zXG27SkTiSJwjCc9MebbfapQfuPzumMIUMi38ezPZVNFcHI9sUIepeQfw8J8Q==",
      "license": "MIT"
    },
    "node_modules/unified": {
      "version": "11.0.5",
      "resolved": "https://registry.npmmirror.com/unified/-/unified-11.0.5.tgz",
      "integrity": "sha512-xKvGhPWw3k84Qjh8bI3ZeJjqnyadK+GEFtazSfZv/rKeTkTjOJho6mFqh2SM96iIcZokxiOpg78GazTSg8+KHA==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "bail": "^2.0.0",
        "devlop": "^1.0.0",
        "extend": "^3.0.0",
        "is-plain-obj": "^4.0.0",
        "trough": "^2.0.0",
        "vfile": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unifont": {
      "version": "0.7.4",
      "resolved": "https://registry.npmmirror.com/unifont/-/unifont-0.7.4.tgz",
      "integrity": "sha512-oHeis4/xl42HUIeHuNZRGEvxj5AaIKR+bHPNegRq5LV1gdc3jundpONbjglKpihmJf+dswygdMJn3eftGIMemg==",
      "license": "MIT",
      "dependencies": {
        "css-tree": "^3.1.0",
        "ofetch": "^1.5.1",
        "ohash": "^2.0.11"
      }
    },
    "node_modules/unist-util-find-after": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/unist-util-find-after/-/unist-util-find-after-5.0.0.tgz",
      "integrity": "sha512-amQa0Ep2m6hE2g72AugUItjbuM8X8cGQnFoHk0pGfrFeT9GZhzN5SW8nRsiGKK7Aif4CrACPENkA6P/Lw6fHGQ==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "unist-util-is": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-is": {
      "version": "6.0.1",
      "resolved": "https://registry.npmmirror.com/unist-util-is/-/unist-util-is-6.0.1.tgz",
      "integrity": "sha512-LsiILbtBETkDz8I9p1dQ0uyRUWuaQzd/cuEeS1hoRSyW5E5XGmTzlwY1OrNzzakGowI9Dr/I8HVaw4hTtnxy8g==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-modify-children": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/unist-util-modify-children/-/unist-util-modify-children-4.0.0.tgz",
      "integrity": "sha512-+tdN5fGNddvsQdIzUF3Xx82CU9sMM+fA0dLgR9vOmT0oPT2jH+P1nd5lSqfCfXAw+93NhcXNY2qqvTUtE4cQkw==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "array-iterate": "^2.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-position": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/unist-util-position/-/unist-util-position-5.0.0.tgz",
      "integrity": "sha512-fucsC7HjXvkB5R3kTCO7kUjRdrS0BJt3M/FPxmHMBOm8JQi2BsHAHFsy27E0EolP8rp0NzXsJ+jNPyDWvOJZPA==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-remove-position": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/unist-util-remove-position/-/unist-util-remove-position-5.0.0.tgz",
      "integrity": "sha512-Hp5Kh3wLxv0PHj9m2yZhhLt58KzPtEYKQQ4yxfYFEO7EvHwzyDYnduhHnY1mDxoqr7VUwVuHXk9RXKIiYS1N8Q==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "unist-util-visit": "^5.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-stringify-position": {
      "version": "4.0.0",
      "resolved": "https://registry.npmmirror.com/unist-util-stringify-position/-/unist-util-stringify-position-4.0.0.tgz",
      "integrity": "sha512-0ASV06AAoKCDkS2+xw5RXJywruurpbC4JZSm7nr7MOt1ojAzvyyaO+UxZf18j8FCF6kmzCZKcAgN/yu2gm2XgQ==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-visit": {
      "version": "5.1.0",
      "resolved": "https://registry.npmmirror.com/unist-util-visit/-/unist-util-visit-5.1.0.tgz",
      "integrity": "sha512-m+vIdyeCOpdr/QeQCu2EzxX/ohgS8KbnPDgFni4dQsfSCtpz8UqDyY5GjRru8PDKuYn7Fq19j1CQ+nJSsGKOzg==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "unist-util-is": "^6.0.0",
        "unist-util-visit-parents": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-visit-children": {
      "version": "3.0.0",
      "resolved": "https://registry.npmmirror.com/unist-util-visit-children/-/unist-util-visit-children-3.0.0.tgz",
      "integrity": "sha512-RgmdTfSBOg04sdPcpTSD1jzoNBjt9a80/ZCzp5cI9n1qPzLZWF9YdvWGN2zmTumP1HWhXKdUWexjy/Wy/lJ7tA==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unist-util-visit-parents": {
      "version": "6.0.2",
      "resolved": "https://registry.npmmirror.com/unist-util-visit-parents/-/unist-util-visit-parents-6.0.2.tgz",
      "integrity": "sha512-goh1s1TBrqSqukSc8wrjwWhL0hiJxgA8m4kFxGlQ+8FYQ3C/m11FcTs4YYem7V664AhHVvgoQLk890Ssdsr2IQ==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "unist-util-is": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/unstorage": {
      "version": "1.17.5",
      "resolved": "https://registry.npmmirror.com/unstorage/-/unstorage-1.17.5.tgz",
      "integrity": "sha512-0i3iqvRfx29hkNntHyQvJTpf5W9dQ9ZadSoRU8+xVlhVtT7jAX57fazYO9EHvcRCfBCyi5YRya7XCDOsbTgkPg==",
      "license": "MIT",
      "dependencies": {
        "anymatch": "^3.1.3",
        "chokidar": "^5.0.0",
        "destr": "^2.0.5",
        "h3": "^1.15.10",
        "lru-cache": "^11.2.7",
        "node-fetch-native": "^1.6.7",
        "ofetch": "^1.5.1",
        "ufo": "^1.6.3"
      },
      "peerDependencies": {
        "@azure/app-configuration": "^1.8.0",
        "@azure/cosmos": "^4.2.0",
        "@azure/data-tables": "^13.3.0",
        "@azure/identity": "^4.6.0",
        "@azure/keyvault-secrets": "^4.9.0",
        "@azure/storage-blob": "^12.26.0",
        "@capacitor/preferences": "^6 || ^7 || ^8",
        "@deno/kv": ">=0.9.0",
        "@netlify/blobs": "^6.5.0 || ^7.0.0 || ^8.1.0 || ^9.0.0 || ^10.0.0",
        "@planetscale/database": "^1.19.0",
        "@upstash/redis": "^1.34.3",
        "@vercel/blob": ">=0.27.1",
        "@vercel/functions": "^2.2.12 || ^3.0.0",
        "@vercel/kv": "^1 || ^2 || ^3",
        "aws4fetch": "^1.0.20",
        "db0": ">=0.2.1",
        "idb-keyval": "^6.2.1",
        "ioredis": "^5.4.2",
        "uploadthing": "^7.4.4"
      },
      "peerDependenciesMeta": {
        "@azure/app-configuration": {
          "optional": true
        },
        "@azure/cosmos": {
          "optional": true
        },
        "@azure/data-tables": {
          "optional": true
        },
        "@azure/identity": {
          "optional": true
        },
        "@azure/keyvault-secrets": {
          "optional": true
        },
        "@azure/storage-blob": {
          "optional": true
        },
        "@capacitor/preferences": {
          "optional": true
        },
        "@deno/kv": {
          "optional": true
        },
        "@netlify/blobs": {
          "optional": true
        },
        "@planetscale/database": {
          "optional": true
        },
        "@upstash/redis": {
          "optional": true
        },
        "@vercel/blob": {
          "optional": true
        },
        "@vercel/functions": {
          "optional": true
        },
        "@vercel/kv": {
          "optional": true
        },
        "aws4fetch": {
          "optional": true
        },
        "db0": {
          "optional": true
        },
        "idb-keyval": {
          "optional": true
        },
        "ioredis": {
          "optional": true
        },
        "uploadthing": {
          "optional": true
        }
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmmirror.com/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmmirror.com/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "license": "BSD-2-Clause",
      "optional": true,
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/vfile": {
      "version": "6.0.3",
      "resolved": "https://registry.npmmirror.com/vfile/-/vfile-6.0.3.tgz",
      "integrity": "sha512-KzIbH/9tXat2u30jf+smMwFCsno4wHVdNmzFyL+T/L3UGqqk6JKfVqOFOZEpZSHADH1k40ab6NUIXZq422ov3Q==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "vfile-message": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/vfile-location": {
      "version": "5.0.3",
      "resolved": "https://registry.npmmirror.com/vfile-location/-/vfile-location-5.0.3.tgz",
      "integrity": "sha512-5yXvWDEgqeiYiBe1lbxYF7UMAIm/IcopxMHrMQDq3nvKcjPKIhZklUKL+AE7J7uApI4kwe2snsK+eI6UTj9EHg==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "vfile": "^6.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/vfile-message": {
      "version": "4.0.3",
      "resolved": "https://registry.npmmirror.com/vfile-message/-/vfile-message-4.0.3.tgz",
      "integrity": "sha512-QTHzsGd1EhbZs4AsQ20JX1rC3cOlt/IWJruk893DfLRr57lcnOeMaWG4K0JrRta4mIJZKth2Au3mM3u03/JWKw==",
      "license": "MIT",
      "dependencies": {
        "@types/unist": "^3.0.0",
        "unist-util-stringify-position": "^4.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/unified"
      }
    },
    "node_modules/vite": {
      "version": "7.3.2",
      "resolved": "https://registry.npmmirror.com/vite/-/vite-7.3.2.tgz",
      "integrity": "sha512-Bby3NOsna2jsjfLVOHKes8sGwgl4TT0E6vvpYgnAYDIF/tie7MRaFthmKuHx1NSXjiTueXH3do80FMQgvEktRg==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "esbuild": "^0.27.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vitefu": {
      "version": "1.1.3",
      "resolved": "https://registry.npmmirror.com/vitefu/-/vitefu-1.1.3.tgz",
      "integrity": "sha512-ub4okH7Z5KLjb6hDyjqrGXqWtWvoYdU3IGm/NorpgHncKoLTCfRIbvlhBm7r0YstIaQRYlp4yEbFqDcKSzXSSg==",
      "license": "MIT",
      "workspaces": [
        "tests/deps/*",
        "tests/projects/*",
        "tests/projects/workspace/packages/*"
      ],
      "peerDependencies": {
        "vite": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0"
      },
      "peerDependenciesMeta": {
        "vite": {
          "optional": true
        }
      }
    },
    "node_modules/web-namespaces": {
      "version": "2.0.1",
      "resolved": "https://registry.npmmirror.com/web-namespaces/-/web-namespaces-2.0.1.tgz",
      "integrity": "sha512-bKr1DkiNa2krS7qxNtdrtHAmzuYGFQLiQ13TsorsdT6ULTkPLKuu5+GsFpDlg6JFjUTwX2DyhMPG2be8uPrqsQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    },
    "node_modules/webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmmirror.com/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
      "license": "BSD-2-Clause"
    },
    "node_modules/whatwg-url": {
      "version": "5.0.0",
      "resolved": "https://registry.npmmirror.com/whatwg-url/-/whatwg-url-5.0.0.tgz",
      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
      "license": "MIT",
      "dependencies": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "node_modules/which-pm-runs": {
      "version": "1.1.0",
      "resolved": "https://registry.npmmirror.com/which-pm-runs/-/which-pm-runs-1.1.0.tgz",
      "integrity": "sha512-n1brCuqClxfFfq/Rb0ICg9giSZqCS+pLtccdag6C2HyufBrh3fBOiy9nb6ggRMvWOVH5GrdJskj5iGTZNxd7SA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/xxhash-wasm": {
      "version": "1.1.0",
      "resolved": "https://registry.npmmirror.com/xxhash-wasm/-/xxhash-wasm-1.1.0.tgz",
      "integrity": "sha512-147y/6YNh+tlp6nd/2pWq38i9h6mz/EuQ6njIrmW8D1BS5nCqs0P6DG+m6zTGnNz5I+uhZ0SHxBs9BsPrwcKDA==",
      "license": "MIT"
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmmirror.com/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "license": "ISC"
    },
    "node_modules/yargs-parser": {
      "version": "22.0.0",
      "resolved": "https://registry.npmmirror.com/yargs-parser/-/yargs-parser-22.0.0.tgz",
      "integrity": "sha512-rwu/ClNdSMpkSrUb+d6BRsSkLUq1fmfsY6TOpYzTwvwkg1/NRG85KBy3kq++A8LKQwX6lsu+aWad+2khvuXrqw==",
      "license": "ISC",
      "engines": {
        "node": "^20.19.0 || ^22.12.0 || >=23"
      }
    },
    "node_modules/yocto-queue": {
      "version": "1.2.2",
      "resolved": "https://registry.npmmirror.com/yocto-queue/-/yocto-queue-1.2.2.tgz",
      "integrity": "sha512-4LCcse/U2MHZ63HAJVE+v71o7yOdIe4cZ70Wpf8D/IyjDKYQLV5GD46B+hSTjJsvV5PztjvHoU580EftxjDZFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.3.6",
      "resolved": "https://registry.npmmirror.com/zod/-/zod-4.3.6.tgz",
      "integrity": "sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zwitch": {
      "version": "2.0.4",
      "resolved": "https://registry.npmmirror.com/zwitch/-/zwitch-2.0.4.tgz",
      "integrity": "sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wooorm"
      }
    }
  }
}
```

## `README.md`

`$lang
# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> ðŸ§‘â€ðŸš€ **Seasoned astronaut?** Delete this file. Have fun!

## ðŸš€ Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
â”œâ”€â”€ public/
â”œâ”€â”€ src/
â”‚   â””â”€â”€ pages/
â”‚       â””â”€â”€ index.astro
â””â”€â”€ package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## ðŸ§ž Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ðŸ‘€ Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
```

## `src\components\news\NewsApp.jsx`

`$lang
import { useEffect, useMemo, useState } from "react";
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import {
  ACCESS_DENIED_MESSAGE,
  BITRIX_CONTEXT_STATES,
  initBitrix,
} from "../../lib/bitrix/bootstrap";
import { tryFinishInstall } from "../../lib/bitrix/install";
import { getCurrentBitrixUserRaw, normalizeBitrixUser } from "../../lib/bitrix/user";
import NewsSidebar from "./NewsSidebar";
import NewsToolbar from "./NewsToolbar";
import NewsDetail from "./NewsDetail";

async function fetchJson(url, init) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || "No se pudo completar la solicitud");
  }

  return payload;
}

function sortItems(items = []) {
  return [...items].sort((left, right) => Number(right.id || 0) - Number(left.id || 0));
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function matchesSearch(item, query) {
  const q = normalizeText(query);

  if (!q) return true;

  const haystack = [
    item?.titleOriginal,
    item?.summary,
    item?.sourceUrl,
    item?.sourceSite,
    item?.sourceSlug,
    item?.contentText,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

function matchesStatus(item, selectedStatus) {
  const filterValue = normalizeText(selectedStatus);
  if (!filterValue) return true;

  const itemStatus = normalizeText(item?.syncStatus || item?.status || "");
  return itemStatus === filterValue;
}

function matchesSource(item, selectedSource) {
  const filterValue = normalizeText(selectedSource);
  if (!filterValue) return true;

  const itemSource = normalizeText(item?.sourceSite || "");
  return itemSource === filterValue;
}

export default function NewsApp() {
  const [contextState, setContextState] = useState(BITRIX_CONTEXT_STATES.CHECKING);
  const [bitrixReady, setBitrixReady] = useState(false);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setContextState(BITRIX_CONTEXT_STATES.CHECKING);
      setBitrixReady(false);
      setUser(null);
      setItems([]);
      setSelectedId(null);
      setError("");

      try {
        const result = await initBitrix();

        if (result.status === BITRIX_CONTEXT_STATES.OUTSIDE) {
          if (!cancelled) {
            setContextState(BITRIX_CONTEXT_STATES.OUTSIDE);
          }
          return;
        }

        const { bx24 } = result;
        await tryFinishInstall(bx24);

        let normalizedUser = null;

        if (bx24) {
          try {
            const rawUser = await getCurrentBitrixUserRaw();
            normalizedUser = normalizeBitrixUser(rawUser);
          } catch (userError) {
            console.warn("No se pudo obtener el usuario actual de Bitrix24:", userError);
          }
        }

        if (!cancelled) {
          setUser(normalizedUser);
          setBitrixReady(true);
          setContextState(BITRIX_CONTEXT_STATES.INSIDE);
        }
      } catch (err) {
        if (!cancelled) {
          setBitrixReady(false);
          setContextState(BITRIX_CONTEXT_STATES.INSIDE);
          setError(err?.message || "Error iniciando la app en Bitrix24");
        }
      }
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!bitrixReady) {
      return undefined;
    }

    let cancelled = false;

    async function loadNews() {
      setNewsLoading(true);
      setError("");

      try {
        const payload = await fetchJson("/api/news/list");
        const nextItems = sortItems(Array.isArray(payload.items) ? payload.items : []);

        if (cancelled) return;

        setItems(nextItems);
        setSelectedId((currentSelectedId) => {
          if (nextItems.length === 0) {
            return null;
          }

          const stillExists = nextItems.some(
            (item) => Number(item.id) === Number(currentSelectedId)
          );

          return stillExists ? currentSelectedId : nextItems[0].id;
        });
      } catch (err) {
        if (!cancelled) {
          setItems([]);
          setSelectedId(null);
          setError(err?.message || "No se pudieron cargar las noticias del SPA");
        }
      } finally {
        if (!cancelled) {
          setNewsLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      cancelled = true;
    };
  }, [bitrixReady]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return (
        matchesSearch(item, searchTerm) &&
        matchesStatus(item, selectedStatusFilter) &&
        matchesSource(item, selectedSourceFilter)
      );
    });
  }, [items, searchTerm, selectedStatusFilter, selectedSourceFilter]);

  useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedId(null);
      return;
    }

    const selectedStillExists = filteredItems.some(
      (item) => Number(item.id) === Number(selectedId)
    );

    if (!selectedStillExists) {
      setSelectedId(filteredItems[0].id);
    }
  }, [filteredItems, selectedId]);

  const selectedItem = useMemo(
    () => items.find((item) => Number(item.id) === Number(selectedId)) || null,
    [items, selectedId]
  );

  async function updateSelectedStatus(nextStatus, rejectionReason = "") {
    if (!selectedItem || actionLoading) return;

    setActionLoading(true);
    setError("");

    try {
      const payload = await fetchJson("/api/news/update-status", {
        method: "POST",
        body: JSON.stringify({
          id: selectedItem.id,
          status: nextStatus,
          rejectionReason,
        }),
      });

      const updatedItem = payload.item;

      setItems((prev) =>
        sortItems(
          prev.map((item) =>
            Number(item.id) === Number(updatedItem.id) ? updatedItem : item
          )
        )
      );
      setSelectedId(updatedItem.id);
    } catch (err) {
      setError(err?.message || "No se pudo actualizar la noticia seleccionada");
    } finally {
      setActionLoading(false);
    }
  }

 async function handleSaveNewsFields(fields) {
  if (!selectedItem || saveLoading) return;

  setSaveLoading(true);
  setError("");

  try {
    const savedPayload = await fetchJson("/api/news/update", {
      method: "POST",
      body: JSON.stringify({
        id: selectedItem.id,
        fields,
      }),
    });

    const savedItem = savedPayload.item;

    const statusPayload = await fetchJson("/api/news/update-status", {
      method: "POST",
      body: JSON.stringify({
        id: selectedItem.id,
        status: BITRIX_APP_CONFIG.STATUS.EDITADA,
      }),
    });

    const statusItem = statusPayload.item;

    const finalItem = {
      ...statusItem,
      ...savedItem,
      syncStatus:
        statusItem?.syncStatus || BITRIX_APP_CONFIG.STATUS.EDITADA,
      status:
        statusItem?.syncStatus || BITRIX_APP_CONFIG.STATUS.EDITADA,
      lastSyncAt:
        statusItem?.lastSyncAt || savedItem?.lastSyncAt || new Date().toISOString(),
    };

    setItems((prev) =>
      sortItems(
        prev.map((item) =>
          Number(item.id) === Number(finalItem.id) ? finalItem : item
        )
      )
    );
    setSelectedId(finalItem.id);
  } catch (err) {
    setError(err?.message || "No se pudieron guardar los cambios");
  } finally {
    setSaveLoading(false);
  }
}
  function handleGenerate() {
    return updateSelectedStatus(BITRIX_APP_CONFIG.STATUS.GENERANDO);
  }

  function handleRegenerate() {
    return updateSelectedStatus(BITRIX_APP_CONFIG.STATUS.GENERANDO);
  }

  function handleApprove() {
    return updateSelectedStatus(BITRIX_APP_CONFIG.STATUS.APROBADA);
  }

  function handleReject() {
    return updateSelectedStatus(
      BITRIX_APP_CONFIG.STATUS.RECHAZADA,
      "Marcada manualmente como rechazada por el editor."
    );
  }

  if (contextState === BITRIX_CONTEXT_STATES.CHECKING) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          Comprobando contexto Bitrix24...
        </div>
      </div>
    );
  }

  if (contextState === BITRIX_CONTEXT_STATES.OUTSIDE) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            {ACCESS_DENIED_MESSAGE}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Esta aplicaciÃ³n solo puede abrirse desde un portal Bitrix24 con un contexto
            vÃ¡lido de la app.
          </p>
        </div>
      </div>
    );
  }

  if (!bitrixReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm">
          Iniciando aplicaciÃ³n...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Noticias IA</h1>
            <p className="text-sm text-slate-500">
              Panel editorial conectado al SPA real de Bitrix24.
            </p>
          </div>

          <div className="text-right text-sm text-slate-500">
            <div>
              <strong>Entorno:</strong> Bitrix24
            </div>
            <div>
              <strong>Usuario:</strong> {user?.name || "No identificado"}
            </div>
          </div>
        </div>
      </header>

      <div className="grid h-[calc(100vh-73px)] min-h-0 grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)]">
        <NewsSidebar
          items={filteredItems}
          selectedItem={selectedItem}
          onSelect={(item) => setSelectedId(item.id)}
          loading={newsLoading}
          error={error}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedStatus={selectedStatusFilter}
          onSelectedStatusChange={setSelectedStatusFilter}
          selectedSource={selectedSourceFilter}
          onSelectedSourceChange={setSelectedSourceFilter}
        />

        <main className="flex min-h-0 flex-col overflow-hidden">
          <NewsToolbar
            selectedItem={selectedItem}
            onGenerate={handleGenerate}
            onRegenerate={handleRegenerate}
            onApprove={handleApprove}
            onReject={handleReject}
            disabled={actionLoading || newsLoading || saveLoading}
          />

          <div className="min-h-0 flex-1 overflow-hidden">
            <NewsDetail
              item={selectedItem}
              loading={newsLoading}
              error={error}
              isEmpty={!newsLoading && !error && filteredItems.length === 0}
              onSave={handleSaveNewsFields}
              saving={saveLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
```

## `src\components\news\NewsCard.jsx`

`$lang
import StatusBadge, { getDisplayStatus } from "./StatusBadge";

export default function NewsCard({ item, isSelected, onSelect }) {
  const rawStatus = item.syncStatus || item.status || "";
  const displayStatus = getDisplayStatus(rawStatus);
  const relevantDate = item.publishedAt || item.scrapedAt || item.importedAt || "Sin fecha";

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {item.titleOriginal || "Sin tÃ­tulo"}
        </h3>
        <StatusBadge status={rawStatus} />
      </div>

      <div className="space-y-2 text-xs text-slate-500">
        <p className="line-clamp-1">{item.sourceSite || "Fuente desconocida"}</p>
        <p className="line-clamp-1">{relevantDate}</p>
        <p className="line-clamp-2 text-slate-600">
          {item.summary || "Sin resumen"}
        </p>
      </div>
    </button>
  );
}
```

## `src\components\news\NewsDetail.jsx`

`$lang
import { useEffect, useMemo, useState } from "react";
import StatusBadge, { getDisplayStatus } from "./StatusBadge";

function Block({ title, children, fullWidth = false }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 ${
        fullWidth ? "xl:col-span-2" : ""
      }`}
    >
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      <div className="text-sm leading-6 text-slate-700">{children}</div>
    </section>
  );
}

function EmptyState({ title, message }) {
  return (
    <div className="flex h-full items-center justify-center bg-white">
      <div className="max-w-md rounded-2xl border border-dashed border-slate-300 p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}

function pickRelevantDate(item) {
  return item.lastSyncAt || item.importedAt || item.scrapedAt || item.publishedAt || "-";
}

function normalizeValue(value) {
  return String(value || "");
}

export default function NewsDetail({
  item,
  loading,
  error,
  isEmpty,
  onSave,
  saving = false,
}) {
  const [form, setForm] = useState({
    titleOriginal: "",
    summary: "",
    contentText: "",
    editorNotes: "",
  });

  useEffect(() => {
    setForm({
      titleOriginal: normalizeValue(item?.titleOriginal),
      summary: normalizeValue(item?.summary),
      contentText: normalizeValue(item?.contentText),
      editorNotes: normalizeValue(item?.editorNotes),
    });
  }, [item?.id, item?.titleOriginal, item?.summary, item?.contentText, item?.editorNotes]);

  const hasChanges = useMemo(() => {
    if (!item) return false;

    return (
      normalizeValue(item.titleOriginal) !== form.titleOriginal ||
      normalizeValue(item.summary) !== form.summary ||
      normalizeValue(item.contentText) !== form.contentText ||
      normalizeValue(item.editorNotes) !== form.editorNotes
    );
  }, [item, form]);

  if (loading) {
    return (
      <EmptyState
        title="Cargando noticia"
        message="Esperando la respuesta real del SPA de Bitrix24."
      />
    );
  }

  if (error) {
    return <EmptyState title="Error de carga" message={error} />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        title="Sin noticias"
        message="No hay noticias disponibles en el SPA."
      />
    );
  }

  if (!item) {
    return (
      <EmptyState
        title="Selecciona una noticia"
        message="Elige una noticia real del listado para ver su detalle."
      />
    );
  }

  const rawStatus = item.syncStatus || item.status || "";
  const displayStatus = getDisplayStatus(rawStatus);
  const relevantDate = pickRelevantDate(item);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSave() {
    if (!hasChanges || saving || !onSave) return;

    await onSave({
      titleOriginal: form.titleOriginal,
      summary: form.summary,
      contentText: form.contentText,
      editorNotes: form.editorNotes,
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mb-3 flex items-center gap-3">
          <StatusBadge status={rawStatus} />
          <span className="text-xs text-slate-500">{item.sourceSite || "Sin fuente"}</span>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            TÃ­tulo
          </label>
          <input
            type="text"
            value={form.titleOriginal}
            onChange={(e) => updateField("titleOriginal", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="TÃ­tulo de la noticia"
          />
        </div>

        <p className="mt-3 break-all text-sm text-slate-500">
          {item.sourceUrl || "Sin URL"}
        </p>
      </div>

      <div className="p-6">
        <div className="grid gap-5 xl:grid-cols-2">
          <Block title="Resumen">
            <textarea
              value={form.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Resumen de la noticia"
            />
          </Block>

          <Block title="Estado editorial">
            <div className="space-y-2">
              <div>
                <strong>Estado:</strong> {displayStatus.label}
              </div>
              <div>
                <strong>Lista para subir:</strong> {item.readyToUpload ? "SÃ­" : "No"}
              </div>
              <div>
                <strong>Ãšltima fecha relevante:</strong> {relevantDate}
              </div>
            </div>
          </Block>

          <Block title="Contenido" fullWidth>
            <textarea
              value={form.contentText}
              onChange={(e) => updateField("contentText", e.target.value)}
              rows={18}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Contenido completo de la noticia"
            />
          </Block>

          <Block title="Notas del editor" fullWidth>
            <textarea
              value={form.editorNotes}
              onChange={(e) => updateField("editorNotes", e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Notas internas del editor"
            />
          </Block>

          <Block title="Motivo de rechazo">
            {item.rejectionReason || "Sin motivo de rechazo"}
          </Block>

          <Block title="Metadatos">
            <ul className="space-y-2">
              <li>
                <strong>ID:</strong> {item.id ?? "-"}
              </li>
              <li>
                <strong>Fecha publicaciÃ³n:</strong> {item.publishedAt || "-"}
              </li>
              <li>
                <strong>Fecha scraping:</strong> {item.scrapedAt || "-"}
              </li>
              <li>
                <strong>Fecha importaciÃ³n:</strong> {item.importedAt || "-"}
              </li>
              <li>
                <strong>Ãšltima sincronizaciÃ³n:</strong> {item.lastSyncAt || "-"}
              </li>
              <li>
                <strong>Error de sincronizaciÃ³n:</strong> {item.syncError || "-"}
              </li>
            </ul>
          </Block>

          <div className="xl:col-span-2">
            <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              {hasChanges ? (
                <span className="text-sm text-amber-600">
                  Hay cambios sin guardar
                </span>
              ) : (
                <span className="text-sm text-slate-500">
                  Sin cambios pendientes
                </span>
              )}

              <button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## `src\components\news\NewsSidebar.jsx`

`$lang
import { useMemo } from "react";
import NewsCard from "./NewsCard";

function normalizeStatusLabel(status) {
  const normalized = String(status || "").trim().toLowerCase();

  if (normalized === "ok") {
    return "Pendiente";
  }

  if (!normalized) {
    return "Sin estado";
  }

  return String(status).trim();
}

function buildStatusOptions(items = []) {
  const values = new Set();

  for (const item of items) {
    const status = String(item?.syncStatus || item?.status || "").trim();

    if (status) {
      values.add(status);
    }
  }

  return Array.from(values).sort((a, b) =>
    normalizeStatusLabel(a).localeCompare(normalizeStatusLabel(b), "es")
  );
}

function buildSourceOptions(items = []) {
  const values = new Set();

  for (const item of items) {
    const source = String(item?.sourceSite || "").trim();

    if (source) {
      values.add(source);
    }
  }

  return Array.from(values).sort((a, b) => a.localeCompare(b, "es"));
}

export default function NewsSidebar({
  items,
  selectedItem,
  onSelect,
  loading,
  error,
  searchTerm,
  onSearchTermChange,
  selectedStatus,
  onSelectedStatusChange,
  selectedSource,
  onSelectedSourceChange,
}) {
  const statusOptions = useMemo(() => buildStatusOptions(items), [items]);
  const sourceOptions = useMemo(() => buildSourceOptions(items), [items]);

  return (
    <aside className="min-h-0 border-r border-slate-200 bg-slate-50 xl:h-[calc(100vh-73px)]">
      <div className="flex h-full min-h-0 flex-col">
        <div className="border-b border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-slate-50/80">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="news-search"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Buscar
              </label>
              <input
                id="news-search"
                type="text"
                value={searchTerm}
                onChange={(event) => onSearchTermChange(event.target.value)}
                placeholder="TÃ­tulo, resumen, URL..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <div>
                <label
                  htmlFor="news-status-filter"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Estado
                </label>
                <select
                  id="news-status-filter"
                  value={selectedStatus}
                  onChange={(event) => onSelectedStatusChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Todos</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {normalizeStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="news-source-filter"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Fuente
                </label>
                <select
                  id="news-source-filter"
                  value={selectedSource}
                  onChange={(event) => onSelectedSourceChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Todas</option>
                  {sourceOptions.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                {loading ? "Cargando..." : `${items.length} noticia${items.length === 1 ? "" : "s"}`}
              </span>

              {searchTerm || selectedStatus || selectedSource ? (
                <button
                  type="button"
                  onClick={() => {
                    onSearchTermChange("");
                    onSelectedStatusChange("");
                    onSelectedSourceChange("");
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Limpiar
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              Cargando noticias...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-white p-4 text-sm text-red-700">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
              No hay noticias que coincidan con los filtros.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
```

## `src\components\news\NewsToolbar.jsx`

`$lang
export default function NewsToolbar({
  selectedItem,
  onGenerate,
  onApprove,
  onReject,
  onRegenerate,
  disabled = false,
}) {
  const controlsDisabled = !selectedItem || disabled;

  return (
    <div className="flex flex-wrap gap-3 border-b border-slate-200 bg-white px-6 py-4">
      <button
        type="button"
        onClick={onGenerate}
        disabled={controlsDisabled}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Generar noticia
      </button>

      <button
        type="button"
        onClick={onRegenerate}
        disabled={controlsDisabled}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Regenerar
      </button>

      <button
        type="button"
        onClick={onApprove}
        disabled={controlsDisabled}
        className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Aprobar
      </button>

      <button
        type="button"
        onClick={onReject}
        disabled={controlsDisabled}
        className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Rechazar
      </button>
    </div>
  );
}
```

## `src\components\news\StatusBadge.jsx`

`$lang
const STATUS_STYLES = {
  pendiente: "bg-slate-100 text-slate-700 border-slate-200",
  generando: "bg-amber-100 text-amber-800 border-amber-200",
  generada: "bg-blue-100 text-blue-800 border-blue-200",
  revisar: "bg-orange-100 text-orange-800 border-orange-200",
  editada: "bg-violet-100 text-violet-800 border-violet-200",
  aprobada: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rechazada: "bg-rose-100 text-rose-800 border-rose-200",
  "error ia": "bg-red-100 text-red-800 border-red-200",
  subida: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

export function getDisplayStatus(status) {
  const raw = String(status || "").trim();
  const normalized = raw.toLowerCase();

  if (!raw || normalized === "ok") {
    return {
      key: "pendiente",
      label: "Pendiente",
    };
  }

  return {
    key: normalized,
    label: raw,
  };
}

export default function StatusBadge({ status }) {
  const display = getDisplayStatus(status);
  const className =
    STATUS_STYLES[display.key] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {display.label}
    </span>
  );
}
```

## `src\config\bitrixConfig.ts`

`$lang
export const BITRIX_APP_CONFIG = {
  APP_NAME: "App local noticias",
  ENTITY_TYPE_ID: 1070,

  STATUS: {
    PENDIENTE: "Pendiente",
    GENERANDO: "Generando",
    GENERADA: "Generada",
    REVISAR: "Revisar",
    EDITADA: "Editada",
    APROBADA: "Aprobada",
    RECHAZADA: "Rechazada",
    ERROR_IA: "Error IA",
    SUBIDA: "Subida",
  },

  FIELDS: {
    BITRIX_TITLE: "title",

    TITLE_ORIGINAL: "UF_CRM_25_1776172315",
    SOURCE_SITE: "UF_CRM_25_1776172329",
    SOURCE_ID: "UF_CRM_25_1776172343",
    SOURCE_URL: "UF_CRM_25_1776172353",
    SOURCE_SLUG: "UF_CRM_25_1776172366",

    FEATURED_IMAGE_URL: "UF_CRM_25_1776172413",
    FEATURED_IMAGE_LOCAL_PATH: "UF_CRM_25_1776172428",
    FINAL_PUBLICATION_URL: "UF_CRM_25_1776172447",
    CONTENT_HASH: "UF_CRM_25_1776172463",
    SYNC_STATUS: "UF_CRM_25_1776172478",
    SYNC_ERROR: "UF_CRM_25_1776172491",

    PUBLISHED_AT: "UF_CRM_25_1776172502",
    MODIFIED_AT: "UF_CRM_25_1776172524",
    SCRAPED_AT: "UF_CRM_25_1776172541",
    IMPORTED_AT: "UF_CRM_25_1776172560",
    LAST_SYNC_AT: "UF_CRM_25_1776172599",
    UPLOADED_AT: "UF_CRM_25_1776172614",

    SUMMARY: "UF_CRM_25_1776172633",
    CONTENT_TEXT: "UF_CRM_25_1776172680",
    CONTENT_HTML: "UF_CRM_25_1776172691",
    HEADINGS: "UF_CRM_25_1776172701",
    IMAGES: "UF_CRM_25_1776172714",

    EDITOR_NOTES: "UF_CRM_25_1776172726",
    REJECTION_REASON: "UF_CRM_25_1776172742",
    READY_TO_UPLOAD: "UF_CRM_25_1776172770",
    FEATURED_IMAGE_FILE: "UF_CRM_25_1776172784",
  },
};
```

## `src\layouts\Layout.astro`

`$lang
---
const { title = "Noticias IA" } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>

    <script is:inline src="//api.bitrix24.com/api/v1/"></script>
  </head>
  <body class="min-h-screen bg-slate-100 text-slate-900">
    <slot />
  </body>
</html>
```

## `src\lib\bitrix\bootstrap.js`

`$lang
export const ACCESS_DENIED_MESSAGE = "Acceso no permitido fuera de Bitrix24";

export const BITRIX_CONTEXT_STATES = {
  CHECKING: "checking",
  INSIDE: "inside_bitrix",
  OUTSIDE: "outside_bitrix",
};

const BITRIX_QUERY_KEYS = [
  "DOMAIN",
  "AUTH_ID",
  "AUTH_EXPIRES",
  "APP_SID",
  "PLACEMENT",
  "PLACEMENT_OPTIONS",
  "PROTOCOL",
  "LANG",
  "member_id",
  "REFRESH_ID",
];

function getGlobalWindow() {
  return typeof window === "undefined" ? undefined : window;
}

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function isTruthyInstallFlag(value) {
  return ["y", "yes", "true", "1"].includes(normalizeValue(value));
}

function safeGetReferrer() {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

function safeIsInsideIframe() {
  const currentWindow = getGlobalWindow();
  if (!currentWindow) return false;

  try {
    return currentWindow.self !== currentWindow.top;
  } catch {
    return true;
  }
}

function matchesBitrixHost(value) {
  const normalized = normalizeValue(value);
  return normalized.includes("bitrix24.") || normalized.includes(".bitrix.");
}

function hasBitrixReferrer(referrer) {
  if (!referrer) return false;

  try {
    return matchesBitrixHost(new URL(referrer).hostname);
  } catch {
    return matchesBitrixHost(referrer);
  }
}

export function hasBX24() {
  const currentWindow = getGlobalWindow();
  return typeof currentWindow?.BX24 !== "undefined";
}

export function getBX24() {
  return hasBX24() ? window.BX24 : null;
}

export function getQueryParams() {
  const currentWindow = getGlobalWindow();
  if (!currentWindow) return new URLSearchParams();

  return new URL(currentWindow.location.href).searchParams;
}

export function getBitrixContextSnapshot() {
  const params = getQueryParams();
  const matchedQueryKeys = BITRIX_QUERY_KEYS.filter((key) => {
    const value = params.get(key);
    return value !== null && String(value).trim() !== "";
  });
  const bx24Available = hasBX24();
  const insideIframe = safeIsInsideIframe();
  const referrer = safeGetReferrer();
  const bitrixReferrer = hasBitrixReferrer(referrer);
  const domain = params.get("DOMAIN") || "";
  const placement = normalizeValue(params.get("PLACEMENT"));
  const installFlag = normalizeValue(params.get("install"));
  const strongQuerySignal =
    matchedQueryKeys.includes("DOMAIN") ||
    matchedQueryKeys.includes("AUTH_ID") ||
    matchedQueryKeys.includes("APP_SID");
  const hasQuerySignals = matchedQueryKeys.length > 0;
  const iframeSignal = insideIframe && (bitrixReferrer || hasQuerySignals);
  const probableBitrix = bx24Available || strongQuerySignal || iframeSignal;

  return {
    params,
    bx24Available,
    matchedQueryKeys,
    hasQuerySignals,
    strongQuerySignal,
    insideIframe,
    referrer,
    bitrixReferrer,
    iframeSignal,
    probableBitrix,
    domain,
    placement,
    installFlag,
  };
}

export function isInsideBitrix() {
  return getBitrixContextSnapshot().probableBitrix;
}

export function isInstallMode() {
  const { placement, installFlag } = getBitrixContextSnapshot();
  return placement.includes("install") || isTruthyInstallFlag(installFlag);
}

export function waitForBitrixContext({
  timeoutMs = 4500,
  intervalMs = 125,
} = {}) {
  return new Promise((resolve) => {
    const currentWindow = getGlobalWindow();
    const initialSnapshot = getBitrixContextSnapshot();

    if (!currentWindow) {
      resolve({
        state: BITRIX_CONTEXT_STATES.OUTSIDE,
        snapshot: initialSnapshot,
      });
      return;
    }

    if (initialSnapshot.probableBitrix) {
      resolve({
        state: BITRIX_CONTEXT_STATES.INSIDE,
        snapshot: initialSnapshot,
      });
      return;
    }

    const startedAt = Date.now();
    const timer = currentWindow.setInterval(() => {
      const snapshot = getBitrixContextSnapshot();

      if (snapshot.probableBitrix) {
        currentWindow.clearInterval(timer);
        resolve({
          state: BITRIX_CONTEXT_STATES.INSIDE,
          snapshot,
        });
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        currentWindow.clearInterval(timer);
        resolve({
          state: BITRIX_CONTEXT_STATES.OUTSIDE,
          snapshot,
        });
      }
    }, intervalMs);
  });
}

function initBX24Instance(bx24, initTimeoutMs) {
  return new Promise((resolve, reject) => {
    if (!bx24) {
      reject(new Error("BX24 no esta disponible"));
      return;
    }

    if (typeof bx24.init !== "function") {
      resolve(bx24);
      return;
    }

    let settled = false;
    const currentWindow = getGlobalWindow();

    const finish = (callback) => (value) => {
      if (settled) return;
      settled = true;
      callback(value);
    };

    const resolveOnce = finish(resolve);
    const rejectOnce = finish(reject);

    const timeoutId = currentWindow?.setTimeout(() => {
      rejectOnce(new Error("No se pudo inicializar el contexto de Bitrix24"));
    }, initTimeoutMs);

    try {
      bx24.init(() => {
        if (timeoutId) {
          currentWindow.clearTimeout(timeoutId);
        }
        resolveOnce(bx24);
      });
    } catch (error) {
      if (timeoutId) {
        currentWindow.clearTimeout(timeoutId);
      }
      rejectOnce(error);
    }
  });
}

export async function initBitrix({
  contextTimeoutMs = 4500,
  contextIntervalMs = 125,
  initTimeoutMs = 4000,
} = {}) {
  const contextCheck = await waitForBitrixContext({
    timeoutMs: contextTimeoutMs,
    intervalMs: contextIntervalMs,
  });

  if (contextCheck.state === BITRIX_CONTEXT_STATES.OUTSIDE) {
    return {
      status: BITRIX_CONTEXT_STATES.OUTSIDE,
      bx24: null,
      context: contextCheck.snapshot,
    };
  }

  const bx24 = getBX24();

  if (!bx24) {
    return {
      status: BITRIX_CONTEXT_STATES.INSIDE,
      bx24: null,
      context: contextCheck.snapshot,
    };
  }

  await initBX24Instance(bx24, initTimeoutMs);

  return {
    status: BITRIX_CONTEXT_STATES.INSIDE,
    bx24,
    context: getBitrixContextSnapshot(),
  };
}
```

## `src\lib\bitrix\history.js`

`$lang
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig";

export function getBitrixItemCollection(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.item)) return response.item;
  if (Array.isArray(response?.result?.items)) return response.result.items;
  return [];
}

export function getBitrixFieldValue(item, fieldName) {
  return item?.[fieldName] ?? item?.fields?.[fieldName] ?? "";
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function getHistoryTimestampParts(date = new Date()) {
  const year = date.getFullYear();
  const month = padDatePart(date.getMonth() + 1);
  const day = padDatePart(date.getDate());
  const hours = padDatePart(date.getHours());
  const minutes = padDatePart(date.getMinutes());
  const seconds = padDatePart(date.getSeconds());

  return {
    date: `${year}-${month}-${day}`,
    dateTime: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
    timeLabel: `${hours}:${minutes}`,
  };
}

function normalizeEmployeeValue(value) {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function normalizeTextValue(value) {
  if (value === null || value === undefined) {
    return undefined;
  }

  const normalized = String(value).trim();
  return normalized ? normalized : undefined;
}

export function mapAssetTypeToHistoryEnum(assetTypeId) {
  const sourceEntries = Object.entries(BITRIX_APP_CONFIG.ENUMS.TIPO_ACTIVO);
  const targetEntries = BITRIX_APP_CONFIG.HISTORY.ENUMS.TIPO_ACTIVO;

  const matchedEntry = sourceEntries.find(([, value]) => String(value) === String(assetTypeId));
  if (!matchedEntry) {
    return "";
  }

  return targetEntries[matchedEntry[0]] || "";
}

export function mapStateToHistoryEnum(stateId, fieldKey) {
  const sourceEntries = Object.entries(BITRIX_APP_CONFIG.ENUMS.ESTADO);
  const targetEntries = BITRIX_APP_CONFIG.HISTORY.ENUMS[fieldKey] || {};
  const matchedEntry = sourceEntries.find(([, value]) => String(value) === String(stateId));

  if (!matchedEntry) {
    return "";
  }

  return targetEntries[matchedEntry[0]] || "";
}

export function buildHistoryMovementFields(asset, action) {
  const timestamp = getHistoryTimestampParts(action.movedAt);
  const fields = {
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.ID_INTERNO_ACTIVO]:
      normalizeTextValue(action.idInternoActivo || asset.idInterno) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.ID_ITEM_ACTIVO]:
      normalizeTextValue(action.idItemActivo || asset.itemId) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.NUMERO_SERIE]:
      normalizeTextValue(action.serialNumber || asset.serialNumber) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.MARCA]:
      normalizeTextValue(action.brand || asset.brand) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.MODELO]:
      normalizeTextValue(action.model || asset.model) || "",
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.TIPO_ACTIVO]:
      String(action.assetTypeId || mapAssetTypeToHistoryEnum(asset.typeId) || ""),
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.TIPO_MOVIMIENTO]: String(
      action.movementTypeId || ""
    ),
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.FECHA_MOVIMIENTO]: timestamp.date,
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.HORA_MOVIMIENTO]: timestamp.dateTime,
    [BITRIX_APP_CONFIG.HISTORY.FIELDS.DETALLE]:
      normalizeTextValue(action.detail) || "",
  };

  const previousUserId = normalizeEmployeeValue(action.previousUserId);
  const newUserId = normalizeEmployeeValue(action.newUserId);
  const performedById = normalizeEmployeeValue(action.performedById);
  const previousStateId = normalizeTextValue(
    action.previousStateId
      ? mapStateToHistoryEnum(action.previousStateId, "ESTADO_ANTERIOR")
      : ""
  );
  const newStateId = normalizeTextValue(
    action.newStateId ? mapStateToHistoryEnum(action.newStateId, "ESTADO_NUEVO") : ""
  );
  const previousLocation = normalizeTextValue(action.previousLocation);
  const newLocation = normalizeTextValue(action.newLocation);

  if (previousUserId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_ANTERIOR] = previousUserId;
  }

  if (newUserId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_NUEVO] = newUserId;
  }

  if (performedById) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.REALIZADO_POR] = performedById;
  }

  if (previousStateId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_ANTERIOR] = previousStateId;
  }

  if (newStateId) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_NUEVO] = newStateId;
  }

  if (previousLocation) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_ANTERIOR] = previousLocation;
  }

  if (newLocation) {
    fields[BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_NUEVA] = newLocation;
  }

  return fields;
}

function resolveUserName(userId, userMap) {
  const normalizedId = normalizeEmployeeValue(userId);

  if (!normalizedId) {
    return "";
  }

  return userMap.get(normalizedId)?.name || `ID ${normalizedId}`;
}

function getMovementOccurredAt(item) {
  const dateValue = getBitrixFieldValue(
    item,
    BITRIX_APP_CONFIG.HISTORY.FIELDS.FECHA_MOVIMIENTO
  );
  const timeValue = getBitrixFieldValue(
    item,
    BITRIX_APP_CONFIG.HISTORY.FIELDS.HORA_MOVIMIENTO
  );

  const baseValue = timeValue || dateValue;
  const parsed = baseValue ? new Date(baseValue) : null;

  return {
    dateValue: dateValue || "",
    timeValue: timeValue || "",
    sortValue:
      parsed && !Number.isNaN(parsed.getTime()) ? parsed.getTime() : 0,
  };
}

export function normalizeHistoryItem(item, userMap = new Map()) {
  const movementTypeId = String(
    getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.TIPO_MOVIMIENTO) || ""
  );
  const previousStateId = String(
    getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_ANTERIOR) || ""
  );
  const newStateId = String(
    getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.ESTADO_NUEVO) || ""
  );
  const occurredAt = getMovementOccurredAt(item);

  return {
    id: String(item?.id || item?.ID || ""),
    movementTypeId,
    movementTypeLabel:
      BITRIX_APP_CONFIG.HISTORY.ENUM_LABELS.TIPO_MOVIMIENTO[movementTypeId] ||
      "Movimiento",
    detail:
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.DETALLE) || "",
    previousUser: resolveUserName(
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_ANTERIOR),
      userMap
    ),
    newUser: resolveUserName(
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.USUARIO_NUEVO),
      userMap
    ),
    performedBy: resolveUserName(
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.REALIZADO_POR),
      userMap
    ),
    previousState:
      BITRIX_APP_CONFIG.HISTORY.STATE_LABELS[previousStateId] || "",
    newState: BITRIX_APP_CONFIG.HISTORY.STATE_LABELS[newStateId] || "",
    previousLocation:
      getBitrixFieldValue(
        item,
        BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_ANTERIOR
      ) || "",
    newLocation:
      getBitrixFieldValue(item, BITRIX_APP_CONFIG.HISTORY.FIELDS.UBICACION_NUEVA) ||
      "",
    dateValue: occurredAt.dateValue,
    timeValue: occurredAt.timeValue,
    sortValue: occurredAt.sortValue,
  };
}

export function sortHistoryItemsDesc(items) {
  return [...items].sort((a, b) => {
    if (b.sortValue !== a.sortValue) {
      return b.sortValue - a.sortValue;
    }

    return String(b.id).localeCompare(String(a.id), "es");
  });
}
```

## `src\lib\bitrix\install.js`

`$lang
import { getBX24, isInstallMode } from "./bootstrap";

export function tryFinishInstall(bx24Instance = getBX24()) {
  return new Promise((resolve) => {
    if (!bx24Instance || !isInstallMode()) {
      resolve({ attempted: false, success: false });
      return;
    }

    if (typeof bx24Instance.installFinish !== "function") {
      resolve({ attempted: true, success: false });
      return;
    }

    let settled = false;

    const finish = (payload) => {
      if (settled) return;
      settled = true;
      resolve(payload);
    };

    const currentWindow = typeof window === "undefined" ? undefined : window;
    const timeoutId = currentWindow?.setTimeout(() => {
      finish({ attempted: true, success: false });
    }, 2000);

    try {
      bx24Instance.installFinish(() => {
        if (timeoutId) {
          currentWindow.clearTimeout(timeoutId);
        }
        finish({ attempted: true, success: true });
      });
    } catch (error) {
      if (timeoutId) {
        currentWindow.clearTimeout(timeoutId);
      }
      console.warn("No se pudo completar installFinish:", error);
      finish({ attempted: true, success: false });
    }
  });
}
```

## `src\lib\bitrix\methods.js`

`$lang
export function callBitrixMethod(method, params = {}) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.BX24) {
      reject(new Error("BX24 no disponible"));
      return;
    }

    window.BX24.callMethod(method, params, function (result) {
      if (result.error()) {
        reject(result.error());
        return;
      }

      resolve(result.data());
    });
  });
}
```

## `src\lib\bitrix\spa.js`

`$lang
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig";
import { callBitrixMethod } from "./methods";

export function assertEntityTypeIdConfigured() {
  if (
    !BITRIX_APP_CONFIG.ENTITY_TYPE_ID ||
    BITRIX_APP_CONFIG.ENTITY_TYPE_ID <= 0
  ) {
    throw new Error(
      "Falta configurar ENTITY_TYPE_ID en src/config/bitrixConfig.js"
    );
  }
}

export async function getSpaFields() {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.fields", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
  });
}

export async function listSpaItems(params = {}) {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.list", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
    ...params,
  });
}

export async function getSpaItem(id) {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.get", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
    id,
  });
}

export async function updateSpaItem(id, fields) {
  assertEntityTypeIdConfigured();

  return await callBitrixMethod("crm.item.update", {
    entityTypeId: BITRIX_APP_CONFIG.ENTITY_TYPE_ID,
    id,
    fields,
  });
}
```

## `src\lib\bitrix\user.js`

`$lang
import { callBitrixMethod } from "./methods";

export async function getCurrentBitrixUserRaw() {
  return await callBitrixMethod("user.current");
}

export function normalizeBitrixUser(rawUser) {
  if (!rawUser) return null;

  const id = Number(rawUser.ID || rawUser.id || 0);

  return {
    id,
    name:
      rawUser.NAME && rawUser.LAST_NAME
        ? `${rawUser.NAME} ${rawUser.LAST_NAME}`.trim()
        : rawUser.FULL_NAME || rawUser.NAME || rawUser.name || "Usuario",
    firstName: rawUser.NAME || "",
    lastName: rawUser.LAST_NAME || "",
    email: rawUser.EMAIL || rawUser.email || "",
    raw: rawUser,
  };
}
```

## `src\lib\server\api.js`

`$lang
export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function getQueryParam(url, key) {
  return new URL(url).searchParams.get(key);
}

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}
```

## `src\lib\server\bitrix-rest.js`

`$lang
import { requireEnv } from "./api.js";

function normalizeBaseUrl(base) {
  return base.endsWith("/") ? base : `${base}/`;
}

export async function callBitrix(method, params = {}) {
  const baseUrl = normalizeBaseUrl(requireEnv("BITRIX_WEBHOOK_BASE"));
  const url = `${baseUrl}${method}.json`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Bitrix devolviÃ³ ${response.status} ${response.statusText}: ${text}`
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      `Bitrix error: ${data.error_description || data.error || "Error desconocido"}`
    );
  }

  return data.result;
}

export async function crmItemList(entityTypeId, params = {}) {
  return await callBitrix("crm.item.list", {
    entityTypeId,
    ...params,
  });
}

export async function crmItemGet(entityTypeId, id, params = {}) {
  return await callBitrix("crm.item.get", {
    entityTypeId,
    id: Number(id),
    ...params,
  });
}

export async function crmItemAdd(entityTypeId, fields) {
  return await callBitrix("crm.item.add", {
    entityTypeId,
    fields,
  });
}

export async function crmItemUpdate(entityTypeId, id, fields) {
  return await callBitrix("crm.item.update", {
    entityTypeId,
    id: Number(id),
    fields,
  });
}

export async function crmItemFields(entityTypeId) {
  return await callBitrix("crm.item.fields", {
    entityTypeId,
  });
}
```

## `src\lib\server\news-mapper.js`

`$lang
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import { normalizeTextEncoding } from "../utils/text.js";

const F = BITRIX_APP_CONFIG.FIELDS;

function normalizeBoolean(value) {
  if (
    value === true ||
    value === "Y" ||
    value === "y" ||
    value === "1" ||
    value === 1
  ) {
    return true;
  }

  return false;
}

function normalizeString(value) {
  if (value === undefined || value === null) return "";
  return normalizeTextEncoding(value).trim();
}

function normalizeNullableString(value) {
  const normalized = normalizeString(value);
  return normalized || null;
}

function normalizeDate(value) {
  const normalized = normalizeString(value);
  return normalized || null;
}

function splitPipeList(value) {
  const normalized = normalizeString(value);

  if (!normalized) return [];

  if (
    (normalized.startsWith("[") && normalized.endsWith("]")) ||
    (normalized.startsWith("{") && normalized.endsWith("}"))
  ) {
    try {
      const parsed = JSON.parse(normalized);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [normalized];
    }
  }

  return normalized
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

function joinPipeList(values) {
  if (!Array.isArray(values)) return "";
  return values
    .map((value) => normalizeString(value))
    .filter(Boolean)
    .join(" | ");
}

function getItemSources(item) {
  const sources = [];

  if (item && typeof item === "object") {
    sources.push(item);

    if (item.item && typeof item.item === "object") {
      sources.push(item.item);
    }

    if (item.fields && typeof item.fields === "object") {
      sources.push(item.fields);
    }

    if (item.item?.fields && typeof item.item.fields === "object") {
      sources.push(item.item.fields);
    }
  }

  return sources;
}

function getFieldCandidates(fieldName) {
  const normalized = normalizeString(fieldName);
  if (!normalized) return [];

  const candidates = new Set([
    normalized,
    normalized.toLowerCase(),
    normalized.toUpperCase(),
    normalized.charAt(0).toLowerCase() + normalized.slice(1),
  ]);

  const ufMatch = normalized.match(/^UF_CRM_(\d+)_(.+)$/i);
  if (ufMatch) {
    const [, entityId, suffix] = ufMatch;
    candidates.add(`ufCrm${entityId}_${suffix}`);
    candidates.add(`UF_CRM_${entityId}_${suffix}`);
  }

  return [...candidates];
}

function readFieldValue(item, fieldName) {
  const sources = getItemSources(item);
  const candidates = getFieldCandidates(fieldName);

  for (const source of sources) {
    for (const key of candidates) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const value = source[key];
        if (value !== undefined) {
          return value;
        }
      }
    }
  }

  return undefined;
}

function debugMappedItem(rawItem, mappedItem) {
  const keysToCheck = [
    F.BITRIX_TITLE,
    F.TITLE_ORIGINAL,
    F.SOURCE_SITE,
    F.SOURCE_URL,
    F.SUMMARY,
    F.CONTENT_TEXT,
    F.SYNC_STATUS,
    F.EDITOR_NOTES,
    F.REJECTION_REASON,
  ];

  const fieldPresence = Object.fromEntries(
    keysToCheck.map((fieldKey) => [fieldKey, readFieldValue(rawItem, fieldKey) !== undefined])
  );

  console.log("[news-mapper] bitrix item", {
    topLevelKeys: Object.keys(rawItem || {}).slice(0, 30),
    hasFieldsObject: Boolean(rawItem?.fields),
    hasNestedItem: Boolean(rawItem?.item),
    fieldPresence,
    mapped: {
      id: mappedItem.id,
      titleOriginal: mappedItem.titleOriginal,
      sourceSite: mappedItem.sourceSite,
      summary: mappedItem.summary,
      syncStatus: mappedItem.syncStatus,
    },
  });
}

export function fromBitrixItem(item) {
  const syncStatus = normalizeNullableString(readFieldValue(item, F.SYNC_STATUS));
  const titleOriginal =
    normalizeNullableString(readFieldValue(item, F.TITLE_ORIGINAL)) ||
    normalizeNullableString(readFieldValue(item, F.BITRIX_TITLE)) ||
    "";

  const mapped = {
    id: Number(
      readFieldValue(item, "id") ||
        readFieldValue(item, "ID") ||
        readFieldValue(item, "Id") ||
        0
    ),

    titleOriginal,
    sourceSite: normalizeNullableString(readFieldValue(item, F.SOURCE_SITE)),
    sourceId: normalizeNullableString(readFieldValue(item, F.SOURCE_ID)),
    sourceUrl: normalizeNullableString(readFieldValue(item, F.SOURCE_URL)),
    sourceSlug: normalizeNullableString(readFieldValue(item, F.SOURCE_SLUG)),

    featuredImageUrl: normalizeNullableString(readFieldValue(item, F.FEATURED_IMAGE_URL)),
    featuredImageLocalPath: normalizeNullableString(
      readFieldValue(item, F.FEATURED_IMAGE_LOCAL_PATH)
    ),
    finalPublicationUrl: normalizeNullableString(
      readFieldValue(item, F.FINAL_PUBLICATION_URL)
    ),
    contentHash: normalizeNullableString(readFieldValue(item, F.CONTENT_HASH)),

    syncStatus,
    syncError: normalizeNullableString(readFieldValue(item, F.SYNC_ERROR)),

    publishedAt: normalizeDate(readFieldValue(item, F.PUBLISHED_AT)),
    modifiedAt: normalizeDate(readFieldValue(item, F.MODIFIED_AT)),
    scrapedAt: normalizeDate(readFieldValue(item, F.SCRAPED_AT)),
    importedAt: normalizeDate(readFieldValue(item, F.IMPORTED_AT)),
    lastSyncAt: normalizeDate(readFieldValue(item, F.LAST_SYNC_AT)),
    uploadedAt: normalizeDate(readFieldValue(item, F.UPLOADED_AT)),

    summary: normalizeNullableString(readFieldValue(item, F.SUMMARY)),
    contentText: normalizeNullableString(readFieldValue(item, F.CONTENT_TEXT)),
    contentHtml: normalizeNullableString(readFieldValue(item, F.CONTENT_HTML)),

    headings: splitPipeList(readFieldValue(item, F.HEADINGS)),
    images: splitPipeList(readFieldValue(item, F.IMAGES)),

    editorNotes: normalizeNullableString(readFieldValue(item, F.EDITOR_NOTES)),
    rejectionReason: normalizeNullableString(readFieldValue(item, F.REJECTION_REASON)),
    readyToUpload: normalizeBoolean(readFieldValue(item, F.READY_TO_UPLOAD)),
    status: syncStatus,

    featuredImageFile:
      readFieldValue(item, F.FEATURED_IMAGE_FILE) !== undefined
        ? readFieldValue(item, F.FEATURED_IMAGE_FILE)
        : null,
  };

  debugMappedItem(item, mapped);

  return mapped;
}

export function toBitrixFields(payload = {}) {
  const fields = {};

  if (payload.titleOriginal !== undefined) {
    const normalizedTitle = normalizeString(payload.titleOriginal);
    fields[F.TITLE_ORIGINAL] = normalizedTitle;
    fields[F.BITRIX_TITLE] = normalizedTitle;
  }

  if (payload.sourceSite !== undefined) {
    fields[F.SOURCE_SITE] = normalizeString(payload.sourceSite);
  }

  if (payload.sourceId !== undefined) {
    fields[F.SOURCE_ID] = normalizeString(payload.sourceId);
  }

  if (payload.sourceUrl !== undefined) {
    fields[F.SOURCE_URL] = normalizeString(payload.sourceUrl);
  }

  if (payload.sourceSlug !== undefined) {
    fields[F.SOURCE_SLUG] = normalizeString(payload.sourceSlug);
  }

  if (payload.featuredImageUrl !== undefined) {
    fields[F.FEATURED_IMAGE_URL] = normalizeString(payload.featuredImageUrl);
  }

  if (payload.featuredImageLocalPath !== undefined) {
    fields[F.FEATURED_IMAGE_LOCAL_PATH] = normalizeString(
      payload.featuredImageLocalPath
    );
  }

  if (payload.finalPublicationUrl !== undefined) {
    fields[F.FINAL_PUBLICATION_URL] = normalizeString(
      payload.finalPublicationUrl
    );
  }

  if (payload.contentHash !== undefined) {
    fields[F.CONTENT_HASH] = normalizeString(payload.contentHash);
  }

  if (payload.syncStatus !== undefined) {
    fields[F.SYNC_STATUS] = normalizeString(payload.syncStatus);
  }

  if (payload.syncError !== undefined) {
    fields[F.SYNC_ERROR] = normalizeString(payload.syncError);
  }

  if (payload.publishedAt !== undefined) {
    fields[F.PUBLISHED_AT] = payload.publishedAt || "";
  }

  if (payload.modifiedAt !== undefined) {
    fields[F.MODIFIED_AT] = payload.modifiedAt || "";
  }

  if (payload.scrapedAt !== undefined) {
    fields[F.SCRAPED_AT] = payload.scrapedAt || "";
  }

  if (payload.importedAt !== undefined) {
    fields[F.IMPORTED_AT] = payload.importedAt || "";
  }

  if (payload.lastSyncAt !== undefined) {
    fields[F.LAST_SYNC_AT] = payload.lastSyncAt || "";
  }

  if (payload.uploadedAt !== undefined) {
    fields[F.UPLOADED_AT] = payload.uploadedAt || "";
  }

  if (payload.summary !== undefined) {
    fields[F.SUMMARY] = normalizeString(payload.summary);
  }

  if (payload.contentText !== undefined) {
    fields[F.CONTENT_TEXT] = normalizeString(payload.contentText);
  }

  if (payload.contentHtml !== undefined) {
    fields[F.CONTENT_HTML] = normalizeString(payload.contentHtml);
  }

  if (payload.headings !== undefined) {
    fields[F.HEADINGS] = Array.isArray(payload.headings)
      ? joinPipeList(payload.headings)
      : normalizeString(payload.headings);
  }

  if (payload.images !== undefined) {
    fields[F.IMAGES] = Array.isArray(payload.images)
      ? joinPipeList(payload.images)
      : normalizeString(payload.images);
  }

  if (payload.editorNotes !== undefined) {
    fields[F.EDITOR_NOTES] = normalizeString(payload.editorNotes);
  }

  if (payload.rejectionReason !== undefined) {
    fields[F.REJECTION_REASON] = normalizeString(payload.rejectionReason);
  }

  if (payload.readyToUpload !== undefined) {
    fields[F.READY_TO_UPLOAD] = payload.readyToUpload ? "Y" : "N";
  }

  if (payload.featuredImageFile !== undefined) {
    fields[F.FEATURED_IMAGE_FILE] = payload.featuredImageFile;
  }

  console.log("[news-mapper] toBitrixFields", {
    keys: Object.keys(fields),
    titleOriginal: fields[F.TITLE_ORIGINAL] || "",
    bitrixTitle: fields[F.BITRIX_TITLE] || "",
    summary: fields[F.SUMMARY] || "",
    syncStatus: fields[F.SYNC_STATUS] || "",
  });

  return fields;
}
```

## `src\lib\server\news-service.js`

`$lang
import { BITRIX_APP_CONFIG } from "../../config/bitrixConfig.js";
import {
  crmItemAdd,
  crmItemGet,
  crmItemList,
  crmItemUpdate,
} from "./bitrix-rest.js";
import { fromBitrixItem, toBitrixFields } from "./news-mapper.js";

const ENTITY_TYPE_ID = BITRIX_APP_CONFIG.ENTITY_TYPE_ID;

function summarizeItem(item) {
  if (!item || typeof item !== "object") return null;

  return {
    id: item.id || item.ID || null,
    title: item.title || item.TITLE || null,
    titleOriginal:
      item.ufCrm25_1776172315 ||
      item.UF_CRM_25_1776172315 ||
      item.title ||
      item.TITLE ||
      null,
    sourceSite:
      item.ufCrm25_1776172329 ||
      item.UF_CRM_25_1776172329 ||
      null,
    sourceId:
      item.ufCrm25_1776172343 ||
      item.UF_CRM_25_1776172343 ||
      null,
    sourceUrl:
      item.ufCrm25_1776172353 ||
      item.UF_CRM_25_1776172353 ||
      null,
    summary:
      item.ufCrm25_1776172633 ||
      item.UF_CRM_25_1776172633 ||
      null,
    contentText:
      item.ufCrm25_1776172680 ||
      item.UF_CRM_25_1776172680 ||
      null,
    contentHtml:
      item.ufCrm25_1776172691 ||
      item.UF_CRM_25_1776172691 ||
      null,
    syncStatus:
      item.ufCrm25_1776172478 ||
      item.UF_CRM_25_1776172478 ||
      null,
    editorNotes:
      item.ufCrm25_1776172726 ||
      item.UF_CRM_25_1776172726 ||
      null,
    rejectionReason:
      item.ufCrm25_1776172742 ||
      item.UF_CRM_25_1776172742 ||
      null,
  };
}

function debugBitrixResponse(label, result) {
  const items = Array.isArray(result?.items)
    ? result.items
    : Array.isArray(result?.item)
      ? result.item
      : result?.item
        ? [result.item]
        : result && typeof result === "object"
          ? [result]
          : [];

  console.log(`[news-service] ${label}`, {
    resultType: typeof result,
    resultKeys: Object.keys(result || {}),
    itemCount: items.length,
    firstItemKeys: Object.keys(items[0] || {}).slice(0, 80),
    firstItemSummary: summarizeItem(items[0]),
  });
}

/**
 * @typedef {Object} ListNewsParams
 * @property {string=} syncStatus
 * @property {string=} search
 * @property {number=} start
 * @property {number=} limit
 */

/**
 * @param {ListNewsParams=} params
 */
export async function listNews(params = {}) {
  const { syncStatus, search, start = 0, limit = 50 } = params;

  const filter = {};

  if (syncStatus) {
    filter[BITRIX_APP_CONFIG.FIELDS.SYNC_STATUS] = syncStatus;
  }

  const result = await crmItemList(ENTITY_TYPE_ID, {
    filter,
    start: Number(start),
    order: {
      id: "desc",
    },
  });

  debugBitrixResponse("crm.item.list", result);

  const items = Array.isArray(result?.items) ? result.items : [];
  let mapped = items.map(fromBitrixItem);

  console.log(
    "[news-service] mapped list sample",
    mapped.slice(0, 3).map((item) => ({
      id: item.id,
      titleOriginal: item.titleOriginal,
      sourceSite: item.sourceSite,
      sourceId: item.sourceId,
      sourceUrl: item.sourceUrl,
      summary: item.summary,
      contentText: item.contentText,
      contentHtml: item.contentHtml,
      syncStatus: item.syncStatus,
      editorNotes: item.editorNotes,
      rejectionReason: item.rejectionReason,
      readyToUpload: item.readyToUpload,
    }))
  );

  if (search) {
    const q = String(search).trim().toLowerCase();

    mapped = mapped.filter((item) => {
      const haystack = [
        item.id,
        item.titleOriginal,
        item.summary,
        item.contentText,
        item.sourceSite,
        item.sourceSlug,
        item.sourceUrl,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }

  return mapped.slice(0, Number(limit));
}

export async function getNewsById(id) {
  const result = await crmItemGet(ENTITY_TYPE_ID, id);

  debugBitrixResponse("crm.item.get", result);

  const rawItem = result?.item || result;
  const mapped = fromBitrixItem(rawItem);

  console.log("[news-service] mapped single", {
    id: mapped.id,
    titleOriginal: mapped.titleOriginal,
    sourceSite: mapped.sourceSite,
    sourceId: mapped.sourceId,
    sourceUrl: mapped.sourceUrl,
    summary: mapped.summary,
    contentText: mapped.contentText,
    contentHtml: mapped.contentHtml,
    syncStatus: mapped.syncStatus,
    editorNotes: mapped.editorNotes,
    rejectionReason: mapped.rejectionReason,
    readyToUpload: mapped.readyToUpload,
  });

  return mapped;
}

export async function createNews(payload) {
  const now = new Date().toISOString();

  const fields = toBitrixFields({
    ...payload,
    scrapedAt: payload.scrapedAt || now,
    importedAt: payload.importedAt || now,
    lastSyncAt: payload.lastSyncAt || now,
    syncStatus:
      payload.syncStatus ||
      payload.status ||
      BITRIX_APP_CONFIG.STATUS.PENDIENTE,
  });

  const result = await crmItemAdd(ENTITY_TYPE_ID, fields);

  console.log("[news-service] crm.item.add result", {
    resultKeys: Object.keys(result || {}),
    itemId: result?.item?.id || result?.id || null,
    payloadKeys: Object.keys(fields),
  });

  return {
    id: Number(result?.item?.id || result?.id || 0),
  };
}

export async function updateNews(id, payload) {
  const now = new Date().toISOString();

  const fields = toBitrixFields({
    ...payload,
    lastSyncAt: now,
  });

  console.log("[news-service] crm.item.update payload", {
    id: Number(id),
    fieldKeys: Object.keys(fields),
    fieldsPreview: fields,
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}

export async function updateNewsStatus(id, syncStatus, rejectionReason = "") {
  const fields = toBitrixFields({
    syncStatus,
    rejectionReason,
    lastSyncAt: new Date().toISOString(),
  });

  console.log("[news-service] updateNewsStatus", {
    id: Number(id),
    syncStatus,
    rejectionReason,
    fieldKeys: Object.keys(fields),
    fieldsPreview: fields,
  });

  await crmItemUpdate(ENTITY_TYPE_ID, id, fields);
  return await getNewsById(id);
}
```

## `src\lib\server\response.js`

`$lang
export function json(data, init = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status: init.status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

export function badRequest(message, extra = {}) {
  return json(
    {
      ok: false,
      error: message,
      ...extra,
    },
    { status: 400 }
  );
}

export function serverError(message, extra = {}) {
  return json(
    {
      ok: false,
      error: message,
      ...extra,
    },
    { status: 500 }
  );
}
```

## `src\lib\utils\text.js`

`$lang
const MOJIBAKE_PATTERN =
  /(?:\u00C3.|\u00C2.|\u00E2.|\u00F0\u0178|\u00D0.|\u00D1.|\uFFFD|[\u00C2-\u00C3][\u0080-\u00BF])/;

function hasMojibake(value) {
  return MOJIBAKE_PATTERN.test(value);
}

function decodeLatin1AsUtf8(value) {
  const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function normalizeTextEncoding(value) {
  if (value === undefined || value === null) return "";

  const text = String(value);
  if (!text || !hasMojibake(text)) {
    return text;
  }

  try {
    const decoded = decodeLatin1AsUtf8(text);

    if (!decoded || decoded === text) {
      return text;
    }

    const originalHits = (text.match(/\u00C3|\u00C2|\u00E2|\uFFFD/g) || []).length;
    const decodedHits = (decoded.match(/\u00C3|\u00C2|\u00E2|\uFFFD/g) || []).length;

    return decodedHits <= originalHits ? decoded : text;
  } catch {
    return text;
  }
}
```

## `src\pages\api\health.ts`

`$lang
import type { APIRoute } from "astro";
import { json, serverError } from "../../lib/server/response.js";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    return json({
      ok: true,
      service: "bitrix-noticias-backend",
      entityTypeId: 1070,
      time: new Date().toISOString(),
    });
  } catch (error: any) {
    return serverError(error?.message || "Health check failed");
  }
};
```

## `src\pages\api\news\create.ts`

`$lang
import type { APIRoute } from "astro";
import { createNews, getNewsById } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no v\u00E1lido");
    }

    if (!body.titleOriginal) {
      return badRequest("titleOriginal es obligatorio");
    }

    const created = await createNews(body);
    const item = await getNewsById(created.id);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo crear la noticia");
  }
};
```

## `src\pages\api\news\debug-field.js`

`$lang
import { crmItemFields } from "../../../lib/server/bitrix-rest.js";
import { BITRIX_APP_CONFIG } from "../../../config/bitrixConfig.js";
import { json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET = async () => {
  try {
    const fields = await crmItemFields(BITRIX_APP_CONFIG.ENTITY_TYPE_ID);

    return json({
      ok: true,
      type: typeof fields,
      isArray: Array.isArray(fields),
      keys: fields && typeof fields === "object" ? Object.keys(fields) : [],
      sample: fields,
    });
  } catch (error) {
    return serverError(error?.message || "No se pudo leer crm.item.fields");
  }
};
```

## `src\pages\api\news\get.ts`

`$lang
import type { APIRoute } from "astro";
import { getNewsById } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id") || "0");

    if (!id) {
      return badRequest("Falta el par\u00E1metro id");
    }

    const item = await getNewsById(id);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo obtener la noticia");
  }
};
```

## `src\pages\api\news\list.ts`

`$lang
import type { APIRoute } from "astro";
import { listNews } from "../../../lib/server/news-service.js";
import { json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);

    const status = url.searchParams.get("status") || "";
    const search = url.searchParams.get("search") || "";
    const start = Number(url.searchParams.get("start") || "0");
    const limit = Number(url.searchParams.get("limit") || "50");

    const items = await listNews({
      syncStatus: status,
      search,
      start,
      limit,
    });

    return json({
      ok: true,
      items,
      total: items.length,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo listar noticias");
  }
};
```

## `src\pages\api\news\update.js`

`$lang
import { updateNews } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no vÃ¡lido");
    }

    const id = Number(body.id || 0);

    if (!id) {
      return badRequest("id es obligatorio");
    }

    const fields =
      body.fields && typeof body.fields === "object" ? body.fields : {};

    const item = await updateNews(id, fields);

    return json({
      ok: true,
      item,
    });
  } catch (error) {
    return serverError(error?.message || "No se pudo actualizar la noticia");
  }
};

```

## `src\pages\api\news\update-status.ts`

`$lang
import type { APIRoute } from "astro";
import { updateNewsStatus } from "../../../lib/server/news-service.js";
import { badRequest, json, serverError } from "../../../lib/server/response.js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return badRequest("Body JSON no v\u00E1lido");
    }

    const id = Number(body.id || 0);
    const status = String(body.status || body.syncStatus || "").trim();
    const rejectionReason = String(
      body.rejectionReason || body.reviewReason || ""
    ).trim();

    if (!id) {
      return badRequest("id es obligatorio");
    }

    if (!status) {
      return badRequest("status es obligatorio");
    }

    const item = await updateNewsStatus(id, status, rejectionReason);

    return json({
      ok: true,
      item,
    });
  } catch (error: any) {
    return serverError(error?.message || "No se pudo actualizar el estado");
  }
};
```

## `src\pages\bitrix-entry.ts`

`$lang
import type { APIRoute } from "astro";

export const prerender = false;

function toQueryString(data: Record<string, string>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, value);
    }
  }

  return params.toString();
}

async function extractParams(request: Request) {
  const url = new URL(request.url);
  const result: Record<string, string> = {};

  for (const [key, value] of url.searchParams.entries()) {
    result[key] = value;
  }

  const contentType = request.headers.get("content-type") || "";

  if (request.method === "POST") {
    if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        result[key] = String(value);
      }
    } else if (contentType.includes("application/json")) {
      try {
        const json = await request.json();
        if (json && typeof json === "object") {
          for (const [key, value] of Object.entries(json)) {
            result[key] = String(value ?? "");
          }
        }
      } catch {
        // ignorar
      }
    } else {
      try {
        const text = await request.text();
        const bodyParams = new URLSearchParams(text);
        for (const [key, value] of bodyParams.entries()) {
          result[key] = value;
        }
      } catch {
        // ignorar
      }
    }
  }

  return result;
}

async function handleRequest(request: Request) {
  const params = await extractParams(request);
  const query = toQueryString(params);
  const currentUrl = new URL(request.url);
  const targetUrl = new URL("/", currentUrl);

  targetUrl.search = query;

  return Response.redirect(targetUrl, request.method === "POST" ? 303 : 302);
}

export const GET: APIRoute = async ({ request }) => handleRequest(request);
export const POST: APIRoute = async ({ request }) => handleRequest(request);
```

## `src\pages\index.astro`

`$lang
---
import Layout from "../layouts/Layout.astro";
import NewsApp from "../components/news/NewsApp";
import "../styles/global.css";
---

<Layout title="Noticias IA">
  <NewsApp client:load />
</Layout>
```

## `src\styles\global.css`

`$lang
@import "tailwindcss";
```

## `tsconfig.json`

`$lang
{
  "extends": "astro/tsconfigs/strict",
  "include": [
    ".astro/types.d.ts",
    "**/*"
  ],
  "exclude": [
    "dist"
  ],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

# Resumen

- número total de archivos incluidos: 36
- número de archivos excluidos por reglas: 12666
- lista de archivos sensibles omitidos:
  - .env

## Posibles incidencias detectadas

- Imports a `src/config/bitrixConfig.js` mientras el archivo actual es `src/config/bitrixConfig.ts`.
- La carpeta `src/pages/api/news/` mezcla archivos `.js` y `.ts`; conviene revisar consistencia de rutas y build.
- Existe `src/pages/api/news/debug-field.js`, aparentemente temporal de depuración.
