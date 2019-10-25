export interface TableListItem {
  key: number;
  name: string;
  model: string;
  brand: string;
  platform: string;
  os: string;
  size: string;
  resolution: string;
  ram: string;
  rom: string;
  status: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}
