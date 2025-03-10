import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface CustomTableProps<T> {
  bordered: boolean;
  loading: boolean;
  size: "large" | "middle" | "small";
  showTitle?: boolean;
  defaultTitle?: string;
  tableLayout?: "fixed";
  columns: ColumnsType<T>;
  data: T[];
  totalDataCount?: number;
  pageSize?: number;
  current?: number;
  onChangePage?: (page: number) => void;
  onShowSizeChange?: (take: number) => void;
}

const CustomTable = <T extends object>({
  bordered,
  loading,
  size,
  defaultTitle,
  showTitle,
  tableLayout,
  columns,
  data,
  totalDataCount,
  pageSize,
  current,
  onChangePage,
  onShowSizeChange,
}: CustomTableProps<T>) => {
  const handlePageChange = (page: number) => {
    onChangePage?.(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    onShowSizeChange?.(size);
  };

  const pagination = totalDataCount
    ? {
        total: totalDataCount,
        pageSize: pageSize || 10,
        current: current || 1,
        onChange: handlePageChange,
        onShowSizeChange: handlePageSizeChange,
      }
    : false;

  // Define the scroll property to make the table scrollable
  const scroll = {
    // y: 500, // Adjust the height as needed
    x: "100%", // Use 100% to make the table full-width
  };

  const tableProps: TableProps<T> = {
    bordered,
    loading,
    size,
    title: showTitle ? () => <h3>{defaultTitle}</h3> : undefined,
    tableLayout,
    dataSource: data,
    pagination,
    scroll, // Add the scroll property
  };

  return (
    <>
      <Table {...tableProps} columns={columns} />
    </>
  );
};

export default CustomTable;

// https://dribbble.com/shots/2655144/attachments/533133?mode=media
