export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Paginated<T> {
  results: T;
  pagination?: Pagination;
}
