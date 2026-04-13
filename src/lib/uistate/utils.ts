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

  const formatDate = (date: number): string =>
    date > 0 ? new Date(date / 1000000).toISOString() : "";

  return {
    hiddenBy,
    formatDuration,
    formatDate,
  };
};
