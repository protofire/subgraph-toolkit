import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'

export namespace bytes {
  const ADDRESS_LENGTH = 20

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
  export const DEFAULT_DECIMALS = 18

  export let ZERO = BigDecimal.fromString('0')
  export let ONE = BigDecimal.fromString('1')

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
}

export namespace integer {
  export let ZERO = BigInt.fromI32(0)
  export let ONE = BigInt.fromI32(1)

  export function fromNumber(value: i32): BigInt {
    return BigInt.fromI32(value)
  }

  export function fromString(value: string): BigInt {
    return fromNumber(parseI32(value))
  }
}
