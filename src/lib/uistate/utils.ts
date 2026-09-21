import { getUiState, DURATIONS_RESOLUTION_DECIMALS } from "./uistate.svelte";

interface TableUtils {
  hiddenBy: (cb: (v: any) => string) => (row: any) => boolean;
  formatDuration: (time: number) => string,
  formatDate: (date: number) => string,
};

export const tableUtils = (): TableUtils => {
  const uiState = getUiState();

  const hiddenBy = (cb: (v: any) => string) =>
    (row: any): boolean =>
      uiState.showHidden ? true : !cb(row).startsWith(".");

  const formatDuration = (time: number): string =>
    (time / 1000000000).toFixed(DURATIONS_RESOLUTION_DECIMALS[uiState.durationsResolution]);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatDate = (date: number): string =>
    date > 0 ? toIsoOffset(new Date(date / 1000000), timezone) : "";

  return {
    hiddenBy,
    formatDuration,
    formatDate,
  };
};

export function toIsoOffset(
  date: Date = new Date(),
  timeZone: string = 'UTC',
) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== 'literal') {
        acc[part.type] = part.value;
      }

      return acc;
    }, {});

  const offset = parts.timeZoneName.replace('GMT', '');

  return (
    `${parts.year}-${parts.month}-${parts.day}` +
    `T${parts.hour}:${parts.minute}:${parts.second}` +
    offset
  );
}
