import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'

import { ADDRESS_LENGTH, DEFAULT_DECIMALS } from './constants'

export namespace bytes {
  export function toAddress(address: Bytes): Address {
    return Address.fromHexString(address.toHex()).subarray(-ADDRESS_LENGTH) as Address
  }

  export function toSignedInt(value: Bytes, signed: boolean = false, bigEndian: boolean = true): BigInt {
    return BigInt.fromSignedBytes(bigEndian ? (value.reverse() as Bytes) : value)
  }

  export function toUnsignedInt(value: Bytes, bigEndian: boolean = true): BigInt {
    return BigInt.fromUnsignedBytes(bigEndian ? (value.reverse() as Bytes) : value)
  }
}

export namespace decimal {
  // Constants
  export let NEGATIVE_ONE = BigDecimal.fromString('-1')
  export let ZERO = BigDecimal.fromString('0')
  export let ONE = BigDecimal.fromString('1')
  export let TWO = BigDecimal.fromString('2')

  let WAD = BigInt.fromI32(10).pow(18).toBigDecimal()
  let RAY = BigInt.fromI32(10).pow(27).toBigDecimal()
  let RAD = BigInt.fromI32(10).pow(45).toBigDecimal()

  export function fromNumber(value: f64): BigDecimal {
    return fromString(value.toString())
  }

  export function fromString(value: string): BigDecimal {
    return BigDecimal.fromString(value)
  }

  export function convert(value: BigInt, decimals: number = DEFAULT_DECIMALS): BigDecimal {
    let precision = BigInt.fromI32(10)
      .pow(<u8>decimals)
      .toBigDecimal()

    return value.divDecimal(precision)
  }

  export function fromRad(value: BigInt): BigDecimal {
    return value.divDecimal(RAD)
  }

  export function toRad(value: BigDecimal): BigInt {
    return value.times(RAD).truncate(0).digits
  }

  export function fromRay(value: BigInt): BigDecimal {
    return value.divDecimal(RAY)
  }

  export function toRay(value: BigDecimal): BigInt {
    return value.times(RAY).truncate(0).digits
  }

  export function fromWad(value: BigInt): BigDecimal {
    return value.divDecimal(WAD)
  }

  export function toWad(value: BigDecimal): BigInt {
    return value.times(WAD).truncate(0).digits
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

  // Helpers
  export function fromNumber(value: i32): BigInt {
    return BigInt.fromI32(value)
  }

  export function fromString(value: string): BigInt {
    return fromNumber(parseI32(value))
  }
}
