import { getUiState } from "./uistate.svelte";

interface TableUtils {
  hiddenBy: (cb: (v: any) => string) => (row: any) => boolean;
};

export const tableUtils = (): TableUtils => {
  const uiState = getUiState();

  const hiddenBy = (cb: (v: any) => string) =>
    (row: any): boolean =>
      uiState.showHidden ? true : !cb(row).startsWith(".");

  return {
    hiddenBy,
  };
};
