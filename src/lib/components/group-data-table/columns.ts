import { createRawSnippet } from "svelte";
import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent, renderSnippet } from "../ui/data-table";
import DataTableHeaderButton from "../data-table/data-table-header-button.svelte";
import { GroupIcon } from "../icons/icons";
import CellEnabled from "../data-table/cell-enabled.svelte";
import { booleanInclusionFilter } from "../data-table/filter-functions";
import CellDependencies from "./cell-dependencies.svelte";
 
type GroupTableRow = {
  id: number;
  name: string;
  note: string;
  enabled: boolean;
  dependencies: number[],
};

export const columns: ColumnDef<GroupTableRow>[] = [
  {
    id: "icon",
    cell: () => renderComponent(GroupIcon, { size: 16 }),
    meta: {
      class: "w-0"
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<GroupTableRow>, {
        header: "Name",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => {
      const nameCellSnippet = createRawSnippet<[{ id: number }]>(
        () => {
          return {
            render: () =>
              `<a href="/groups/${row.original.id}" class="font-medium">${row.original.name}</a>`,
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
      renderComponent(DataTableHeaderButton<GroupTableRow>, {
        header: "Note",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
  },
  {
    accessorKey: "enabled",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<GroupTableRow>, {
        header: "Enabled",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => renderComponent(CellEnabled, { enabled: row.original.enabled }),
    filterFn: booleanInclusionFilter,
  },
  {
    accessorKey: "dependencies",
    header: "Dependencies",
    cell: ({ row }) => renderComponent(CellDependencies, { dependencies: row.original.dependencies })
  },
];
