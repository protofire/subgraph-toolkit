import { BigDecimal, BigInt, Entity, Value, ValueKind, store } from '@graphprotocol/graph-ts'

import { decimal, integer } from './utils'

export namespace metrics {
  class Accumulator extends Entity {
    constructor(id: string) {
      super()
      this.set('id', Value.fromString(id))
    }

    save(): void {
      let id = this.get('id')
      assert(id !== null, 'Cannot save Accumulator entity without an ID')
      assert(
        id.kind == ValueKind.STRING,
        'Cannot save Accumulator entity with non-string ID. ' +
          'Considering using .toHex() to convert the "id" to a string.',
      )
      store.set('Accumulator', id.toString(), this)
    }

    static load(id: string): Accumulator | null {
      return store.get('Accumulator', id) as Accumulator | null
    }

    get id(): string {
      let value = this.get('id')
      return value.toString()
    }

    set id(value: string) {
      this.set('id', Value.fromString(value))
    }

    get total(): BigDecimal {
      let value = this.get('total')
      return value.toBigDecimal()
    }

    set total(value: BigDecimal) {
      this.set('total', Value.fromBigDecimal(value))
    }

    add(value: BigDecimal): Accumulator {
      this.total = this.total.plus(value)
      return this
    }

    subtract(value: BigDecimal): Accumulator {
      this.total = this.total.minus(value)
      return this
    }
  }

  class Counter extends Entity {
    constructor(id: string) {
      super()
      this.set('id', Value.fromString(id))
      this.set('count', Value.fromBigInt(integer.ZERO))
    }

    save(): void {
      let id = this.get('id')
      assert(id !== null, 'Cannot save Counter entity without an ID')
      assert(
        id.kind == ValueKind.STRING,
        'Cannot save Counter entity with non-string ID. ' +
          'Considering using .toHex() to convert the "id" to a string.',
      )
      store.set('Counter', id.toString(), this)
    }

    static load(id: string): Counter | null {
      return store.get('Counter', id) as Counter | null
    }

    get id(): string {
      let value = this.get('id')
      return value.toString()
    }

    set id(value: string) {
      this.set('id', Value.fromString(value))
    }

    get count(): BigInt {
      let value = this.get('count')
      return value.toBigInt()
    }

    private set count(value: BigInt) {
      this.set('count', Value.fromBigInt(value))
    }

    increase(value: BigInt = integer.ONE): Counter {
      this.count = this.count.plus(value)
      return this
    }

    decrease(value: BigInt = integer.ONE): Counter {
      this.count = this.count.minus(value)
      return this
    }
  }

  export function getAccumulator(id: string): Accumulator {
    let acc = Accumulator.load(id)

    if (acc == null) {
      acc = new Accumulator(id)
      acc.total = decimal.ZERO
    }

    return acc as Accumulator
  }

  export function getCounter(counterName: string): Counter {
    let counter = Counter.load(counterName)

    if (counter == null) {
      counter = new Counter(counterName)
      counter.count = integer.ZERO
    }

    return counter as Counter
  }
}
