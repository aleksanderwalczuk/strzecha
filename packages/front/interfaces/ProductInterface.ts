import { CategoryInterface } from './CategoryInterface';
import { StrapiImageInterface } from './StrapiImageInterface';

export interface ProductInterface {
  createdAt: string,
  publishedAt: string,
  updatedAt: string,
  title: string,
  uid: string,
  id: number,
  price: number,
  description: string,
  images: StrapiImageInterface[],
  category: CategoryInterface
};
