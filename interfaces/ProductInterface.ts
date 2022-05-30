import { StrapiImageInterface } from './StrapiImageInterface';
import { StrapiResponseInterface } from './StrapiResponseInterface';

export interface InfoProductInterface {
  currency: string,
  description: string,
  id: number,
  link?: string,
  price?: number,
  images?: StrapiResponseInterface<StrapiImageInterface>
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
