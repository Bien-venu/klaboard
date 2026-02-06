/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable react-refresh/only-export-components */
import Bienvenu from "@/assets/images/Bienvenu.jpg";
import Older from "@/assets/images/Older.png";
import Doctor from "@/assets/images/doctor.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TodoItem } from "@/types/todo";
import { type UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AttachmentIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, GripVertical } from "lucide-react";
import * as React from "react";
import { ClipLoader } from "react-spinners";
import TaskRow from "./TaskRow";

const users: {
  title: string;
  icon: string;
}[] = [
  {
    title: "Bienvenu",
    icon: Older,
  },
  {
    title: "Jean",
    icon: Bienvenu,
  },
  {
    title: "Emme",
    icon: Doctor,
  },
];

import { useTranslation } from "react-i18next";
import EditTodo from "./EditTodo";
import DeleteTodo from "./Delete";
// ... imports ...

export const getColumns = (t: any): ColumnDef<TodoItem>[] => [
  {
    id: "select",
    header: () => <></>,
    cell: () => <></>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "chevron",
    header: "",
    cell: () => <GripVertical size={20} className="text-text/50" />,
  },
  {
    id: "todo",
    header: t("table.headers.name"),
    accessorKey: "todo",
    cell: ({ row }) => {
      const todo = row.original.todo;
      return <span>{todo}</span>;
    },
  },
  {
    id: "date",
    header: t("table.headers.date"),
    accessorKey: "date",
    cell: () => {
      return <span>{t("table.rows.mockDateRange")}</span>;
    },
  },
  {
    id: "completed",
    header: t("table.headers.status"),
    cell: ({ row }) => (
      <span
        className={
          row.original.completed
            ? "text-done bg-done/10 rounded-full p-2 px-4"
            : "text-error bg-error/10 rounded-full p-2 px-4"
        }
      >
        {row.original.completed
          ? t("table.status.low")
          : t("table.status.high")}
      </span>
    ),
  },
  {
    id: "attachment",
    header: t("table.headers.attachment"),
    accessorKey: "attachment",
    cell: () => {
      return (
        <div className="border-text/10 bg-text/10 flex w-fit items-center gap-2 rounded-full border p-2 px-4">
          <HugeiconsIcon icon={AttachmentIcon} size={20} />{" "}
          <span>{t("table.rows.mockAttachment")}</span>
        </div>
      );
    },
  },
  {
    id: "people",
    header: t("table.headers.people"),
    accessorKey: "people",
    cell: () => {
      return (
        <div className="flex min-w-20 -space-x-3">
          {users.map((user, index) => (
            <img
              key={index}
              src={user.icon}
              alt={user.title}
              className="ring-foreground size-8 rounded-md object-cover object-top ring-1"
            />
          ))}
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    accessorKey: "action",
    cell: ({ row }: any) => {
      const task = row.original;
      return (
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <EditTodo todo={task} />
          <DeleteTodo todo={task} />
        </div>
      );
    },
  },
];

function DraggableRow({ row, id }: { row: Row<TodoItem>; id: string }) {
  return <TaskRow row={row} column={id} />;
}

export function Tables({
  data: initialData,
  loading,
  id,
}: {
  data: TodoItem[];
  loading: boolean;
  id: string;
}) {
  const { t } = useTranslation();
  const [data, setData] = React.useState(initialData);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchValue, setSearchValue] = React.useState("");

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  const columns = React.useMemo(() => getColumns(t), [t]);

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        searchValue === "" ||
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase());

      return matchesSearch;
    });
  }, [data, searchValue]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id?.toString(),
    autoResetPageIndex: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden">
      <div className="flex w-full flex-col flex-wrap gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="bg-foreground relative flex w-full items-center gap-2 rounded-lg border border-none p-2 px-3 outline-none sm:w-1/5 sm:min-w-80">
          <HugeiconsIcon
            icon={Search01Icon}
            size={20}
            className="text-gray-400"
          />
          <input
            placeholder="Search all fields..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full border-none py-0 text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="border-text/10 flex h-full items-center justify-between gap-4 rounded-lg border px-3 py-2 text-sm shadow-xs outline-none">
                Columns <ChevronDown size={20} className="text-text/60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="border-text/10 h-full overflow-y-auto rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10 backdrop-blur">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full overflow-y-auto">
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <ClipLoader color="#6B46C1" size={30} />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} id={id} />
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex flex-wrap items-center justify-between px-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-fit items-center gap-8 lg:w-fit">
          <div className="hidden w-fit items-center justify-center text-sm font-medium sm:flex">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
