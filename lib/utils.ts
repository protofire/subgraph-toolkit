import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'

import { ADDRESS_LENGTH, DEFAULT_DECIMALS, ZERO_ADDRESS } from './constants'

export namespace address {
  // Helpers
  export function isZeroAddress(address: Address): boolean {
    return address.toHexString() == ZERO_ADDRESS
  }
}

export namespace bytes {
  // Converters
  export function toAddress(address: Bytes): Address {
    return Address.fromHexString(address.toHexString()).subarray(-ADDRESS_LENGTH) as Address
  }

  export function toSignedInt(value: Bytes, bigEndian: boolean = true): BigInt {
    return BigInt.fromSignedBytes(bigEndian ? (value.reverse() as Bytes) : value)
  }

  export function toUnsignedInt(value: Bytes, bigEndian: boolean = true): BigInt {
    return BigInt.fromUnsignedBytes(bigEndian ? (value.reverse() as Bytes) : value)
  }

  // Helpers
  export function hexZeroPad(value: Bytes, length: i32 = 32): string {
    let hexstring = value.toHexString()

    return hexstring.substr(0, 2) + hexstring.substr(2).padStart(length * 2, '0')
  }
}

export namespace decimal {
  // Constants
  export let NEGATIVE_ONE = BigDecimal.fromString('-1')
  export let ZERO = BigDecimal.fromString('0')
  export let ONE = BigDecimal.fromString('1')
  export let TWO = BigDecimal.fromString('2')

  let WAD = BigDecimal.fromString('1000000000000000000')
  let RAY = BigDecimal.fromString('1000000000000000000000000000')
  let RAD = BigDecimal.fromString('1000000000000000000000000000000000000000000000')

  // Factory methods
  export function fromBigInt(value: BigInt, decimals: i32 = DEFAULT_DECIMALS): BigDecimal {
    let precision = BigInt.fromI32(10)
      .pow(<u8>decimals)
      .toBigDecimal()

    return value.divDecimal(precision)
  }

  export function fromNumber(value: f64): BigDecimal {
    return fromString(value.toString())
  }

  export function fromString(value: string): BigDecimal {
    return BigDecimal.fromString(value)
  }

  export function fromRad(value: BigInt): BigDecimal {
    return value.divDecimal(RAD)
  }

  export function fromRay(value: BigInt): BigDecimal {
    return value.divDecimal(RAY)
  }

  export function fromWad(value: BigInt): BigDecimal {
    return value.divDecimal(WAD)
  }

  // Converters
  export function toBigInt(value: BigDecimal, decimals: u8 = DEFAULT_DECIMALS): BigInt {
    return value.times(getPrecision(decimals).toBigDecimal()).truncate(0).digits
  }

  export function toRad(value: BigDecimal): BigInt {
    return value.times(RAD).truncate(0).digits
  }

  export function toRay(value: BigDecimal): BigInt {
    return value.times(RAY).truncate(0).digits
  }

  export function toWad(value: BigDecimal): BigInt {
    return value.times(WAD).truncate(0).digits
  }

  // Helpers
  export function getPrecision(decimals: u8 = DEFAULT_DECIMALS): BigInt {
    return BigInt.fromI32(10).pow(decimals)
  }

  export function min(a: BigDecimal, b: BigDecimal): BigDecimal {
    return BigDecimal.compare(a, b) < 1 ? a : b
  }

  export function max(a: BigDecimal, b: BigDecimal): BigDecimal {
    return BigDecimal.compare(a, b) > 1 ? a : b
  }
}

export namespace integer {
  // Constants
  export let NEGATIVE_ONE = BigInt.fromI32(-1)
  export let ZERO = BigInt.fromI32(0)
  export let ONE = BigInt.fromI32(1)
  export let TWO = BigInt.fromI32(2)
  export let ONE_THOUSAND = BigInt.fromI32(1000)

  export let WEI_PER_ETHER = BigInt.fromI32(<i32>1000000000000000000)

  // Factory methods
  export function fromNumber(value: i32): BigInt {
    return BigInt.fromI32(value)
  }

  export function fromString(value: string): BigInt {
    return fromNumber(parseI32(value))
  }

  // Converters
  export function toBytes(value: BigInt): Bytes {
    return (value as Uint8Array) as Bytes
  }

  // Helpers
  export function decrement(value: BigInt, amount: BigInt = ONE): BigInt {
    return value.minus(amount)
  }

  export function increment(value: BigInt, amount: BigInt = ONE): BigInt {
    return value.plus(amount)
  }

  export function min(a: BigInt, b: BigInt): BigInt {
    return BigInt.compare(a, b) < 1 ? a : b
  }

  export function max(a: BigInt, b: BigInt): BigInt {
    return BigInt.compare(a, b) > 1 ? a : b
  }
}
