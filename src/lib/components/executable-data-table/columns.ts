import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderComponent, renderSnippet } from "../ui/data-table";
import DataTableHeaderButton from "../data-table/data-table-header-button.svelte";
import { ExecutableIcon } from "../icons/icons";
import CellEnabled from "../data-table/cell-enabled.svelte";
import { booleanInclusionFilter } from "../data-table/filter-functions";
import CellBoolean from "../data-table/cell-boolean.svelte";
 
type ExecutableTableRow = {
  id: number;
  alias: string;
  note: string;
  path: string;
  enabled: boolean;
  restart: boolean;
  restarts: number;
  instances: number;
};

export const columns: ColumnDef<ExecutableTableRow>[] = [
  {
    id: "icon",
    cell: () => renderComponent(ExecutableIcon, { size: 16 }),
    meta: {
      class: "w-0"
    }
  },
  {
    accessorKey: "alias",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ExecutableTableRow>, {
        header: "Alias",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => {
      const nameCellSnippet = createRawSnippet<[{ id: number }]>(
        () => {
          return {
            render: () =>
              `<a href="/executables/${row.original.id}" class="font-medium">${row.original.alias}</a>`,
          };
        }
      );

      return renderSnippet(nameCellSnippet, {
        id: row.original.id,
      });
    },
  },
  {
    accessorKey: "note",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ExecutableTableRow>, {
        header: "Note",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    accessorKey: "instances",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ExecutableTableRow>, {
        header: "Instances",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right",
    },
  },
  {
    accessorKey: "enabled",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ExecutableTableRow>, {
        header: "State",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => renderComponent(CellEnabled, { enabled: row.original.enabled }),
    filterFn: booleanInclusionFilter,
  },
  {
    accessorKey: "restart",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ExecutableTableRow>, {
        header: "Restart",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => renderComponent(CellBoolean, { value: row.original.restart }),
  },
  {
    accessorKey: "restarts",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ExecutableTableRow>, {
        header: "Restarts",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right",
    },
  },
  {
    accessorKey: "path",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ExecutableTableRow>, {
        header: "Path",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
];
