import * as as from '../lib/date'
import { BigInt } from '@graphprotocol/graph-ts'

interface DateOperations {
  truncateMinutes(minutes?: BigInt): BigInt
  truncateHours(hours?: BigInt): BigInt
  truncateDays(days?: BigInt): BigInt
  truncateWeeks(weeks?: BigInt): BigInt
}

class Date implements DateOperations {
  private timestamp: BigInt

  constructor(value: BigInt) {
    this.timestamp = value
  }

  truncateMinutes(minutes: BigInt = BigInt.zero()): BigInt {
    let newtimestamp = as.datetime.truncateMinutes(this.timestamp.toI64(), minutes.toI32())
    return BigInt.fromI64(newtimestamp)
  }

  truncateHours(hours: BigInt = BigInt.zero()): BigInt {
    let newtimestamp = as.datetime.truncateHours(this.timestamp.toI64(), hours.toI32())
    return BigInt.fromI64(newtimestamp)
  }

  truncateDays(days: BigInt = BigInt.zero()): BigInt {
    let newtimestamp = as.datetime.truncateDays(this.timestamp.toI64(), days.toI32())
    return BigInt.fromI64(newtimestamp)
  }

  truncateWeeks(weeks: BigInt = BigInt.zero()): BigInt {
    let newtimestamp = as.datetime.truncateWeeks(this.timestamp.toI64(), weeks.toI32())
    return BigInt.fromI64(newtimestamp)
  }
}

export class Datetime extends Date {}