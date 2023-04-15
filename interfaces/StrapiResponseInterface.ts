export interface StrapiResponseData<T> {
  attributes: T;
  id: number;
}
export interface StrapiResponseInterface<T> {
  data: Array<StrapiResponseData<T>> | StrapiResponseData<T> | null;
  meta: unknown;
}
