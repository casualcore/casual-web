import type { FilterFn } from "@tanstack/table-core"

export const numberInclusionFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!Array.isArray(filterValue)) {
    return true;
  }

  const cellValue = row.getValue<number>(columnId);

  return filterValue.includes(cellValue);
}

export const booleanInclusionFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!Array.isArray(filterValue)) {
    return true;
  }

  const cellValue = row.getValue<boolean>(columnId);

  return filterValue.includes(cellValue);
}
