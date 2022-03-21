import { BigInt } from '@graphprotocol/graph-ts'

const ONE_MINUTE = BigInt.fromI32(SECONDS_IN_MINUTE)
const ONE_HOUR = BigInt.fromI32(SECONDS_IN_HOUR)
const ONE_DAY = BigInt.fromI32(SECONDS_IN_DAY)
const ONE_WEEK = BigInt.fromI32(SECONDS_IN_WEEK)

var truncateDate: (timestamp: BigInt, interval: BigInt) => BigInt =
  (timestamp: BigInt, interval: BigInt): BigInt => interval == 0 ? timestamp : timestamp.div(interval).times(interval)

export namespace datetime {
  export function truncateMinutes(timestamp: BigInt, minutes?: BigInt): BigInt {
    var interval = ONE_MINUTE * (!minutes ? ONE_MINUTE : minutes)
  
    return truncateDate(timestamp, interval)
  }

  export function truncateHours(timestamp: BigInt, hours?: BigInt): BigInt {
    var interval = ONE_HOUR * (!minutes ? ONE_HOUR : minutes)
  
    return truncateDate(timestamp, interval)
  }

  export function truncateDays(timestamp: BigInt, days?: BigInt): BigInt {
    var interval = ONE_DAY * (!days ? ONE_DAY : days)

    return truncateDate(timestamp, interval)
  }

  export function truncateWeeks(timestamp: BigInt, weeks?: BigInt): BigInt {
    var interval = ONE_WEEK * (!weeks ? ONE_WEEK : weeks)

    return truncateDate(timestamp, interval)
  }

  // export class Timestamp {
  //   constructor(timestamp: BigInt) {}

  //   // Ported from http://howardhinnant.github.io/date_algorithms.html#civil_from_days
  //   toString(): String {
  //     // you can have leap seconds apparently - but this is good enough for us ;)
  //     let daysSinceEpochStart = this.timestamp / SECONDS_IN_DAY;
  //     daysSinceEpochStart = daysSinceEpochStart + BigInt.fromI32(719468);

  //     let era = (daysSinceEpochStart >= BigInt.fromI32(0) ? daysSinceEpochStart : daysSinceEpochStart - BigInt.fromI32(146096)) / BigInt.fromI32(146097);
  //     let dayOfEra = (daysSinceEpochStart - era * BigInt.fromI32(146097));          // [0, 146096]
  //     let yearOfEra = (dayOfEra - dayOfEra/BigInt.fromI32(1460) + dayOfEra/BigInt.fromI32(36524) - dayOfEra/BigInt.fromI32(146096)) / BigInt.fromI32(365);  // [0, 399]

  //     let year = yearOfEra + (era * BigInt.fromI32(400));
  //     let dayOfYear = dayOfEra - (BigInt.fromI32(365)*yearOfEra + yearOfEra/BigInt.fromI32(4) - yearOfEra/BigInt.fromI32(100));                // [0, 365]
  //     let monthZeroIndexed = (BigInt.fromI32(5) * dayOfYear + BigInt.fromI32(2)) / BigInt.fromI32(153);                                   // [0, 11]
  //     let day = dayOfYear - (BigInt.fromI32(153) * monthZeroIndexed + BigInt.fromI32(2)) / BigInt.fromI32(5) + BigInt.fromI32(1);                             // [1, 31]
  //     let month = monthZeroIndexed + (monthZeroIndexed < BigInt.fromI32(10) ? BigInt.fromI32(3) : BigInt.fromI32(-9));                            // [1, 12]

  //     year = month <= BigInt.fromI32(2) ? year + BigInt.fromI32(1) : year;

  //     return year.concat("-").concat(month).
  //   }
  // }
}