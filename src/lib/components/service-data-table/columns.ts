import { createRawSnippet } from "svelte";
import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent, renderSnippet } from "../ui/data-table";
import DataTableHeaderButton from "../data-table/data-table-header-button.svelte";
import { numberInclusionFilter } from "../data-table/filter-functions";
import { ServiceIcon } from "../icons/icons";
import CellVisibility from "./cell-visibility.svelte";
import CellMode from "./cell-mode.svelte";
 
type ServiceTableRow = {
  id: string;
  name: string;
  category: string;
  mode: number,
  visibility: number,
  instancesSequential: number,
  instancesConcurrent: number,
  invokedCount: number,
  pendingCount: number,
  at: string,
  min: string,
  max: string,
  pat: string,
  last: string,
};

export const columns: ColumnDef<ServiceTableRow>[] = [
  {
    id: "icon",
    cell: () => renderComponent(ServiceIcon, { size: 16 }),
    meta: {
      class: "w-0"
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Name",
        tooltip: "Name of the service",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    cell: ({ row }) => {
      const nameCellSnippet = createRawSnippet<[{ name: string }]>(
        () => {
          return {
            render: () =>
              `<a href="/services?name=${row.original.name}" class="font-medium">${row.original.name}</a>`,
          };
        }
      );

      return renderSnippet(nameCellSnippet, {
        name: row.original.name,
      });
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Category",
        tooltip: "Arbitrary category to help understand the 'purpose' with the service",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "mode",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Mode",
        tooltip: "Transaction mode - can be one of the following (auto, join, none, atomic)",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    filterFn: numberInclusionFilter,
    cell: ({ row }) => renderComponent(CellMode, { mode: row.original.mode })
  },
  {
    accessorKey: "visibility",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Visibility",
        tooltip: "Visibility - visibility from other domains",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    filterFn: numberInclusionFilter,
    cell: ({ row }) => renderComponent(CellVisibility, { visibility: row.original.visibility })
  },
  {
    accessorKey: "instancesSequential",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "SI",
        tooltip: "Sequential instances",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "instancesConcurrent",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "CI",
        tooltip: "Concurrent instances",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "invokedCount",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Invoked",
        tooltip: "Calls - number of calls to the service",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "at",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "AT",
        tooltip: "Avarage-time - the average time of the service (in seconds)",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    sortDescFirst: true,
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "min",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Min",
        tooltip: "Minimum-time - the minimum time of the service (in seconds)",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    sortDescFirst: true,
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "max",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Max",
        tooltip: "Maximum-time - the maximum time of the service (in seconds)",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    sortDescFirst: true,
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "pendingCount",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Pending",
        tooltip: "Pending - total number of pending request, over time",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "pat",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "PAT",
        tooltip: "Pending-Average-Time - the average time request has waited for a service to be available, over time (in seconds)",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    sortDescFirst: true,
    meta: {
      class: "text-right",
    }
  },
  {
    accessorKey: "last",
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton<ServiceTableRow>, {
        header: "Last",
        tooltip: "The last time the service was requested",
        column,
        onclick: column.getToggleSortingHandler(),
      }),
    sortDescFirst: true,
  },
];
