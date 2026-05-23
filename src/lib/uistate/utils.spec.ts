import { describe, expect, it } from "vitest";
import { toIsoOffset } from "./utils";

describe('toIsoOffset', () => {
  it('should create correct datetime string', () => {
    const date = new Date("2026-01-20T20:10:30Z");

    expect(toIsoOffset(date, "Europe/Stockholm")).toEqual("2026-01-20T21:10:30+01:00");
    expect(toIsoOffset(date, "America/New_York")).toEqual("2026-01-20T15:10:30-05:00");
  });

  it('should handle daylight saving time', () => {
    const date = new Date("2026-05-20T20:10:30Z");

    expect(toIsoOffset(date, "Europe/Stockholm")).toEqual("2026-05-20T22:10:30+02:00");
    expect(toIsoOffset(date, "America/New_York")).toEqual("2026-05-20T16:10:30-04:00");
  });

  it('should handle leap year', () => {
    const date1 = new Date("2024-02-28T23:00:00Z");

    expect(toIsoOffset(date1, "Europe/Stockholm")).toEqual("2024-02-29T00:00:00+01:00");
    expect(toIsoOffset(date1, "America/New_York")).toEqual("2024-02-28T18:00:00-05:00");

    const date2 = new Date("2024-02-29T00:00:00Z");

    expect(toIsoOffset(date2, "Europe/Stockholm")).toEqual("2024-02-29T01:00:00+01:00");
    expect(toIsoOffset(date2, "America/New_York")).toEqual("2024-02-28T19:00:00-05:00");

    const date3 = new Date("2024-02-29T23:00:00Z");

    expect(toIsoOffset(date3, "Europe/Stockholm")).toEqual("2024-03-01T00:00:00+01:00");
    expect(toIsoOffset(date3, "America/New_York")).toEqual("2024-02-29T18:00:00-05:00");
  })
});
