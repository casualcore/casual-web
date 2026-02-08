import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderComponent, renderSnippet } from "../ui/data-table";
import DataTableHeaderButton from "../data-table/data-table-header-button.svelte";
import { ExecutableIcon, ServerIcon } from "../icons/icons";
import CellEnabled from "../data-table/cell-enabled.svelte";
import { booleanInclusionFilter } from "../data-table/filter-functions";
 
type GroupMemberTableRow = {
  id: string;
  idRaw: number,
  type: string,
  alias: string;
  note: string;
  path: string;
  enabled: boolean;
  instances: number;
};

export const columns: ColumnDef<GroupMemberTableRow>[] = [
  {
    id: "icon",
    cell: ({ row }) => row.original.type === "executable"
      ? renderComponent(ExecutableIcon, { size: 16 })
      : renderComponent(ServerIcon, { size: 16 }),
    meta: {
      class: "w-0"
    },
  },
  {
    accessorKey: "type",
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "alias",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<GroupMemberTableRow>, {
        header: "Alias",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => {
      const nameCellSnippet = createRawSnippet<[{ id: number }]>(
        () => {
          return {
            render: () =>
              row.original.type === "executable"
                ? `<a href="/executables/${row.original.idRaw}" class="font-medium">${row.original.alias}</a>`
                : `<a href="/servers/${row.original.idRaw}" class="font-medium">${row.original.alias}</a>`,
          };
        }
      );

      return renderSnippet(nameCellSnippet, {
        id: row.original.idRaw,
      });
    },
  },
  {
    accessorKey: "note",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<GroupMemberTableRow>, {
        header: "Note",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    accessorKey: "path",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<GroupMemberTableRow>, {
        header: "Path",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    accessorKey: "enabled",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<GroupMemberTableRow>, {
        header: "Enabled",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => renderComponent(CellEnabled, { enabled: row.original.enabled }),
    filterFn: booleanInclusionFilter,
  },
  {
    accessorKey: "instances",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<GroupMemberTableRow>, {
        header: "Intances",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right"
    },
  },
];
