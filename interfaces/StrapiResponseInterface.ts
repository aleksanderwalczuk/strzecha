export interface StrapiResponseData<T> {
  attributes: T
  id: number

}
export interface StrapiResponseInterface<T> {
  data: Array<StrapiResponseData<T>>
  meta: unknown
}
