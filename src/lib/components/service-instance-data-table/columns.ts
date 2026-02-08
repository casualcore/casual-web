import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderComponent, renderSnippet } from "../ui/data-table";
import DataTableHeaderButton from "../data-table/data-table-header-button.svelte";
import { InstanceIcon } from "../icons/icons";
import CellState from "./cell-state.svelte";
import { numberInclusionFilter } from "../data-table/filter-functions";
 
type ServiceInstanceTableRow = {
  id: string,
  alias: string,
  description: string | undefined,
  type: string,
  state: number | undefined,
  pid: number,
  ipc: string,
};

export const columns: ColumnDef<ServiceInstanceTableRow>[] = [
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
      renderComponent(DataTableHeaderButton<ServiceInstanceTableRow>, {
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
    accessorKey: "description",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceInstanceTableRow>, {
        header: "Description",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    accessorKey: "type",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceInstanceTableRow>, {
        header: "Type",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "state",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceInstanceTableRow>, {
        header: "State",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    filterFn: numberInclusionFilter,
    cell: ({ row }) => renderComponent(CellState, { state: row.original.state }),
  },
  {
    accessorKey: "pid",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceInstanceTableRow>, {
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
      renderComponent(DataTableHeaderButton<ServiceInstanceTableRow>, {
        header: "IPC",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
];
