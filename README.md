# Subgraph Toolkit
A Swiss Army knife for building subgraphs on [The Graph Protocol](https://thegraph.com)

[![NPM Package](https://img.shields.io/npm/v/@protofire/subgraph-toolkit)](https://www.npmjs.com/package/@protofire/subgraph-toolkit)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Code Style: prettier](https://img.shields.io/badge/Code_Style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

---

**Content**

* [Features](#features-)
* [Install](#install-)
* [Usage](#usage-)
* [Documentation](#documentation-)
* [Examples](#example-)
* [Contributing](#contributing-)


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


## Documentation 📄

### Constants
<dl>
<dt>ADDRESS_ZERO</dt>
<dd>The address zero, which is 20 bytes (40 nibbles) of zero. Aliases: GENESIS_ADDRESS, ZERO_ADDRESS</dd>

<dt>HASH_ZERO</dt>
<dd>The hash zero, which is 32 bytes (64 nibbles) of zero. Alias: ZERO_HASH</dd>

<dt>MAX_UINT</dt>
<dd>The hex string representing the maximum `uint256` value. Alias: MAX_UINT_256</dd>
</dl>

#### Integers
<dl>
<dt>integer. NEGATIVE_ONE</dt>
<dd>The BigInt representing -1</dd>

<dt>integer. ZERO</dt>
<dd>The BigInt representing 0</dd>

<dt>integer. ONE</dt>
<dd>The BigInt representing 1</dd>

<dt>integer. TWO</dt>
<dd>The BigInt representing 2</dd>

<dt>integer. ONE_THOUSAND</dt>
<dd>The BigInt representing 1000</dd>

<dt>integer. WEI_PER_ETHER</dt>
<dd>The BigInt representing 10<sup>18</sup></dd>
</dl>

#### Decimals
<dl>
<dt>decimal. NEGATIVE_ONE</dt>
<dd>The BigDecimal representing -1</dd>

<dt>decimal. ZERO</dt>
<dd>The BigDecimal representing 0</dd>

<dt>decimal. ONE</dt>
<dd>The BigDecimal representing 1</dd>

<dt>decimal. TWO</dt>
<dd>The BigDecimal representing 2</dd>
</dl>

#### Units

##### MakerDAO
<dl>
<dt>units. WAD</dt>
<dd>The BigDecimal representing 10<sup>18</sup></dd>

<dt>units. RAY</dt>
<dd>The BigDecimal representing 10<sup>27</sup></dd>

<dt>units. RAD</dt>
<dd>The BigDecimal representing 10<sup>45</sup></dd>
</dl>

### Helper functions

#### Addresses
<dl>
<dt>address. isZeroAddress(address: Address) → Boolean</dt>
<dd>Checks if a given address is the zero address</dd>
</dl>

#### Byte Manipulation
<dl>
<dt>bytes. toAddress(address: Bytes) → Address</dt>
<dd>Checks if a given address is the zero address (0x0)</dd>

<dt>bytes. toSignedInt(value: Bytes, bigEndian: Boolean = true) → BigInt</dt>
<dd>Converts Bytes to a signed BigInt using a given endianness</dd>

<dt>bytes. toUnsignedInt(value: Bytes, bigEndian: Boolean = true) → BigInt</dt>
<dd>Converts Bytes to a unsigned BigInt using a given endianness</dd>

<dt>bytes. hexZeroPad(value: Bytes, length: i32 → String</dt>
<dd>Returns a hex string padded with zeros (on the left) to length bytes (each byte is two nibbles)</dd>
</dl>


#### Integer
<dl>
<dt>integer. fromBigInt(value: BigInt, decimals: i32 = 18) → BigDecimal</dt>
<dd>Converts a BigInt to a BigDecimal including a given number of decimals (by default, 18 decimals)</dd>

##### Factory methods
<dt>integer. fromNumber(value: i32) → BigInt</dt>
<dd>Converts a integer number to a BigInt</dd>

<dt>integer. fromString(value: String) → BigInt</dt>
<dd>Parses a string as a BigInt</dd>
</dl>

##### Converters
<dl>
<dt>integer. toBytes(value: BigInt) → Bytes</dt>
<dd>Converts a BigInt to a raw Bytes</dd>
</dl>

##### Other helpers
<dl>
<dt>integer. decrement(value: BigInt, amount: BigInt = 1) → BigInt</dt>
<dd>Decrements a BigInt by a given amount and returns the new value (by default, decrements by 1)</dd>

<dt>integer. increment(value: BigInt, amount: BigInt = 1) → BigInt</dt>
<dd>Increments a BigInt by a given amount and returns the new value (by default, increments by 1)</dd>

<dt>integer. min(a: BigInt, b: BigInt) → BigInt</dt>
<dd>Returns the smallest of the given numbers</dd>

<dt>integer. max(a: BigInt, b: BigInt) → BigInt</dt>
<dd>Returns the largest of the given numbers</dd>
</dl>


#### Decimal
<dl>
<dt>decimal. fromBigInt(value: BigInt, decimals: i32 = 18) → BigDecimal</dt>
<dd>Converts a BigInt to a BigDecimal including a given number of decimals (by default, 18 decimals)</dd>

##### Factory methods
<dt>decimal. fromNumber(value: f64) → BigDecimal</dt>
<dd>Converts a float number to a BigDecimal</dd>

<dt>decimal. fromString(value: String) → BigDecimal</dt>
<dd>Parses a string as a BigDecimal</dd>
</dl>

##### Converters
<dl>
<dt>decimal. toBigInt(value: BigDecimal, decimals: u8 = 18) → BigInt</dt>
<dd>Converts a BigDecimal to a BigInt using a given number of decimals (by default, 18 decimals)</dd>
</dl>

##### Other helpers
<dl>
<dt>decimal. getPrecision(decimals: u8 = 18) → BigInt</dt>
<dd>Returns a BigInt representing a unit of a fixed point decimal with a given number of decimals (by default, 18 decimals)</dd>

<dt>decimal. min(a: BigDecimal, b: BigDecimal) → BigDecimal</dt>
<dd>Returns the smallest of the given numbers</dd>

<dt>decimal. max(a: BigDecimal, b: BigDecimal) → BigDecimal</dt>
<dd>Returns the largest of the given numbers</dd>
</dl>


#### Units

##### MakerDAO
<dl>
<dt>units. fromRad(value: BigInt) → BigDecimal</dt>
<dd>Reads a BigInt as a fixed point decimal with 18 decimals (used for basic quantities, e.g. balances)</dd>

<dt>units. fromRay(value: BigInt) → BigDecimal</dt>
<dd>Reads a BigInt as a fixed point decimal with 27 decimals (for precise quantites, e.g. ratios)</dd>

<dt>units. fromWad(value: BigInt) → BigDecimal</dt>
<dd>Reads a BigInt as a fixed point decimal with 45 decimals (result of integer multiplication with a `wad` and a `ray)</dd>

<dt>units. toRad(value: BigDecimal) → BigInt</dt>
<dd>Converts a BigDecimal to a BigInt representing a fixed point decimal with 18 decimals (used for basic quantities, e.g. balances)</dd>

<dt>units. toRay(value: BigDecimal) → BigInt</dt>
<dd>Converts a BigDecimal to a BigInt representing a fixed point decimal with 27 decimals (for precise quantites, e.g. ratios)</dd>

<dt>units. toWad(value: BigDecimal) → BigInt</dt>
<dd>Converts a BigDecimal to a BigInt representing a fixed point decimal with 45 decimals (result of integer multiplication with a <code>WAD</code> and a <code>RAY</code>)</dd>
</dl>


## Examples 🖍

The following subgraphs are using this library:
* [Maker Protocol](https://thegraph.com/explorer/subgraph/protofire/maker-protocol)
* [Curve](https://thegraph.com/explorer/subgraph/protofire/curve)
* [Nexus Mutual](https://thegraph.com/explorer/subgraph/protofire/nexus-mutual)
* [SuperRare](https://thegraph.com/explorer/subgraph/protofire/superrare)


## Contributing 🍰

Please make sure to read the [Contributing Guide]() before making a pull request.

Thank you to all the people who already contributed to this project!


## License ⚖️

Copyright © 2020 Protofire.io and contributors

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses>.
