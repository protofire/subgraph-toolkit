import {datetime, Timestamp} from "../../lib/date"

// Tuesday, March 29, 2022 12:00:00 PM
var timestamp: i64 = 1648555200

describe("datetime test group", () => {
  it("should truncate five minutes", () => {
    // Tuesday, March 29, 2022 11:55:00 AM -> 1648554900
    let truncateFiveMinutes = datetime.truncateMinutes(timestamp, 5)
    assert(truncateFiveMinutes == 1648554900, `Actual value ${truncateFiveMinutes}`);
  })
  
  it("should truncate an hour", () => {
    // Tuesday, March 29, 2022 11:00:00 AM -> 1648551600
    let truncateAnHour = datetime.truncateHours(timestamp, 1)
    assert(truncateAnHour == 1648551600, `Actual value ${truncateAnHour}`);
  })

  it("should truncate a day", () => {
    // Monday, March 28, 2022 12:00:00 PM -> 1648468800
    let truncateADay = datetime.truncateDays(timestamp, 1)
    assert(truncateADay == 1648468800, `Actual value ${truncateADay}`);
  })

  it("should truncate a week", () => {
    // Tuesday, March 22, 2022 12:00:00 PM -> 1647950400
    let truncateAWeek = datetime.truncateWeeks(timestamp, 1)
    assert(truncateAWeek == 1647950400, `Actual value ${truncateAWeek}`);
  })

  it("should have date string from timestamp", () => {
    let timestampClass = new Timestamp(timestamp)
    assert(timestampClass.toString() == '2022-3-29', `Actual value ${timestampClass}`)
  })
})
