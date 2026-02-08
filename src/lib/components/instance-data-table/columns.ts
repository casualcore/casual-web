import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderComponent, renderSnippet } from "../ui/data-table";
import DataTableHeaderButton from "../data-table/data-table-header-button.svelte";
import { InstanceIcon } from "../icons/icons";
import CellInstanceState from "../data-table/cell-instance-state.svelte";
import { numberInclusionFilter } from "../data-table/filter-functions";
 
type InstanceTableRow = {
  id: string;
  alias: string;
  state: number;
  pid: number;
  ipc: string,
  spawnpoint: string,
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
    cell: ({ row }) => {
      const nameCellSnippet = createRawSnippet<[{ pid: number }]>(
        () => {
          return {
            render: () =>
              `<a href="/instances/${row.original.pid}" class="font-medium">${row.original.alias}</a>`,
          };
        }
      );

      return renderSnippet(nameCellSnippet, {
        pid: row.original.pid,
      });
    },
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
    accessorKey: "ipc",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<InstanceTableRow>, {
        header: "IPC",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
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
  }
];
