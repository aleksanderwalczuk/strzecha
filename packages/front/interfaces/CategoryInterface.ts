import { StrapiImageInterface } from './StrapiImageInterface';
import { StrapiResponseInterface } from './StrapiResponseInterface';

const parentCategories = ['wyposazenie', 'sztuka'] as const;

export interface MainCategoryInterface {
  name: string,
  key: string,
  createdAt: string,
  updatedAt: string
}

export interface CategoryInterface {
  id?: number,
  uid: string,
  name: string,
  createdAt: string,
  on_homepage: boolean
  parent_category: typeof parentCategories[number],
  image: {
    data?: StrapiResponseInterface<StrapiImageInterface>,
  },
  main_category: MainCategoryInterface,
  updatedAt: string
};
