const parentCategories = ['wyposazenie', 'sztuka'] as const;

export default interface CategoryInterface {
  category: string,
  createdAt: string,
  on_homepage: boolean
  parent_category: typeof parentCategories[number]

};
