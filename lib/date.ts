import {SECONDS_IN_MINUTE, SECONDS_IN_HOUR, SECONDS_IN_DAY, SECONDS_IN_WEEK} from './constants'

var truncateDate: (timestamp: i64, interval: i32) => i64 =
  (timestamp: i64, interval: i32): i64 => {
    return interval == 0 ? timestamp : timestamp - interval
  }

export namespace datetime {
  export function truncateMinutes(timestamp: i64, minutes: i32 = 0): i64 {
    return truncateDate(timestamp, minutes * SECONDS_IN_MINUTE)
  }

  export function truncateHours(timestamp: i64, hours: i32 = 0): i64 {
    return truncateDate(timestamp, hours * SECONDS_IN_HOUR)
  }

  export function truncateDays(timestamp: i64, days: i32 = 0): i64 {
    return truncateDate(timestamp, days * SECONDS_IN_DAY)
  }

  export function truncateWeeks(timestamp: i64, weeks: i32 = 0): i64 {
    return truncateDate(timestamp, weeks * SECONDS_IN_WEEK)
  }
}

export class Timestamp {
  private currentDate: Date;

  constructor(private timestamp: i64) {
    this.currentDate = new Date(timestamp * 1000)
  }

  // Ported from http://howardhinnant.github.io/date_algorithms.html#civil_from_days
  toString(): String {
    var time = this.currentDate.getTime() / 1000
    // you can have leap seconds apparently - but this is good enough for us ;)
    let daysSinceEpochStart = time / SECONDS_IN_DAY;
    daysSinceEpochStart = daysSinceEpochStart + 719468;

    let era = (daysSinceEpochStart >= 0 ? daysSinceEpochStart : daysSinceEpochStart -146096) /146097;
    let dayOfEra = (daysSinceEpochStart - era * 146097);          // [0, 146096]
    let yearOfEra = (dayOfEra - dayOfEra/1460 + dayOfEra/36524 - dayOfEra/146096) / 365;  // [0, 399]

    let year = yearOfEra + (era * 400);
    let dayOfYear = dayOfEra - (365*yearOfEra + yearOfEra/4 - yearOfEra/100);                // [0, 365]
    let monthZeroIndexed = (5 * dayOfYear + 2) / 153;                                   // [0, 11]
    let day = dayOfYear - (153 * monthZeroIndexed + 2) / 5 + 1;                             // [1, 31]
    let month = monthZeroIndexed + (monthZeroIndexed < 10 ? 3 : -9);                            // [1, 12]

    year = month <= 2 ? year + 1 : year;

    return year.toString().concat("-").concat(month.toString()).concat("-").concat(day.toString())
  }
}