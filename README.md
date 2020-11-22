# Subgraph Toolkit
<p><i>Swiss Army knife for building subgraphs</i></p>

[![NPM Package](https://img.shields.io/npm/v/@protofire/subgraph-toolkit)](https://www.npmjs.com/package/@protofire/subgraph-toolkit)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Code Style: prettier](https://img.shields.io/badge/Code_Style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

---

**Content**

* [Features](##features)
* [Install](##install)
* [Usage](##usage)
* [Examples](##example)
* [Documentation](##documentation)
* [Contributing](##contributing)


## Features ✨

This library complements and extends the official library `@graphprotocol/graph-ts` with the following functionality: 
- [x] Helper functions to convert between different types not available in the standard library
    - [x] Convert Bytes to Address
    - [x] Convert Bytes to signed and unsigned integer
    - [x] Convert BigDecimal to BigInt with a given precision
    - [x] Convert BigInt to Bytes
    - [x] Convert BigInt to BigDecimal with a given precision
- [x] Useful constants ready to use in the subgraph mappings (including numeric constants, addresses, hashes and more)
- [x] Calculate maximum and minimum of BigInt and BigDecimal values
- [x] Hex Strings helpers
- [x] Counters
- [x] Accumulators
- [ ] Helper functions to handle aggregated data [WIP]
- [ ] Utilities to manipulate tokens (ERC20/ERC721/ERC1115)


## Install 🐙

```bash
  $ yarn add @protofire/subgraph-toolkit --exact
```

>
>**NOTE**
>
>It's recommended installing a specific version of this library since the API in early versions is subject to change without previous notice.
>


## Usage 💡


```typescript
import { integer, decimal, DEFAULT_DECIMALS, ZERO_ADDRESS } from '@protofire/subgraph-toolkit'

// ...

export function handleTransfer(event: Transfer): void {
  // ...
  
  if (event.params._to.toHexString == ZERO_ADDRESS) {
    let amount = decimal.max(
      decimal.ZERO,
      decimal.fromBigInt(event.params._value, DEFAULT_DECIMALS)
    )

    totalBurned += amount

    burnCount = integer.increment(burnCount)
  }
  
  // ...
}

// ...

```

### Counters and accumulators

To use metrics module you need to append the content of [schema.graphql](./schema.graphql) to the subgraph schema.


### Prettier configuration

This package also provides an opinionated Prettier configuration file. To apply this configuration:

```javascript
// prettier.config.js or .prettierrc.js

module.exports = require('@protofire/subgraph-toolkit/prettier.config.js')
```

To override and/or extend the configuration:

```javascript
// prettier.config.js or .prettierrc.js

module.exports = {
  ...require('@protofire/subgraph-toolkit/prettier.config.js'),

  printWidth: 120,

  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
      },
    },
  ],
}
```


## Examples 🖍

The following subgraphs are using this library:
* [Maker Protocol](https://thegraph.com/explorer/subgraph/protofire/maker-protocol)
* [Curve](https://thegraph.com/explorer/subgraph/protofire/curve)
* [SuperRare](https://thegraph.com/explorer/subgraph/protofire/superrare)


## Documentation 📄

TODO


## Contributing 🍰

Please make sure to read the [Contributing Guide]() before making a pull request.

Thank you to all the people who already contributed to this project!


## License ⚖️

Copyright © 2020 Protofire.io and contributors

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses>.
