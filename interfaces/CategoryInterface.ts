import { StrapiImageInterface } from './StrapiImageInterface';
import { StrapiResponseInterface } from './StrapiResponseInterface';

const parentCategories = ['wyposazenie', 'sztuka'] as const;

export interface CategoryInterface {
  name: string,
  createdAt: string,
  on_homepage: boolean
  parent_category: typeof parentCategories[number],
  image: {
    data?: StrapiResponseInterface<StrapiImageInterface>,
  },
};
