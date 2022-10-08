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

const example =  {
    createdAt: '2022-05-29T09:26:48.281Z',
    updatedAt: '2022-07-02T16:19:34.585Z',
    on_homepage: true,
    parent_category: 'sztuka',
    name: 'Fotografia',
    uid: 'fotografia',
    main_category: {
      name: 'Sztuka',
      key: 'sztuka',
      createdAt: '2022-05-31T21:07:21.570Z',
      updatedAt: '2022-06-01T06:23:59.135Z',
      id: 1
    },
    image: { data: [Object] },
    id: 7
  }