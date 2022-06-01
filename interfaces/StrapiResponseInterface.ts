export interface StrapiResponseData<T> {
    attributes: T,
    id: number

}
export interface StrapiResponseInterface<T> {
  data: StrapiResponseData<T>[] | StrapiResponseData<T>
  meta: unknown
}
