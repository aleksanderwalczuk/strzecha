export interface Paginated<T> {
  results: T
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}
