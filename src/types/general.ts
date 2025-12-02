export type Pagination<T> = {
  data: T[],
  pagination: {
    page: number,
    batch: number,
    count: number,
    maxPage: number
  }
}