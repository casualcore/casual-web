import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "../ui/data-table";
import DataTableHeaderButton from "../data-table/data-table-header-button.svelte";
import { InstanceIcon } from "../icons/icons";
import CellInstanceState from "../data-table/cell-instance-state.svelte"; // Samma som för server instance?
import { numberInclusionFilter } from "../data-table/filter-functions";

type InstanceTableRow = {
  id: string;
  alias: string;
  state: number;
  pid: number;
  spawnpoint: string;
};

export const columns: ColumnDef<InstanceTableRow>[] = [
  {
    id: "icon",
    cell: () => renderComponent(InstanceIcon, { size: 16 }),
    meta: {
      class: "w-0"
    }
  },
  {
    accessorKey: "alias",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<InstanceTableRow>, {
        header: "Alias",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    accessorKey: "state",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<InstanceTableRow>, {
        header: "State",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    filterFn: numberInclusionFilter,
    cell: ({ row }) => renderComponent(CellInstanceState, { state: row.original.state }),
  },
  {
    accessorKey: "pid",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<InstanceTableRow>, {
        header: "PID",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right",
    },
  },
  {
    accessorKey: "spawnpoint",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<InstanceTableRow>, {
        header: "Spawnpoint",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    sortDescFirst: true,
  },
];
