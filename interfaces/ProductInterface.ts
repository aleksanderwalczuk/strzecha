export interface InfoProductInterface {
  currency: string,
  description: string,
  id: number,
  link?: string,
  price?: number,
}
export interface AdditionalProductInterface {
  available: boolean,
  id: number,
  expiry?: string,
  in_navigation?: boolean,
  promoted?: boolean,
  starting_price?: string,
};
export interface ProductInterface {
  additional: AdditionalProductInterface,
  info: InfoProductInterface,
  createdAt: string,
  publishedAt: string,
  title: string,
  updatedAt: string,
};
