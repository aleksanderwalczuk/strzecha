import { StrapiImageInterface } from './StrapiImageInterface';

export interface ParentCategory {
  name: string,
  uid: string,
  id: number,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
}

export interface CategoryInterface {
  id: number,
  name: string,
  uid: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  onHomepage: boolean,
  parentCategory: Pick<ParentCategory, 'uid'>
  image?: StrapiImageInterface,
};
